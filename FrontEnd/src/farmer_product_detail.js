import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const FarmerProductManagement = () => {
  const [uploadedProducts, setUploadedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products from the PHP API
    fetch("http://localhost:8080/manage_farmer.php")
      .then(response => response.json())
      .then(data => setUploadedProducts(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const today = new Date();

  const isExpiringSoon = expiryDate => {
    const expiry = new Date(expiryDate);
    const daysToExpiry = (expiry - today) / (1000 * 60 * 60 * 24);
    return daysToExpiry <= 2 && daysToExpiry > 0;
  };

  const handleProductClick = product => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#2b6217",
        minHeight: "100vh",
        boxSizing: "border-box"
      }}
    >
      <h2
        style={{
          fontSize: "35px",
          fontFamily: "cursive",
          textAlign: "center",
          color: "white"
        }}
      >
        Manage Your Products
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {uploadedProducts.map(product =>
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            style={{
              width: "250px",
              height: "300px",
              position: "relative",
              color: "#fff",
              backgroundImage: `url(${product.imageUrl})`,
              backgroundColor: "#2b6217",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            className="product-box"
          >
            <div
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                textAlign: "center",
                fontSize: "14px",
                transition: "background-color 0.3s"
              }}
            >
              <h3 style={{ margin: "5px 0" }}>
                {product.productName}
              </h3>
              <p>
                Cultivated Date: {new Date(product.uploadDate).toLocaleDateString()}
              </p>
              <p>
                Stock: {product.stock}
              </p>
              <p>
                Status: {product.status}
              </p>
              {isExpiringSoon(product.expiryDate) &&
                <p style={{ color: "orange" }}>Expiring Soon</p>}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedProduct}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "dark blue",
            padding: "20px",
            boxSizing: "border-box"
          },
          overlay: {
            backgroundColor: "rgba(43, 98, 23, 0.75)"
          }
        }}
      >
        {selectedProduct &&
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.productName}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            />
            <h2>
              {selectedProduct.productName}
            </h2>
            <p>
              <strong>Uploaded on:</strong>{" "}
              {new Date(selectedProduct.uploadDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {new Date(selectedProduct.expiryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedProduct.status}
            </p>
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
    </div>
  );
};

export default FarmerProductManagement;
