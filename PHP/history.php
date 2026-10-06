<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
$host = "localhost";
$username = "root"; // Replace with your DB username
$password = "";     // Replace with your DB password
$database = "nexus"; // Replace with your DB name

// Connect to the database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

// Fetch order data
$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = [
            "id" => $row["user_id"] . "_" . $row["product_id"], // Combine IDs for unique key
            "productName" => "Product " . $row["product_id"], // Replace with actual product name if available
            "orderDate" => $row["created_at"],
            "quantity" => $row["quantity"],
            "status" => ucfirst($row["status"]),
            "imageUrl" => "https://via.placeholder.com/250?text=Product+Image", // Placeholder image
            "farmerName" => "Farmer Placeholder", // Replace with actual farmer data if available
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => $orders
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No orders found"
    ]);
}

$conn->close();