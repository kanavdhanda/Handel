package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type LoginData struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func LoginHandler(c *gin.Context, client *mongo.Client, databaseName, collectionName string) {
	var loginData LoginData
	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := client.Database(databaseName).Collection(collectionName)
	var storedUser struct {
		Password string `bson:"password"`
		SellerID string `bson:"sellerid"`
	}
	err := collection.FindOne(context.TODO(), bson.M{"email": loginData.Email}).Decode(&storedUser)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to find user"})
		}
		return
	}
	log.Printf("Fetched user document: %+v\n", storedUser)
	err = bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginData.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":  "Login successful",
		"sellerid": storedUser.SellerID,
	})
	c.Set("sellerid", storedUser.SellerID)
	fmt.Println("Sellerid:", storedUser.SellerID)
}
