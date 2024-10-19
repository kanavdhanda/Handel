package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type SignupData struct {
	SellerID string `json:"sellerid"`
	Name     string `json:"name"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
	Phone    string `json:"phone"`
}

func SignUpHandler(c *gin.Context, client *mongo.Client, databaseName, collectionName string) {
	var signupData SignupData
	if err := c.ShouldBindJSON(&signupData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	collection := client.Database(databaseName).Collection(collectionName)
	check := collection.FindOne(context.TODO(), bson.M{"email": signupData.Email})
	if err := check.Err(); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duplicate entries not allowed"})
		return
	} else if err != mongo.ErrNoDocuments {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
		return
	}
	sellerID := uuid.New().String()
	signupData.SellerID = sellerID
	hashedPassword, err2 := bcrypt.GenerateFromPassword([]byte(signupData.Password), bcrypt.DefaultCost)
	if err2 != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}
	signupData.Password = string(hashedPassword)

	_, err := collection.InsertOne(context.TODO(), signupData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "signup success",
		"data":    signupData,
	})
}
