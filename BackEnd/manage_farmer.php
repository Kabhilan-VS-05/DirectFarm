<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database configuration
$servername = "localhost"; // Replace with your server name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "nexus"; // Replace with your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the content type to JSON
header('Content-Type: application/json');

// SQL query to fetch products
$sql = "SELECT 
            product_id AS id,
            product_name AS productName,
            stock_quantity AS stock,
            status,
            expiry_date AS expiryDate,
            created_at AS uploadDate,
            CONCAT('http://localhost/images/', product_name, '.jpg') AS imageUrl
        FROM products";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch all rows as an associative array
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Return the products as JSON
    echo json_encode($products);
} else {
    echo json_encode([]);
}

// Close the connection
$conn->close();
?>
