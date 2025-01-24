<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; // Change this if necessary
$password = ""; // Change this if necessary
$database = "nexus"; // Ensure this is your actual database name

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$action = $data["action"] ?? "";
if ($action === "login") {
    $email = $data["email"] ?? "";
    $username = $data["username"] ?? "";
    $password = $data["password"] ?? "";

    if (empty($email) && empty($username)) {
        echo json_encode(["success" => false, "message" => "Email or username required"]);
        exit();
    }

    $query = "SELECT user_name, email, password, role FROM users WHERE email = ? OR user_name = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (hash("sha256", $password) === $user["password"]) {
            echo json_encode([
                "success" => true,
                "role" => $user["role"],
                "username" => $user["user_name"]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }

    $stmt->close();
}

$conn->close();
?>
