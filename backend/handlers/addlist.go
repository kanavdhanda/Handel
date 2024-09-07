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
	token    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI1OTk2MDYxLCJqdGkiOiJlOVNFWlFqZWFIY1dra0drIiwiaWF0IjoxNzI1MTMyMDYxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTEzMjA2MSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.0nCQkx_o7Mj48ssbE3EbnCPl_AItWswsTZ9oKQmg9UU"
	filePath = "C:/Users/Sarthak/handel/backend/handlers/listing.csv"
)

func Listhandler(c *gin.Context) {
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
