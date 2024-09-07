package handlers

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Prod struct {
	Name          string `json:"name"`
	Category_code string `json:"category_code"`
	Type          string `json:"type"`
	Qty           string `json:"qty"`
	Sku           string `json:"sku"`
	Description   string `json:"description"`
}

func AddProd(c *gin.Context) {
	var newprod Prod
	//newprod, bind, marshal, request, headers, client, resp, body
	if err := c.ShouldBindJSON(&newprod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	proddata, err := json.Marshal(newprod)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal product data"})
		return
	}

	req, err := http.NewRequest("POST", "https://apiv2.shiprocket.in/v1/external/products", bytes.NewBuffer(proddata))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI1OTk2MDYxLCJqdGkiOiJlOVNFWlFqZWFIY1dra0drIiwiaWF0IjoxNzI1MTMyMDYxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTEzMjA2MSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.0nCQkx_o7Mj48ssbE3EbnCPl_AItWswsTZ9oKQmg9UU")

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

	c.JSON(http.StatusOK, gin.H{"message": "Product added successfully", "response": string(body)})
	file, err := os.OpenFile("C:/Users/Sarthak/handel/backend/handlers/listing.csv", os.O_APPEND, 0644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	writer := csv.NewWriter(file)
	defer writer.Flush()
	data := []string{"CUSTOM", newprod.Name, newprod.Sku, "0", "3", "10x10x10", ""}
	writer.Write(data)
	if err != nil {
		log.Fatal(err)
	}
}
