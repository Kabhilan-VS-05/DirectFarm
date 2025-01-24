import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FresherDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};  // Get the username from the state

  const [formData, setFormData] = useState({
    username: username,  // Prefill the username from the state
    dob: "",
    district: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!formData.dob || !formData.district || !formData.role || !formData.phone) {
      alert("All fields are required");
      return;
    }

    // Send data to the backend to update user details
    fetch("http://localhost/fresher_details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Details updated successfully!");
          navigate("/log-in");  // Redirect to a dashboard or another page
        } else {
          alert(data.message || "An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Fresher Detail Form</h1>
        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="dob">
            Date of Birth:
          </label>
          <input
            style={styles.input}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="district">
            District:
          </label>
          <select
            style={styles.input}
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="">Select District</option>
            <option value="Ariyalur">Ariyalur</option>
            <option value="Chengalpattu">Chengalpattu</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Cuddalore">Cuddalore</option>
            <option value="Dharmapuri">Dharmapuri</option>
            <option value="Dindigul">Dindigul</option>
            <option value="Erode">Erode</option>
            <option value="Kanchipuram">Kanchipuram</option>
            <option value="Kanyakumari">Kanyakumari</option>
            <option value="Karur">Karur</option>
            <option value="Krishnagiri">Krishnagiri</option>
            <option value="Madurai">Madurai</option>
            <option value="Nagapattinam">Nagapattinam</option>
            <option value="Namakkal">Namakkal</option>
            <option value="Perambalur">Perambalur</option>
            <option value="Pudukkottai">Pudukkottai</option>
            <option value="Ramanathapuram">Ramanathapuram</option>
            <option value="Salem">Salem</option>
            <option value="Sivagangai">Sivagangai</option>
            <option value="Thanjavur">Thanjavur</option>
            <option value="Theni">Theni</option>
            <option value="Thoothukudi">Thoothukudi</option>
            <option value="Tiruchirappalli">Tiruchirappalli</option>
            <option value="Tirunelveli">Tirunelveli</option>
            <option value="Tiruppur">Tiruppur</option>
            <option value="Vellore">Vellore</option>
            <option value="Virudhunagar">Virudhunagar</option>
          </select>

          <label style={styles.label} htmlFor="role">
            Your Role on this Webpage:
          </label>
          <select
            style={styles.input}
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="consumer">Consumer</option>
            <option value="admin">Admin (Only for Developers)</option>
          </select>

          <label style={styles.label} htmlFor="phone">
            Phone Number:
          </label>
          <input
            style={styles.input}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Submit" style={styles.submit} />
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#2b6217",
    color: "#cccccc",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#1c1c1c",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)",
    transition: "transform 0.3s ease-in-out",
  },
  heading: {
    textAlign: "center",
    color: "#b4ffa1",
    marginBottom: "25px",
    fontSize: "2rem",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#a4ffa1",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2b4a27",
    border: "1px solid #555555",
    borderRadius: "6px",
    color: "#f0f0f0",
    marginBottom: "20px",
    transition: "background-color 0.3s ease-in-out",
  },
  submit: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#326c2b",
    border: "none",
    borderRadius: "6px",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
  '@media (max-width: 600px)': {
    container: {
      padding: "20px",
    },
    heading: {
      fontSize: "1.5rem",
    },
    input: {
      padding: "10px",
    },
    submit: {
      padding: "10px",
    },
  },
};

export default FresherDetail;
