<?php
// Enable CORS for local testing (optional)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection configuration
$host = "localhost";
$username = "root";
$password = ""; // Replace with your database password
$dbname = "nexus"; // Replace with your database name

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validate and sanitize input
    $productName = isset($_POST['product']) ? mysqli_real_escape_string($conn, $_POST['product']) : null;
    $expiryDate = isset($_POST['expiryDate']) ? mysqli_real_escape_string($conn, $_POST['expiryDate']) : null;
    $dateTime = isset($_POST['dateTime']) ? mysqli_real_escape_string($conn, $_POST['dateTime']) : null;
    $quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;
    $cost = isset($_POST['cost']) ? (float)$_POST['cost'] : 0.0;
    $phoneNumber = isset($_POST['phoneNumber']) ? mysqli_real_escape_string($conn, $_POST['phoneNumber']) : null;
    $userId = 1; // Replace with the actual user ID logic (e.g., from session or input)

    // Validate required fields
    if (!$productName || !$expiryDate || !$dateTime || !$phoneNumber || $quantity <= 0 || $cost <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid or missing input fields."]);
        exit();
    }

    // Handle file upload
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (!isset($_FILES["file"]) || $_FILES["file"]["error"] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "File upload failed or no file uploaded."]);
        exit();
    }

    $fileName = basename($_FILES["file"]["name"]);
    $filePath = $uploadDir . time() . "_" . $fileName;

    if (!move_uploaded_file($_FILES["file"]["tmp_name"], $filePath)) {
        echo json_encode(["success" => false, "message" => "File upload failed."]);
        exit();
    }

    $fileUrl = $filePath; // Use the file path for saving into the database

    // Insert data into the database
    $sql = "INSERT INTO products (
                user_id, 
                product_name, 
                unit, 
                cost, 
                stock_quantity, 
                mobile_number, 
                created_at, 
                updated_at,
                expiry_date,
                file_path
            ) VALUES (
                '$userId', 
                '$productName', 
                '$quantity', 
                '$cost', 
                '$quantity', 
                '$phoneNumber', 
                '$dateTime', 
                NOW(), 
                '$expiryDate',
                '$fileUrl'
            )";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Product uploaded successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
