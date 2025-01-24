<?php
// products.php

// Database connection
$host = 'localhost'; // or the appropriate host if it's not localhost
$username = 'root'; // database username
$password = ''; // database password
$dbname = 'nexus'; // database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch products
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

// Check if there are products
if ($result->num_rows > 0) {
    // Output data of each row
    $products = [];
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'data' => $products
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No products found.'
    ]);
}

$conn->close();
?>
