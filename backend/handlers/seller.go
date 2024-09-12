package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
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
	ImageURL     string `json:"image_url" bson:"image_url"`
}

func getMongo(collectionName string) (*mongo.Collection, error) {
	clientOptions := options.Client().ApplyURI("mongodb+srv://aayushgoyaldps:aayushgoyal@backend.8yerq94.mongodb.net/GDSC?retryWrites=true&w=majority&appName=backend") // Replace with your MongoDB URI
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}
	return client.Database("mydatabase").Collection(collectionName), nil
}

func Getseller(c *gin.Context) {
	productCollection, err := getMongo("products")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to MongoDB"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := productCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}
	defer cursor.Close(ctx)

	var products []Prod
	if err = cursor.All(ctx, &products); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode products"})
		return
	}

	c.JSON(http.StatusOK, products)
}
