// ReactJS Frontend
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get('http://localhost/products.php')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handlePurchase = () => {
        axios.post('http://localhost/order.php', {
            product_id: selectedProduct.product_id,
            quantity: quantity
        })
        .then(response => {
            alert(response.data.message);
            setSelectedProduct(null);
        })
        .catch(error => console.error('Error purchasing product:', error));
    };

    return (
        <div>
            <h2>Available Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.product_id}>
                        {product.product_name} - {product.farmer_name} ({product.stock_quantity} available)
                        <button onClick={() => setSelectedProduct(product)}>View</button>
                    </li>
                ))}
            </ul>
            
            {selectedProduct && (
                <div className="modal">
                    <h3>{selectedProduct.product_name} by {selectedProduct.farmer_name}</h3>
                    <p>Price: ${selectedProduct.cost}</p>
                    <p>Stock: {selectedProduct.stock_quantity}</p>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" />
                    <button onClick={handlePurchase}>Purchase</button>
                    <button onClick={() => setSelectedProduct(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProductList;