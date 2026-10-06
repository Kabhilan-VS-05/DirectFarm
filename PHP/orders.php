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

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    // Fetch orders from the database
    $sql = "SELECT * FROM orders"; // Replace with your actual table name
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = [
                "id" => $row["id"],
                "consumerName" => $row["consumer_name"],
                "contact" => $row["contact"],
                "quantity" => $row["quantity"],
                "orderDate" => $row["order_date"],
                "status" => ucfirst($row["status"]),
                "product" => $row["product"],
                "productImage" => $row["product_image"] ?: "https://via.placeholder.com/250?text=" . urlencode($row["product"])
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
} elseif ($method === "POST") {
    // Update order status
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id'], $input['status'])) {
        $orderId = $conn->real_escape_string($input['id']);
        $status = $conn->real_escape_string($input['status']);

        $sql = "UPDATE orders SET status='$status' WHERE id='$orderId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode([
                "success" => true,
                "message" => "Order status updated successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Failed to update order status: " . $conn->error
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid input data"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Unsupported request method"
    ]);
}

$conn->close();
?>
