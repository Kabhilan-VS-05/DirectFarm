import React, { useState } from "react";
import Modal from "react-modal";

// Set the app element for the modal
Modal.setAppElement("#root");

const FarmerOrderView = () => {
  // Mock data representing consumer orders for a farmer's product, with product images
  const initialOrders = [
    {
      id: 2,
      consumerName: "John Doe",
      contact: "987-654-3210",
      quantity: 10,
      orderDate: "2024-11-01",
      status: "Pending",
      product: "Carrot",
      productImage: "https://via.placeholder.com/250?text=Carrots" // URL of carrot image
    },
    {
      id: 1,
      consumerName: "Akilesh Ga",
      contact: "1234567890",
      quantity: 20,
      orderDate: "2024-11-20",
      status: "Pending",
      product: "Tomato",
      productImage: "https://via.placeholder.com/250?text=Tomato" // URL of potato image
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = order => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirm = () => {
    setOrders(prevOrders =>
      prevOrders.map(
        order =>
          order.id === selectedOrder.id
            ? { ...order, status: "Confirmed" }
            : order
      )
    );
    closeModal();
  };

  const handleCancel = () => {
    setOrders(prevOrders =>
      prevOrders.map(
        order =>
          order.id === selectedOrder.id
            ? { ...order, status: "Cancelled" }
            : order
      )
    );
    closeModal();
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#2b6217", // Dark green background
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        color: "#f4f4e8" // Light cream text for contrast
      }}
    >
      <h2 style={{ color: "#f4f4e8", textAlign: "center" }}>Consumer Orders</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {orders.map(order =>
          <div
            key={order.id}
            onClick={() => openModal(order)}
            style={{
              padding: "15px",
              width: "250px",
              backgroundColor: "#4a8f3b", // Lighter green for cards
              border: "2px solid #1d4b1f", // Darker green for border
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.2s",
              textAlign: "center",
              color: "#f4f4e8" // Light text for readability
            }}
          >
            <img
              src={order.productImage}
              alt={order.product}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "10px"
              }}
            />
            <h3 style={{ color: "#d8e2c8" }}>
              Consumer: {order.consumerName}
            </h3>
            <p>
              <strong>Product:</strong> {order.product}
            </p>
            <p>
              <strong>Quantity Ordered:</strong> {order.quantity}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: "#f6c62e" }}>{order.status}</span>
            </p>
          </div>
        )}
      </div>

      {selectedOrder &&
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              maxWidth: "400px",
              margin: "auto",
              padding: "20px",
              backgroundColor: "white"
            },
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" }
          }}
        >
          <h2 style={{ color: "#010a22" }}>Order Details</h2>
          <img
            src={selectedOrder.productImage}
            alt={selectedOrder.product}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          />
          <p>
            <strong>Consumer Name:</strong> {selectedOrder.consumerName}
          </p>
          <p>
            <strong>Contact:</strong> {selectedOrder.contact}
          </p>
          <p>
            <strong>Product:</strong> {selectedOrder.product}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedOrder.quantity}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(selectedOrder.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>

          <button
            onClick={handleConfirm}
            style={{
              padding: "10px",
              width: "100%",
              marginTop: "10px",
              backgroundColor: "#5ca641",
              color: "#f4f4e8",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Confirm Order
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: "10px",
              width: "100%",
              marginTop: "10px",
              backgroundColor: "#d15c4b",
              color: "#f4f4e8",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Cancel Order
          </button>
        </Modal>}
    </div>
  );
};

export default FarmerOrderView;
