import React, { useEffect, useState } from "react";
import nightBackground from "./sparkles_night.jpg";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Marketing Dashboard | Home";
  }, []);

  const handleLearnMore = () => {
    navigate("/help");
  };

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case "Get Started":
        window.location.href = "/marketing_dashboard/#/";
        break;
      case "Mobile":
        window.location.href = "/marketing_dashboard/#/mobile";
        break;
      case "About":
        window.location.href = "/marketing_dashboard/#/about";
        break;
      case "Help":
        window.location.href = "/marketing_dashboard/#/help";
        break;
      case "Wiki":
        window.location.href = "/marketing_dashboard/#/wiki";
        break;
      case "Policy":
        window.location.href = "/marketing_dashboard/#/policy";
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.menuBar}>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("Get Started")}
        >
          Get Started
        </div>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("Mobile")}
        >
          Mobile
        </div>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("About")}
        >
          About
        </div>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("Help")}
        >
          Help
        </div>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("Wiki")}
        >
          Wiki
        </div>
        <div
          style={styles.menuItem}
          onClick={() => handleMenuItemClick("Policy")}
        >
          Policy
        </div>
      </div>
      <div style={styles.errorContainer}>
        <h1 style={styles.errorTitle}>Oops</h1>
        <p style={styles.errorMessage}>
          It looks like something went wrong. Please check our knowledge base to
          know more about this.
        </p>
        <button
          onClick={handleLearnMore}
          style={{
            ...styles.learnMoreButton,
            ...(isButtonHovered ? styles.learnMoreButtonHover : {}),
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

const styles = {
  menuBar: {
    backgroundColor: "#666",
    padding: "10px",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    width: "99%",
  },
  menuItem: {
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "0.9%",
    marginLeft: "100px",
    marginRight: "100px",
  },
  mainContainer: {
    height: "100vh",
    backgroundImage: `url(${nightBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  grayContainer: {
    marginTop: "15%",
    backgroundColor: "#333",
    padding: "50px",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "36px",
    marginBottom: "20px",
  },
  subtitle: {
    color: "#fff",
    fontSize: "18px",
    marginBottom: "30px",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#black",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginLeft: "24%",
  },
  googleLogo: {
    marginRight: "10px",
    height: "20px",
  },
  errorContainer: {
    textAlign: "center",
    backgroundColor: "grey",
    width: "50%",
    borderRadius: "20px",
    color: "#fff",
    marginTop: "15%",
  },

  errorTitle: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  errorMessage: {
    fontSize: "18px",
  },
  learnMoreButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    marginBottom: "20px",
  },
  learnMoreButtonHover: {
    backgroundColor: "#08ee1f",
  },
};

export default Error;
