import React, { useEffect, useState } from "react";
import nightBackground from "./sparkles_night.jpg";
import googleLogo from "./google.png";

const MainMenu = () => {
  const [buttonStyle, setButtonStyle] = useState({
    ...styles.loginButton,
    backgroundColor: "#fff",
  });

  useEffect(() => {
    document.title = "Marketing Dashboard | Home";
  }, []);

  const handleLoginClick = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?" +
      "client_id=493552220595-5giqmfbhtfuuqudb08vsgft5mhc0hfir.apps.googleusercontent.com&" +
      "redirect_uri=https://ballistic-half-jumper.glitch.me/callback&" +
      "scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&" +
      "response_type=code&" +
      "access_type=offline";
  };

  const handleMouseOver = () => {
    setButtonStyle({
      ...styles.loginButton,
      backgroundColor: "#d4cfcf",
    });
  };

  const handleMouseOut = () => {
    setButtonStyle({
      ...styles.loginButton,
      backgroundColor: "#fff",
    });
  };

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case "Get Started":
        window.location.href = "/";
        break;
      case "Mobile":
        window.location.href = "/mobile";
        break;
      case "About":
        window.location.href = "/about";
        break;
      case "Help":
        window.location.href = "/help";
        break;
      case "Wiki":
        window.location.href = "/wiki";
        break;
      case "Policy":
        window.location.href = "/policy";
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
      <div style={styles.grayContainer}>
        <h1 style={styles.title}>Marketing Dashboard</h1>
        <p style={styles.subtitle}>
          Your guide to follow your marketing performances
        </p>
        <button
          style={buttonStyle}
          onClick={handleLoginClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={googleLogo} alt="Google Logo" style={styles.googleLogo} />
          Continue with Google
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
};

export default MainMenu;
