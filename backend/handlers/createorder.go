package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type OrderItem struct {
	Name         string `json:"name"`
	SKU          string `json:"sku"`
	Units        int    `json:"units"`
	SellingPrice int    `json:"selling_price"`
}

type OrderDetails struct {
	OrderID             string      `json:"order_id"`
	OrderDate           string      `json:"order_date"`
	PickupLocation      string      `json:"pickup_location"`
	BillingCustomerName string      `json:"billing_customer_name"`
	BillingLastName     string      `json:"billing_last_name"`
	BillingAddress      string      `json:"billing_address"`
	BillingCity         string      `json:"billing_city"`
	BillingPincode      int         `json:"billing_pincode"`
	BillingState        string      `json:"billing_state"`
	BillingCountry      string      `json:"billing_country"`
	BillingEmail        string      `json:"billing_email"`
	BillingPhone        int         `json:"billing_phone"`
	ShippingIsBilling   bool        `json:"shipping_is_billing"`
	OrderItems          []OrderItem `json:"order_items"`
	PaymentMethod       string      `json:"payment_method"`
	SubTotal            int         `json:"sub_total"`
	Length              float64     `json:"length"`
	Breadth             float64     `json:"breadth"`
	Height              float64     `json:"height"`
	Weight              float64     `json:"weight"`
	// Tax                 int         `json:"tax"`
	Hsn int `json:"hsn"`
	// Currency            string      `json:"currency"`
	// Reasonofexport      int         `json:"reasonOfExport"`
	// Termsofinvoice      string      `json:"TermsOfInvoice"`
	// Ioss                string      `json:"ioss"`
	// Eori                string      `json:"eori"`
}

func Createorderhandler(c *gin.Context) {
	token := os.Getenv("TOKEN")
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
	req.Header.Set("Authorization", "Bearer "+token)
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
