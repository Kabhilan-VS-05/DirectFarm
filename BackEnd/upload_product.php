<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nexus";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["user_id"], $data["product_name"], $data["unit"], $data["cost"], $data["stock_quantity"], $data["mobile_number"], $data["expiry_date"])) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit;
    }

    $user_id = intval($data["user_id"]);
    $product_name = $conn->real_escape_string($data["product_name"]);
    $unit = intval($data["unit"]);
    $cost = floatval($data["cost"]);
    $stock_quantity = intval($data["stock_quantity"]);
    $mobile_number = $conn->real_escape_string($data["mobile_number"]);
    $expiry_date = $conn->real_escape_string($data["expiry_date"]);
    
    $status = "available";
    
    $sql = "INSERT INTO products (user_id, product_name, unit, cost, stock_quantity, status, mobile_number, expiry_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isdiisss", $user_id, $product_name, $unit, $cost, $stock_quantity, $status, $mobile_number, $expiry_date);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product uploaded successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    
    $stmt->close();
}
$conn->close();
?>
