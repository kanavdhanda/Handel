package main

import (
	"backend/handlers"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

const (
	mongoURI       = "mongodb+srv://aayushgoyaldps:aayushgoyal@backend.8yerq94.mongodb.net/GDSC?retryWrites=true&w=majority&appName=backend"
	databaseName   = "mydatabase"
	collectionName = "users"
)

var client *mongo.Client
var oauthconfig *oauth2.Config

func init() {
	err2 := godotenv.Load()
	if err2 != nil {
		log.Fatalf("Error loading .env file: %v", err2)
	}
	oauthconfig = &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECTURL"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	var err error
	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
}

func HandleGoogleLogin(c *gin.Context) {
	url := oauthconfig.AuthCodeURL("randomstate")
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGoogleCallback(c *gin.Context) {
	code := c.Query("code")
	token, err := oauthconfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange token: " + err.Error()})
		return
	}

	client := oauthconfig.Client(context.Background(), token)
	userInfoResp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info: " + err.Error()})
		return
	}
	defer userInfoResp.Body.Close()

	var userInfo map[string]interface{}
	json.NewDecoder(userInfoResp.Body).Decode(&userInfo)

	fmt.Printf("User info: %v\n", userInfo)

	c.JSON(http.StatusOK, gin.H{
		"message": "Google sign-in success",
		"data":    userInfo,
	})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/auth/google", HandleGoogleLogin)
	router.GET("/auth/google/callback", HandleGoogleCallback)
	router.POST("/signup", func(c *gin.Context) {
		handlers.SignUpHandler(c, client, databaseName, collectionName)
	})
	clientOptions := options.Client().ApplyURI("mongodb+srv://aayushgoyaldps:aayushgoyal@backend.8yerq94.mongodb.net/GDSC?retryWrites=true&w=majority&appName=backend")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	router.POST("/login", func(c *gin.Context) {
		handlers.LoginHandler(c, client, databaseName, collectionName)
	})
	router.POST("/addprod", handlers.AddProd)
	router.GET("/getprod", handlers.GetProd)
	router.POST("/addlist", handlers.Listhandler)
	router.Run(":8080")
}

//https://apiv2.shiprocket.in/v1/external/products
//product added, then add that to csv via get
//then send post request with that csv to https://apiv2.shiprocket.in/v1/external/listings/import
// then map with listing and prod id
