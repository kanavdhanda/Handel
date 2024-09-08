package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OrderItem struct {
	Name         string  `json:"name"`
	SKU          string  `json:"sku"`
	Units        int     `json:"units"`
	SellingPrice float64 `json:"selling_price"`
}

type OrderDetails struct {
	OrderID             string      `json:"order_id"`
	OrderDate           string      `json:"order_date"`
	PickupLocation      string      `json:"pickup_location"`
	BillingCustomerName string      `json:"billing_customer_name"`
	BillingLastName     string      `json:"billing_last_name"`
	BillingAddress      string      `json:"billing_address"`
	BillingCity         string      `json:"billing_city"`
	BillingPincode      string      `json:"billing_pincode"`
	BillingState        string      `json:"billing_state"`
	BillingCountry      string      `json:"billing_country"`
	BillingEmail        string      `json:"billing_email"`
	BillingPhone        string      `json:"billing_phone"`
	ShippingIsBilling   bool        `json:"shipping_is_billing"`
	OrderItems          []OrderItem `json:"order_items"`
	PaymentMethod       string      `json:"payment_method"`
	SubTotal            float64     `json:"sub_total"`
	Length              float64     `json:"length"`
	Breadth             float64     `json:"breadth"`
	Height              float64     `json:"height"`
	Weight              float64     `json:"weight"`
}

func Createorderhandler(c *gin.Context) {
	var order OrderDetails
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	orderJSON, err := json.Marshal(order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process order"})
		return
	}
	req, err := http.NewRequest("POST", "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", bytes.NewBuffer(orderJSON))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwNTY4NzQsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI1OTk2MDYxLCJqdGkiOiJlOVNFWlFqZWFIY1dra0drIiwiaWF0IjoxNzI1MTMyMDYxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTEzMjA2MSwiY2lkIjo0ODczOTI3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.0nCQkx_o7Mj48ssbE3EbnCPl_AItWswsTZ9oKQmg9UU")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to forward to Shiprocket"})
		return
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Shiprocket API Response:", string(body))
	if resp.StatusCode == 422 {
		c.JSON(resp.StatusCode, gin.H{"error": "Unprocessable Entity", "details": string(body)})
		return
	}
	c.JSON(resp.StatusCode, gin.H{"response": string(body)})
}
