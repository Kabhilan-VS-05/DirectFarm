const express = require("express");
const bodyParser = require("body-parser");
const { SessionsClient } = require("@google-cloud/dialogflow");
const path = require("path");
const fs = require("fs");

// Create an instance of the express app
const app = express();
const port = 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the Dialogflow session client
const sessionClient = new SessionsClient({
  keyFilename: path.join(__dirname, "path/to/your-service-account-file.json")
});

// Endpoint to handle the message from the frontend
app.post("/api/message", async (req, res) => {
  const sessionId = req.body.sessionId;
  const query = req.body.query;

  const sessionPath = sessionClient.projectAgentSessionPath(
    "YOUR_PROJECT_ID", // Replace with your Dialogflow project ID
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: "en-US"
      }
    }
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error("Error during Dialogflow request:", error);
    res.status(500).send("Error processing request");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
