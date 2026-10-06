<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Database connection details
$host = "localhost"; // Update with your database host
$username = "root";  // Update with your database username
$password = "";      // Update with your database password
$database = "nexus"; // Update with your database name

// Establishing database connection
$conn = new mysqli($host, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// SQL query to fetch product details
$sql = "SELECT 
            product_id AS id,
            product_name AS productName,
            stock_quantity AS stock,
            created_at AS uploadDate,
            expiry_date AS expiryDate,
            status,
            'https://via.placeholder.com/250?text=' || product_name AS imageUrl
        FROM products";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    // Fetch all rows as an associative array
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} else {
    echo json_encode([]);
}

// Close the connection
$conn->close();
?>
