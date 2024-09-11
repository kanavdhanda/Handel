package handlers

import (
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Prod struct {
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
	var newProd Prod
	sellerID, ok := c.Get("sellerid")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "SellerID not found"})
		return
	}
	fmt.Println("Retrieved SellerID:", sellerID)

	if err := c.ShouldBindJSON(&newProd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	newProd.SellerID = sellerID.(string)

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
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI2OTAyNDAxLCJqdGkiOiJxQ2RsUlFoS1BxV1VyYzBwIiwiaWF0IjoxNzI2MDM4NDAxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNjAzODQwMSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.KLtGx42EWGLYUFNIwMeqh0W1gwTXxHngsuQKKhouQuo") // Replace with actual API key

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

	collection, err := getMongoCollection("products")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to MongoDB"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = collection.InsertOne(ctx, newProd)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert product into the database"})
		return
	}
	file, err := os.OpenFile("C:/Users/Sarthak/Handel/backend/handlers/listing.csv", os.O_APPEND, 0644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	writer := csv.NewWriter(file)
	defer writer.Flush()

	data := []string{"CUSTOM", newProd.Name, newProd.Sku, "0", "3", "10x10x10", ""}
	writer.Write(data)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product added successfully", "sellerid": newProd.SellerID, "response": string(body)})
}
