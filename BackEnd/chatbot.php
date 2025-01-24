<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$workflowUrl = "https://clarifai.com/nexus/chatbot-template-Directfarm/workflows/Text";
$pat = "8d17fdac0b8b486ca5a062a3449ddc66";

// Read input JSON from React frontend
$inputData = json_decode(file_get_contents("php://input"), true);
$userMessage = $inputData["userMessage"] ?? "";

// Prepare JSON payload
$data = [
    "inputs" => [
        [
            "data" => [
                "text" => [
                    "raw" => $userMessage
                ]
            ]
        ]
    ]
];

// Initialize cURL
$ch = curl_init($workflowUrl . "/results");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Key $pat",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute request
$response = curl_exec($ch);
curl_close($ch);

// Decode Clarifai API response
$responseData = json_decode($response, true);

// Extract bot's response (modify this based on Clarifai API response format)
$botResponse = $responseData["outputs"][0]["data"]["text"]["raw"] ?? "Sorry, I couldn't process that.";

echo json_encode(["botResponse" => $botResponse]);

?>
