import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nightBackground from "./sparkles_night.jpg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Customer = () => {
  const [user, setUser] = useState(null);
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

        const response = await axios.get(
          "https://ballistic-half-jumper.glitch.me/user"
        );
        setUser(response.data);
        document.title = "Marketing Dashboard | Customer";
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

  useEffect(() => {
    const map = L.map("map", {
      minZoom: 2,
    }).setView([0, 0], 2);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  
    const markerIcon = new L.Icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  
    L.marker([48.8566, 2.3522], { icon: markerIcon }).addTo(map);
  
    return () => {
      map.remove();
    };
  }, []);
  

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
        <div id="map" style={styles.map}></div>

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
  map: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
};

export default Customer;
