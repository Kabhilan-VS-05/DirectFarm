<?php
// DB configuration
$host = "localhost";
$username = "root";
$password = "";
$dbname = "nexus";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set headers for CORS (Cross-Origin Resource Sharing)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Get the method (GET, POST, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Fetch all products with farmer details
if ($method == 'GET') {
    $sql = "
        SELECT p.product_id, p.product_name, p.cost, p.stock_quantity, p.created_at, 
               p.user_id AS farmer_id, u.user_name AS farmer_name, u.mobile_number AS farmer_contact, 
               u.district AS farmer_district, p.status
        FROM products p
        INNER JOIN users u ON p.user_id = u.user_id
        WHERE p.status = 'available' AND p.stock_quantity > 0
    ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $products = [];
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);
    } else {
        echo json_encode([]);
    }
}

// Update stock or delete a product
elseif ($method == 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'update_stock') {
        // Update stock
        $product_id = $_POST['product_id'];
        $stock_to_deduct = $_POST['stock_to_deduct'];

        // Begin transaction for safety
        $conn->begin_transaction();

        // First, update the stock
        $sql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND stock_quantity >= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $stock_to_deduct, $product_id, $stock_to_deduct);

        $stmt->execute();

        // Check if stock reached zero and update status to 'pending'
        // Check if stock reached zero and update status to 'pending'
$sql_check = "SELECT stock_quantity FROM products WHERE product_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("i", $product_id);
$stmt_check->execute();
$result = $stmt_check->get_result();
$row = $result->fetch_assoc();

if ($row['stock_quantity'] == 0) {
    // Update status to 'pending' if stock is zero
    $sql_update_status = "UPDATE products SET status = 'pending' WHERE product_id = ?";
    $stmt_update_status = $conn->prepare($sql_update_status);
    $stmt_update_status->bind_param("i", $product_id);
    $stmt_update_status->execute();
}


        if ($stmt->affected_rows > 0) {
            $conn->commit();
            echo json_encode(['status' => 'success', 'message' => 'Stock updated successfully.']);
        } else {
            $conn->rollback();
            echo json_encode(['status' => 'error', 'message' => 'Failed to update stock or invalid stock.']);
        }
    }
}

// Close connection
$conn->close();
?>
