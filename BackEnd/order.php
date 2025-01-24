<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Database connection
$servername = "localhost";
$username = "root"; // Replace with your DB username
$password = ""; // Replace with your DB password
$dbname = "nexus"; // Replace with your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id'], $data['user_id'], $data['quantity'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
    exit;
}

$productId = intval($data['product_id']);
$userId = intval($data['user_id']);
$quantity = intval($data['quantity']);

// Fetch product details
$productQuery = "SELECT cost, stock_quantity FROM products WHERE product_id = $productId";
$productResult = $conn->query($productQuery);

if (!$productResult) {
    echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
    exit;
}

if ($productResult->num_rows > 0) {
    $product = $productResult->fetch_assoc();

    // Check stock availability
    if ($product['stock_quantity'] >= $quantity) {
        $totalPrice = $quantity * $product['cost'];
        $conn->begin_transaction();

        try {
            // Update product stock
            $updateStockQuery = "
                UPDATE products 
                SET stock_quantity = stock_quantity - $quantity 
                WHERE product_id = $productId
            ";
            if (!$conn->query($updateStockQuery)) {
                throw new Exception("Failed to update stock: " . $conn->error);
            }

            // Insert into orders table
            $insertOrderQuery = "
                INSERT INTO orders (user_id, product_id, quantity, price, status) 
                VALUES ($userId, $productId, $quantity, $totalPrice, 'confirmed')
            ";
            if (!$conn->query($insertOrderQuery)) {
                throw new Exception("Failed to insert order: " . $conn->error);
            }

            // Commit transaction
            $conn->commit();
            echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
        } catch (Exception $e) {
            // Rollback transaction
            $conn->rollback();
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Insufficient stock."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Product not found."]);
}

$conn->close();
?>
