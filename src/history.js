import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// Set the app element for accessibility in modal
Modal.setAppElement("#root");

const ConsumerOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]); // State to store fetched order history
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch order history from backend
    fetch("http://localhost:8080/history.php")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setOrderHistory(data.data); // Update state with fetched data
        } else {
          setError("No order data available");
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOrderClick = order => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", color: "white" }}>Loading...</div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#2b6217",
        color: "white",
        fontFamily: "cursive"
      }}
    >
      <h2 style={{ textAlign: "center" }}>My Order History</h2>

      {/* Render orders by status */}
      {["Shipped", "Delivered", "Pending", "Cancelled"].map(status =>
        <div key={status}>
          <h3>
            {status} Orders
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {orderHistory.filter(order => order.status === status).map(order =>
              <div
                key={order.id}
                onClick={() => handleOrderClick(order)}
                style={{
                  width: "250px",
                  height: "300px",
                  backgroundImage: `url(${order.imageUrl ||
                    "https://via.placeholder.com/250"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  color: "white",
                  position: "relative",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s"
                }}
                className="order-box"
              >
                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    textAlign: "center"
                  }}
                >
                  <h4>
                    {order.productName}
                  </h4>
                  <p>
                    Quantity: {order.quantity}
                  </p>
                  <p>
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Order Details */}
      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            borderRadius: "10px"
          }
        }}
      >
        {selectedOrder &&
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "200px",
                backgroundImage: `url(${selectedOrder.imageUrl ||
                  "https://via.placeholder.com/250"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            />
            <h2>
              {selectedOrder.productName}
            </h2>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Farmer:</strong> {selectedOrder.farmerName}
            </p>
            {selectedOrder.status === "Shipped" &&
              <p>
                <strong>Estimated Delivery:</strong>{" "}
                {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
              </p>}
            {selectedOrder.status === "Delivered" &&
              <p>
                <strong>Delivered On:</strong>{" "}
                {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
              </p>}
            {selectedOrder.status === "Cancelled" &&
              <p>
                <strong>Cancellation Date:</strong>{" "}
                {new Date(selectedOrder.cancellationDate).toLocaleDateString()}
              </p>}
            <button
              onClick={closeModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Close
            </button>
          </div>}
      </Modal>

      {/* Hover Styles */}
      <style>
        {`
          .order-box:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default ConsumerOrderHistory;
