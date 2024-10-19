package handlers

import (
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ADDProd struct {
	SellerID     string `json:"sellerid" bson:"sellerid"`
	Name         string `json:"name" bson:"name"`
	CategoryCode string `json:"category_code" bson:"category_code"`
	Type         string `json:"type" bson:"type"`
	Qty          string `json:"qty" bson:"qty"`
	Sku          string `json:"sku" bson:"sku"`
	Description  string `json:"description" bson:"description"`
	MRP          string `json:"mrp" bson:"mrp"`
	Length       string `json:"length" bson:"length"`
	Width        string `json:"width" bson:"width"`
	Height       string `json:"height" bson:"height"`
	Weight       string `json:"weight" bson:"weight"`
	HSN          string `json:"hsn" bson:"hsn"`
	ImageURL     string `json:"image_url" bson:"image_url"`
}

func getMongoCollection(collectionName string) (*mongo.Collection, error) {
	clientOptions := options.Client().ApplyURI("mongodb+srv://aayushgoyaldps:aayushgoyal@backend.8yerq94.mongodb.net/GDSC?retryWrites=true&w=majority&appName=backend") // Replace with your MongoDB URI
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}
	return client.Database("mydatabase").Collection(collectionName), nil
}

func AddProd(c *gin.Context) {
	token := os.Getenv("TOKEN")
	var newProd ADDProd

	if err := c.ShouldBindJSON(&newProd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	userCollection, err := getMongoCollection("users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to MongoDB"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"sellerid": newProd.SellerID}
	var existingSeller bson.M
	err = userCollection.FindOne(ctx, filter).Decode(&existingSeller)

	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SellerID does not exist"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query the users collection"})
		return
	}

	productCollection, err := getMongoCollection("products")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to MongoDB"})
		return
	}

	prodData, err := json.Marshal(newProd)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal product data"})
		return
	}

	req, err := http.NewRequest("POST", "https://apiv2.shiprocket.in/v1/external/products", bytes.NewBuffer(prodData))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response"})
		return
	}

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		c.JSON(resp.StatusCode, gin.H{"error": fmt.Sprintf("Failed to add product: %s", string(body))})
		return
	}
	_, err = productCollection.InsertOne(ctx, newProd)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert product into the database"})
		return
	}
	file, err := os.OpenFile("handlers/listing.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()

	data := []string{"CUSTOM", newProd.Name, newProd.Sku, "0", "3", "10x10x10", ""}
	if err := writer.Write(data); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write to CSV"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product added successfully", "sellerid": newProd.SellerID, "response": string(body)})
}
