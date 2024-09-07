package handlers

import (
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetProd(c *gin.Context) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://apiv2.shiprocket.in/v1/external/products", nil)
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI1OTk2MDYxLCJqdGkiOiJlOVNFWlFqZWFIY1dra0drIiwiaWF0IjoxNzI1MTMyMDYxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTEzMjA2MSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.0nCQkx_o7Mj48ssbE3EbnCPl_AItWswsTZ9oKQmg9UU")

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
