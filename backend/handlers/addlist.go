package handlers

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

const (
	apiURL   = "https://apiv2.shiprocket.in/v1/external/listings/import"
	filePath = "C:/Users/Sarthak/handel/backend/handlers/listing.csv"
)

func Listhandler(c *gin.Context) {
	token := os.Getenv("TOKEN")
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer file.Close()
	var requestBody bytes.Buffer
	writer := multipart.NewWriter(&requestBody)
	formFile, err := writer.CreateFormFile("file", filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create form file"})
		return
	}
	if _, err := io.Copy(formFile, file); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to copy file content"})
		return
	}
	writer.Close()
	req, err := http.NewRequest("POST", apiURL, &requestBody)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
	req.Header.Add("Content-Type", writer.FormDataContentType())
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response"})
		return
	}

	c.Data(resp.StatusCode, "application/json", respBody)
}
