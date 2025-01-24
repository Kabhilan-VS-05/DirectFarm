from flask import Flask, request, jsonify
from flask_cors import CORS
from clarifai.rest import ClarifaiApp

# Replace with your actual Personal Access Token
PERSONAL_ACCESS_TOKEN = "8d17fdac0b8b486ca5a062a3449ddc66"

# Initialize Clarifai
clarifai_app = ClarifaiApp(api_key=PERSONAL_ACCESS_TOKEN)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get user input from the request
        user_message = request.json.get("userMessage")

        # Ensure message is not empty
        if not user_message:
            return jsonify({"botResponse": "Please provide a message!"}), 400

        # Interact with the Clarifai API (replace with the correct model ID)
        model_id = "GPT-4"  # Replace with your model ID
        model = clarifai_app.models.get(model_id)
        response = model.predict_by_text(user_message)

        # Extract the bot's response (customize based on your model's response structure)
        bot_response = response.get("outputs", [{}])[0].get("data", {}).get("text", {}).get("raw", "Sorry, I couldn't generate a response.")

        return jsonify({"botResponse": bot_response})

    except Exception as e:
        print("Error:", e)
        return jsonify({"botResponse": "An error occurred while processing your request."}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
