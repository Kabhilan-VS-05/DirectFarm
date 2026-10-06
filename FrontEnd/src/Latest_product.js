import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// Set the app element for the modal
Modal.setAppElement("#root");

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockInput, setStockInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/view.php")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const openModal = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStockSubmit = () => {
    if (selectedProduct && stockInput !== "") {
      const inputStock = Number(stockInput);

      // Validate stock input
      if (inputStock > 0 && inputStock <= selectedProduct.stock_quantity) {
        const data = new FormData();
        data.append("action", "update_stock");
        data.append("product_id", selectedProduct.product_id);
        data.append("stock_to_deduct", inputStock);

        fetch("http://localhost:8080/view.php", {
          method: "POST",
          body: data
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status === "success") {
              // Update product stock in local state
              const updatedProducts = products.map(product => {
                if (product.product_id === selectedProduct.product_id) {
                  const updatedProduct = { ...product, stock_quantity: product.stock_quantity - inputStock };

                  // Check if stock quantity is zero and mark as "pending"
                  if (updatedProduct.stock_quantity === 0) {
                    updatedProduct.status = "pending";
                  }

                  return updatedProduct;
                }
                return product;
              });

              setProducts(updatedProducts); // Updated product list
              alert(responseData.message);
              closeModal();
            } else {
              alert(responseData.message);
            }
          })
          .catch(error => console.error("Error updating stock:", error));
      } else {
        alert(`Invalid input. Please enter a positive number within available stock (Max: ${selectedProduct.stock_quantity})`);
      }
    }
  };



  return (
    <div
      style={{
        backgroundColor: "#2b6217",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        color: "#d9f5c4"
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center", color: "#d9f5c4" }}>
        Product View
      </h1>
      <h2 style={{ width: "100%", textAlign: "center", color: "#ffffff" }}>
        Explore Our Farm Fresh Products
      </h2>

      {products.map(product =>
        <div
          key={product.product_id}
          onClick={() => openModal(product)}
          style={{
            backgroundImage: `url(${product.product_name})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px",
            width: "200px",
            height: "250px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: "12px",
            cursor: "pointer",
            position: "relative",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            backgroundColor: "#2b6217",
            transition: "transform 0.2s"
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <h3 style={{ margin: "0", fontSize: "1.2em" }}>
              {product.product_name}
            </h3>
            <p style={{ margin: "5px 0" }}>
              ₹{product.cost}
            </p>
            <p style={{ margin: "5px 0" }}>
              {product.created_at.split(" ")[0]}
            </p>
          </div>
        </div>
      )}

      {selectedProduct &&
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              maxWidth: "400px",
              margin: "auto",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #d9f5c4",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              color: "#2b6217",
              backgroundColor: "#f2f7f1"
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)"
            }
          }}
        >
          <h2 style={{ color: "#2b6217", marginBottom: "15px" }}>
            {selectedProduct.product_name}
          </h2>
          <p>
            <strong>Farmer Name:</strong> {selectedProduct.farmer_name}
          </p>
          <p>
            <strong>Farmer Contact:</strong> {selectedProduct.farmer_contact}
          </p>
          <p>
            <strong>Farmer District:</strong> {selectedProduct.farmer_district}
          </p>
          <p>
            <strong>Date Cultivated:</strong>{" "}
            {selectedProduct.created_at.split(" ")[0]}
          </p>
          <p>
            <strong>Price:</strong> ₹{selectedProduct.cost}
          </p>
          <p>
            <strong>Stock:</strong> {selectedProduct.stock_quantity}
          </p>

          <label
            style={{ display: "block", margin: "15px 0 5px", color: "#2b6217" }}
          >
            Purchase Stock:
          </label>
          <input
            type="number"
            value={stockInput}
            onChange={e => setStockInput(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #2b6217",
              marginBottom: "15px"
            }}
          />
          <button
            onClick={handleStockSubmit}
            style={{
              backgroundColor: "#2b6217",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Deduct Stock
          </button>
        </Modal>}
    </div>
  );
};

export default ProductView;


