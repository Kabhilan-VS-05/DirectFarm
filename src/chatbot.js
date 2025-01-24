import React, { useState } from "react";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost/chatbot.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: input }),
      });

      const data = await response.json();

      const botMessage = {
        text: data.botResponse || "Sorry, I didn't get that.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to fetch response.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const styles = {

    body: {
      backgroundColor: "#2b6217",
      color: "#cccccc",
    },
    container: {
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "darkblue",
      display: "flex",
      flexDirection: "column",
      maxWidth: "900px",
      margin: "40px auto",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      fontFamily: "Arial, sans-serif",
      zIndex: 1000,
    },
    messages: {
      flexGrow: 1,
      overflowY: "auto",
      marginBottom: "10px",
      maxHeight: "300px",
      padding: "5px",
      color: "#fff",
    },
    message: {
      margin: "5px 0",
      padding: "10px",
      borderRadius: "12px",
      maxWidth: "45%",
      position: "relative",
    },
    userMessage: {
      backgroundColor: "green",
      alignSelf: "flex-end",
      textAlign: "right",
      borderBottomRightRadius: "0",
      marginLeft: "auto",
    },
    botMessage: {
      backgroundColor: "#010a22",
      alignSelf: "flex-start",
      textAlign: "left",
      borderBottomLeftRadius: "0",
      marginRight: "auto",
    },
    typingIndicator: {
      fontStyle: "italic",
      color: "#bbb",
      margin: "5px 0",
      textAlign: "left",
    },
    inputContainer: {
      display: "flex",
      gap: "10px",
    },
    input: {
      flexGrow: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      outline: "none",
      backgroundColor: "#fff",
      color: "#000",
    },
    sendButton: {
      padding: "10px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
    sendButtonDisabled: {
      backgroundColor: "gray",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === "user" ? styles.userMessage : styles.botMessage),
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
        {isTyping && <div style={styles.typingIndicator}>Bot is typing...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          style={{
            ...styles.sendButton,
            ...(input ? {} : styles.sendButtonDisabled),
          }}
          disabled={!input}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
