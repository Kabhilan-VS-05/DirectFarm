import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Fresher from "./Fresher_detail";
import Farmerhome from "./farmer_home";
import Uploadpro from "./upload_product";
import Success1 from "./success1";
import Chatbot from "./chatbot";
import Consumerhome from "./consumer_home";
import FarmerProductDetail from "./farmer_product_detail";
import LatestProduct from "./Latest_product";
import Orders from "./orders";
import History from "./history";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Inline styles for the elements
  const pageStyle = {
    display: "flex",
    width: "100%",
    height: "100vh",
    position: "relative"
  };

  const bodyStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#2b6217",
    color: "#fff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  };

  const leftSectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
    width: "60%",
    backgroundColor: "#2b6217"
  };

  const rightSectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
    width: "40%",
    backgroundColor: "#224c0a",
    borderLeft: "2px solid #173908"
  };

  const logoStyle = {
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1000
  };

  const logoTextStyle = {
    color: "#a5e0a7",
    fontSize: "24px",
    marginBottom: "20px"
  };

  const welcomeStyle = {
    fontSize: "64px",
    color: "#fff"
  };

  const welcomeSubheadingStyle = {
    fontSize: "48px",
    color: "#fff"
  };

  const welcomeParagraphStyle = {
    marginTop: "20px",
    fontSize: "18px",
    color: "#c5c5c5",
    lineHeight: 1.5,
    maxWidth: "600px"
  };

  const loginHeadingStyle = {
    fontSize: "48px",
    marginBottom: "40px",
    color: "#fff",
    textAlign: "center",
    fontFamily: "cursive"
  };

  const btnStyle = {
    backgroundColor: "#000",
    borderWidth: "5px",
    borderColor: "#00ff00",
    borderStyle: "groove",
    color: "#ffffffd2",
    padding: "15px 30px",
    fontSize: "22px",
    marginLeft: "33px",
    fontWeight: "bold",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "15px"
  };

  const btnHoverStyle = {
    boxShadow: "0 0 10px #00ff55"
  };

  const btnActiveStyle = {
    backgroundColor: "#333",
    transform: "scale(0.98)"
  };

  return (
    <div className="page" style={pageStyle}>
      <div className="logo" style={logoStyle}>
        <h1 style={logoTextStyle}>NEXUS.</h1>
      </div>

      <div className="left-section" style={leftSectionStyle}>
        <div className="welcome">
          <h2 style={{ ...welcomeSubheadingStyle, fontFamily: "cursive" }}>
            Welcome to DirectFarm
          </h2>
          <p style={welcomeParagraphStyle}>
            This is a platform designed to foster a direct connection between
            local farmers and consumers within your district. At DirectFarm, we
            believe in empowering farmers by giving them a space to showcase
            their produce and connect with buyers without intermediaries.
            Consumers, on the other hand, can enjoy the convenience of
            purchasing fresh, high-quality produce directly from trusted local
            sources. By promoting district-based connections, we aim to support
            local agriculture, enhance sustainability, and bring farm-fresh
            products to every home. Join us in building a community where
            farm-to-table is more than just a concept—it's a way of life.
          </p>
        </div>
      </div>

      <div className="right-section" style={rightSectionStyle}>
        <div className="login">
          <h2 style={loginHeadingStyle}>Let's Go</h2>
          <button
            className="btn"
            style={btnStyle}
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>

          <button
            className="btn"
            style={btnStyle}
            onClick={() => navigate("/log-in")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/fresher-detail" element={<Fresher />} />
        <Route path="/farmer-home" element={<Farmerhome />} />
        <Route path="/upload-product" element={<Uploadpro />} />
        <Route path="/success1" element={<Success1 />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/consumer-home" element={<Consumerhome />} />
        <Route path="/farmer-product-detail" element={<FarmerProductDetail />} />
        <Route path="/latest-product" element={<LatestProduct />} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </Router>;
}

export default App;
