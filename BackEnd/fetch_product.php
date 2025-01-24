<?php
// Database credentials
$host = "localhost";
$username = "root";
$password = "";
$database = "nexus";

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch products
$sql = "SELECT 
            product_id AS id, 
            product_name AS productName, 
            DATE(created_at) AS uploadDate, 
            stock_quantity AS stock, 
            status, 
            expiry_date AS expiryDate 
        FROM products";
$result = $conn->query($sql);

// Prepare response
$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            "id" => (int) $row["id"],
            "productName" => $row["productName"],
            "uploadDate" => $row["uploadDate"],
            "stock" => (int) $row["stock"],
            "status" => $row["status"],
            "expiryDate" => $row["expiryDate"],
            "imageUrl" => "https://via.placeholder.com/250" // Placeholder image URL
        ];
    }
}

// Close connection
$conn->close();

// Return products as JSON
header("Content-Type: application/json");
echo json_encode($products);
?>
