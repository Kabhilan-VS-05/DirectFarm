import React, { useState, useEffect } from "react";

const ProductUploadForm = () => {
  const [product, setProduct] = useState("Coriander");
  const [dateTime, setDateTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // To store image preview URL
  const [expiryDate, setExpiryDate] = useState(""); // To store expiration date
  const [errors, setErrors] = useState({});

  const productExpiryDays = {
    Carrot: 7,
    Spinach: 3,
    Potato: 10,
    Tomato: 5,
    BigOnion: 15,
    SmallOnion: 10,
    BellPepper: 7,
    Apple: 30,
    Banana: 7,
    Orange: 15,
    Grapes: 10,
    Mango: 20,
    Pineapple: 25,
    Turmeric: 365,
    Cumin: 365,
    BlackPepper: 365,
    RedChiliPowder: 365,
    Cardamom: 365,
    Basil: 5,
    Cilantro: 3,
    Mint: 5,
    Parsley: 5,
    Thyme: 10,
    Rosemary: 10
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product) newErrors.product = "Product is required.";
    if (!dateTime || new Date(dateTime) > new Date())
      newErrors.dateTime = "Please select a past cultivation date and time.";
    if (!quantity || quantity <= 0)
      newErrors.quantity = "Quantity must be a positive number in kilograms.";
    if (!cost || cost <= 0)
      newErrors.cost = "Price must be a positive value per kilogram.";
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number must be a valid 10-digit number.";
    if (!file) newErrors.file = "Please upload an image file.";
    else if (file.size > 5 * 1024 * 1024)
      newErrors.file = "File size must be less than 5MB.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const productData = {
      user_id: 9, // Replace with actual user_id
      product_name: product,
      unit: quantity,
      cost: cost,
      stock_quantity: quantity,
      mobile_number: phoneNumber,
      expiry_date: expiryDate
    };
  
    try {
      const response = await fetch("http://localhost/upload_product.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };
  

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
      setErrors(prevErrors => ({ ...prevErrors, file: null })); // Clear file error if any
    } else {
      setFile(null);
      setPreview(null);
      setErrors(prevErrors => ({
        ...prevErrors,
        file: "Only image files are allowed."
      }));
    }
  };

  // Calculate expiry date when the product is selected or date changes
  useEffect(
    () => {
      if (product && dateTime) {
        const expiryDays = productExpiryDays[product];
        if (expiryDays) {
          const cultivationDate = new Date(dateTime);
          cultivationDate.setDate(cultivationDate.getDate() + expiryDays); // Add days to cultivation date
          setExpiryDate(cultivationDate.toISOString().split("T")[0]); // Set formatted expiry date
        }
      }
    },
    [product, dateTime]
  );

  // Styling
  const styles = {
    pageContainer: {
      backgroundColor: "#2b6217",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
      borderRadius: "10px",
      maxWidth: "800px",
      width: "90%"
    },
    formTitle: {
      color: "#00ff00",
      marginBottom: "20px",
      fontSize: "24px"
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      borderRadius: "5px",
      border: "1px solid #333",
      backgroundColor: "#333333",
      color: "#ffffff"
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      borderRadius: "5px",
      border: "1px solid #333",
      backgroundColor: "#333333",
      color: "#ffffff"
    },
    button: {
      backgroundColor: "#00bfff",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
      width: "100%"
    },
    fileInput: {
      backgroundColor: "#00bfff",
      padding: "10px",
      borderRadius: "5px",
      color: "#000",
      marginTop: "5px",
      cursor: "pointer"
    },
    label: {
      width: "100%",
      textAlign: "left",
      marginBottom: "3px"
    },
    errorText: {
      color: "red",
      fontSize: "14px",
      marginBottom: "5px"
    },
    previewImage: {
      marginTop: "10px",
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "5px"
    }
  };

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <h2 style={styles.formTitle}>Product Upload Form</h2>
        <label style={styles.label}>Product</label>
        <select
          value={product}
          onChange={e => setProduct(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Product</option>
          <optgroup label="Vegetables">
            <option value="Carrot">Carrot</option>
            <option value="Spinach">Spinach</option>
            <option value="Potato">Potato</option>
            <option value="Tomato">Tomato</option>
            <option value="BigOnion">Big Onion</option>
            <option value="SmallOnion">Small Onion</option>
            <option value="BellPepper">Bell Pepper</option>
          </optgroup>
          <optgroup label="Fruits">
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Orange">Orange</option>
            <option value="Grapes">Grapes</option>
            <option value="Mango">Mango</option>
            <option value="Pineapple">Pineapple</option>
          </optgroup>
          <optgroup label="Spices">
            <option value="Turmeric">Turmeric</option>
            <option value="Cumin">Cumin</option>
            <option value="BlackPepper">Black Pepper</option>
            <option value="RedChiliPowder">Red Chili Powder</option>
            <option value="Cardamom">Cardamom</option>
          </optgroup>
          <optgroup label="Herbs">
            <option value="Basil">Basil</option>
            <option value="Cilantro">Cilantro (Coriander leaves)</option>
            <option value="Mint">Mint</option>
            <option value="Parsley">Parsley</option>
            <option value="Thyme">Thyme</option>
            <option value="Rosemary">Rosemary</option>
          </optgroup>
        </select>
        {errors.product &&
          <p style={styles.errorText}>
            {errors.product}
          </p>}

        <label style={styles.label}>Cultivated Date and Time</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={e => setDateTime(e.target.value)}
          style={styles.input}
        />
        {errors.dateTime &&
          <p style={styles.errorText}>
            {errors.dateTime}
          </p>}

        <label style={styles.label}>Quantity (in kg)</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={styles.input}
        />
        {errors.quantity &&
          <p style={styles.errorText}>
            {errors.quantity}
          </p>}

        <label style={styles.label}>Price per kg</label>
        <input
          type="number"
          value={cost}
          onChange={e => setCost(e.target.value)}
          style={styles.input}
        />
        {errors.cost &&
          <p style={styles.errorText}>
            {errors.cost}
          </p>}

        <label style={styles.label}>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          style={styles.input}
        />
        {errors.phoneNumber &&
          <p style={styles.errorText}>
            {errors.phoneNumber}
          </p>}

        <label style={styles.label}>Upload Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        {errors.file &&
          <p style={styles.errorText}>
            {errors.file}
          </p>}
        {preview &&
          <img src={preview} alt="Preview" style={styles.previewImage} />}

        {expiryDate &&
          <p style={styles.errorText}>
            Expiry Date: {expiryDate}
          </p>}

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
