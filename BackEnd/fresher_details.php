<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; // Update if necessary
$password = ""; // Update if necessary
$database = "nexus"; // Ensure this matches your database name

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$username = $data["username"] ?? "";
$dob = $data["dob"] ?? "";
$district = $data["district"] ?? "";
$role = $data["role"] ?? "";
$phone = $data["phone"] ?? "";

if (empty($username) || empty($dob) || empty($district) || empty($role) || empty($phone)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

// Check if user exists by username
$check_query = "SELECT user_id FROM users WHERE user_name = ?";
$stmt = $conn->prepare($check_query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit();
}
$stmt->close();

// Update the user's additional details (dob, district, role, phone)
$update_query = "UPDATE users SET dob = ?, district = ?, role = ?, mobile_number = ? WHERE user_name = ?";
$stmt = $conn->prepare($update_query);
$stmt->bind_param("sssss", $dob, $district, $role, $phone, $username);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Details updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating details"]);
}

$stmt->close();
$conn->close();
?>
