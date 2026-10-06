<?php
header('Content-Type: application/json'); // Set header for JSON response
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from React app
header('Access-Control-Allow-Methods: POST'); // Allow POST requests
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true); // Decode JSON into an associative array

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input', 'error' => json_last_error_msg()]);
    exit();
}

// Check the action parameter to determine the request type
if (isset($data['action'])) {
    // Login functionality
    if ($data['action'] === 'login') {
        $username = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Validate required fields
        if (!$username && !$email || !$password) {
            echo json_encode(['success' => false, 'message' => 'Email/Username and Password are required']);
            exit();
        }

        // Database connection
        $servername = "localhost";
        $dbusername = "root"; // Change if you have a different root user
        $dbpassword = ""; // Change if you have a password set for the root user
        $dbname = "nexus"; // Change this to your database name

        // Create connection
        $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

        // Check connection
        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
            exit();
        }

        // Check if the user exists and verify password
        $stmt = $conn->prepare("SELECT * FROM users WHERE user_name = ? OR email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            exit();
        }

        $user = $result->fetch_assoc();
        if (!password_verify($password, $user['password'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            exit();
        }

        // Login successful
        echo json_encode(['success' => true, 'message' => 'Login successful!', 'role' => $user['role']]);
        
        // Close connections
        $stmt->close();
        $conn->close();
        exit();
    }

    // Registration data
    if ($data['action'] === 'register') {
        $username = $data['name'] ?? null;
        $dob = $data['dob'] ?? null;
        $district = $data['district'] ?? null;
        $role = $data['role'] ?? null;
        $phone = $data['phone'] ?? null;

        // Validate required fields
        if (!$username || !$dob || !$district || !$role || !$phone) {
            echo json_encode(['success' => false, 'message' => 'All fields are required']);
            exit();
        }

        // Database connection
        $servername = "localhost";
        $dbusername = "root"; // Change if you have a different root user
        $dbpassword = ""; // Change if you have a password set for the root user
        $dbname = "nexus"; // Change this to your database name

        // Create connection
        $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

        // Check connection
        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
            exit();
        }

        // Update fresher details in the database
        $stmt = $conn->prepare("UPDATE users SET dob = ?, district = ?, role = ?, mobile_number = ? WHERE user_name = ?");
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare statement failed: ' . $conn->error]);
            exit();
        }

        $stmt->bind_param("sssss", $dob, $district, $role, $phone, $username);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Registration successful!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No changes made.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating user: ' . $stmt->error]);
        }

        // Close connections
        $stmt->close();
        $conn->close();
        exit();
    }
}

// Existing signup code...
$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

// Database connection
$servername = "localhost";
$dbusername = "root"; // Change if you have a different root user
$dbpassword = ""; // Change if you have a password set for the root user
$dbname = "nexus"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Check if the username or email already exists
$stmt = $conn->prepare("SELECT * FROM users WHERE user_name = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or Email already exists']);
    exit();
}

// Insert new user into the database
$stmt = $conn->prepare("INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)");
$hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hash the password for security
$stmt->bind_param("sss", $username, $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User created successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error creating user: ' . $stmt->error]);
}

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // Set session
    session_start();  // Start session
    $_SESSION['user_id'] = $user['id'];  // Store the user ID in the session

    // Send response with user details
    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'role' => $user['role'],
        'user_id' => $user['id'], // Send the user ID back
        'name' => $user['user_name'] // Optionally send the user name
    ]);
    exit();
}
// Close connections
$stmt->close();
$conn->close();
?>
