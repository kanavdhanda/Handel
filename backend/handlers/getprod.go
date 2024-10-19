package handlers

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func GetProd(c *gin.Context) {
	token := os.Getenv("TOKEN")
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://apiv2.shiprocket.in/v1/external/products", nil)
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error making request: %v", err)
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}
	c.String(resp.StatusCode, string(body))
}
