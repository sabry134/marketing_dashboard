import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nightBackground from "./sparkles_night.jpg";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [generatedKey, setGeneratedKey] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const [validKey, setValidKey] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      return localStorage.getItem("accessToken");
    };

    const fetchUser = async () => {
      try {
        const token = getTokenFromLocalStorage();

        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          "https://ballistic-half-jumper.glitch.me/user"
        );
        setUser(response.data);
        document.title = "Marketing Dashboard | Settings";
      } catch (error) {
        console.error("Error fetching user information:", error);
        navigate("/error");
      }
    };

    const checkKeyValidity = async () => {
      try {
        const response = await axios.get(
          "https://ballistic-half-jumper.glitch.me/get-keys"
        );
        const keys = response.data.keys;

        if (generatedKey && !keys.includes(generatedKey)) {
          setValidKey(false);
        }
      } catch (error) {
        console.error("Error checking key validity:", error);
      }
    };

    fetchUser();
    checkKeyValidity();
  }, [navigate, generatedKey]);

  const handleShowKey = () => {
    setShowKey(!showKey);
  };

  useEffect(() => {
    const hashParams = window.location.hash.split("?")[1];
    const urlParams = new URLSearchParams(hashParams);
    const keyParam = urlParams.get("key");

    if (keyParam) {
      console.log("Key:", keyParam);
      setGeneratedKey(keyParam);
      localStorage.setItem("generatedKey", keyParam);
    } else {
      const storedKey = localStorage.getItem("generatedKey");
      setGeneratedKey(storedKey);
    }
  }, []);

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleMenuItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleMenuItemLeave = () => {
    setHoveredItem(null);
  };

  const handleGenerateKey = () => {
    window.location.href = "https://ballistic-half-jumper.glitch.me/generate-key";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.menu}>
        <ul style={styles.menuList}>
          <li
            style={
              hoveredItem === 0
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/dashboard")}
            onMouseEnter={() => handleMenuItemHover(0)}
            onMouseLeave={handleMenuItemLeave}
          >
            Dashboard
          </li>
          <li
            style={
              hoveredItem === 1
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/analytics")}
            onMouseEnter={() => handleMenuItemHover(1)}
            onMouseLeave={handleMenuItemLeave}
          >
            Analytics
          </li>
          <li
            style={
              hoveredItem === 2
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/advertising")}
            onMouseEnter={() => handleMenuItemHover(2)}
            onMouseLeave={handleMenuItemLeave}
          >
            Advertising Performances
          </li>
          <li
            style={
              hoveredItem === 3
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/sales-history")}
            onMouseEnter={() => handleMenuItemHover(3)}
            onMouseLeave={handleMenuItemLeave}
          >
            Sales history
          </li>
          <li
            style={
              hoveredItem === 4
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/customer-segmentation")}
            onMouseEnter={() => handleMenuItemHover(4)}
            onMouseLeave={handleMenuItemLeave}
          >
            Customer segmentation
          </li>
          <li
            style={
              hoveredItem === 5
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/competitor-analysis")}
            onMouseEnter={() => handleMenuItemHover(5)}
            onMouseLeave={handleMenuItemLeave}
          >
            Competitor analysis
          </li>
          <li
            style={
              hoveredItem === 6
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/customer-feedback")}
            onMouseEnter={() => handleMenuItemHover(6)}
            onMouseLeave={handleMenuItemLeave}
          >
            Customer Feedback
          </li>
          <li
            style={
              hoveredItem === 7
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/settings")}
            onMouseEnter={() => handleMenuItemHover(7)}
            onMouseLeave={handleMenuItemLeave}
          >
            Settings
          </li>
          <li
            style={
              hoveredItem === 8
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/alerts")}
            onMouseEnter={() => handleMenuItemHover(8)}
            onMouseLeave={handleMenuItemLeave}
          >
            Alerts
          </li>
          <li
            style={
              hoveredItem === 9
                ? { ...styles.menuItem, backgroundColor: "black" }
                : styles.menuItem
            }
            onClick={() => handleMenuItemClick("/admin")}
            onMouseEnter={() => handleMenuItemHover(9)}
            onMouseLeave={handleMenuItemLeave}
          >
            Admin
          </li>
        </ul>
      </div>

      <div style={styles.content}>
        {user && (
          <div style={styles.userContainer}>
            <div style={styles.userInfoContainer}>
              <div style={styles.userImageContainer}>
                <img
                  src={user.picture}
                  alt={user.name}
                  style={styles.userImage}
                />
              </div>
              <div style={styles.userInfo}>
                <p style={styles.userName}>{user.name}</p>
                <button onClick={handleLogout} style={styles.logoutButton}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
        <div style={styles.generateKeyContainer}>
          {!validKey && (
            <div style={styles.errorContainer}>
              It looks like your key has been revoked. Please generate a new one.
            </div>
          )}
          <div style={styles.generateKeyTitle}>Generate Analytics Key</div>
          <p>Generating analytics keys allow you to add your personal data <br></br>regarding selling history. It will thus create a graphic on<br></br> Analytics page.</p>
          {generatedKey && (
            <div>
              <input
                type={showKey ? "text" : "password"}
                value={generatedKey}
                readOnly
                style={styles.generatedKeyText}
              />
            </div>
          )}
          <div style={styles.generateKeyButtonContainer}>
            <button
              onClick={handleGenerateKey}
              style={styles.generateKeyButton}
            >
              Generate Key
            </button>
            <button onClick={handleShowKey} style={styles.showKeyButton}>
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  menu: {
    width: "10%",
    backgroundColor: "#333",
    padding: "20px",
    color: "#fff",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    marginBottom: "10px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "30px",
    transition: "background-color 0.3s",
  },
  content: {
    backgroundImage: `url(${nightBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flex: 1,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  userInfoContainer: {
    backgroundColor: "white",
    padding: "20px",
    width: "200px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  userImageContainer: {
    marginRight: "10px",
    marginBottom: "24%",
  },
  userImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    marginTop: "10%",
  },
  logoutButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    marginTop: "10px",
  },
  percentage: {
    color: "#fff",
    fontSize: "24px",
    marginTop: "10px",
  },
  generateKeyButtonContainer: {
    position: "absolute",
    top: "70%",
    left: "35%",
  },
  generateKeyButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
  },
  generateKeyContainer: {
    position: "absolute",
    left: "35%",
    backgroundColor: "#ccc",
    padding: "200px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  generatedKeyText: {
    color: "black",
    marginLeft: "10%",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #777",
    width: "300px",
  },
  showKeyButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    marginLeft: "10px",
  },
  generateKeyTitle: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  errorContainer: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    marginRight: "5%",
  },
};

export default Settings;
