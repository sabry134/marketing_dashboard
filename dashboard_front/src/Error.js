import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nightBackground from "./sparkles_night.jpg";

const Error = () => {
  const [user, setUser] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
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

        const response = await axios.get("https://ballistic-half-jumper.glitch.me/user");
        setUser(response.data);
        document.title = "Marketing Dashboard | Error";
      } catch (error) {
        console.error("Error fetching user information:", error);
        navigate("/error");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleMenuItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleMenuItemLeave = () => {
    setHoveredItem(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleLearnMore = () => {
    navigate("/help");
  };

  return (
    <div style={styles.container}>
      <div style={styles.menu}>
      <ul style={styles.menuList}>
          <li
            style={hoveredItem === 0 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/dashboard")}
            onMouseEnter={() => handleMenuItemHover(0)}
            onMouseLeave={handleMenuItemLeave}
          >
            Dashboard
          </li>
          <li
            style={hoveredItem === 1 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/analytics")}
            onMouseEnter={() => handleMenuItemHover(1)}
            onMouseLeave={handleMenuItemLeave}
          >
            Analytics
          </li>
          <li
            style={hoveredItem === 2 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/advertising")}
            onMouseEnter={() => handleMenuItemHover(2)}
            onMouseLeave={handleMenuItemLeave}
          >
            Advertising Performances
          </li>
          <li
            style={hoveredItem === 3 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/sales-history")}
            onMouseEnter={() => handleMenuItemHover(3)}
            onMouseLeave={handleMenuItemLeave}
          >
            Sales history
          </li>
          <li
            style={hoveredItem === 4 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/customer-segmentation")}
            onMouseEnter={() => handleMenuItemHover(4)}
            onMouseLeave={handleMenuItemLeave}
          >
            Customer segmentation
          </li>
          <li
            style={hoveredItem === 5 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/competitor-analysis")}
            onMouseEnter={() => handleMenuItemHover(5)}
            onMouseLeave={handleMenuItemLeave}
          >
            Competitor analysis
          </li>
          <li
            style={hoveredItem === 6 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/customer-feedback")}
            onMouseEnter={() => handleMenuItemHover(6)}
            onMouseLeave={handleMenuItemLeave}
          >
            Customer Feedback
          </li>
          <li
            style={hoveredItem === 7 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/settings")}
            onMouseEnter={() => handleMenuItemHover(7)}
            onMouseLeave={handleMenuItemLeave}
          >
            Settings
          </li>
          <li
            style={hoveredItem === 8 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/alerts")}
            onMouseEnter={() => handleMenuItemHover(8)}
            onMouseLeave={handleMenuItemLeave}
          >
            Alerts
          </li>
          <li
            style={hoveredItem === 9 ? { ...styles.menuItem, backgroundColor: "black" } : styles.menuItem}
            onClick={() => handleMenuItemClick("/admin")}
            onMouseEnter={() => handleMenuItemHover(9)}
            onMouseLeave={handleMenuItemLeave}
          >
            Admin
          </li>
        </ul>
      </div>

      <div style={styles.content}>
        <div style={styles.errorContainer}>
          <h1 style={styles.errorTitle}>Oops</h1>
          <p style={styles.errorMessage}>
            It looks like something went wrong. Please check our knowledge base to know more about this.
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

        {user && (
          <div style={styles.userContainer}>
            <div style={styles.userInfoContainer}>
              <div style={styles.userImageContainer}>
                <img src={user.picture} alt={user.name} style={styles.userImage} />
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
  errorContainer: {
    textAlign: "center",
    backgroundColor: "grey",
    width: "50%",
    borderRadius: "20px",
    color: "#fff",
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
    backgroundColor: "#08ee1f", // Blue color on hover
  },
  
};

export default Error;
