import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const urlSearchParams = new URLSearchParams(window.location.hash.split("?")[1]);
      return urlSearchParams.get("token");
    };

    const saveTokenToLocalStorage = (token) => {
      localStorage.setItem("accessToken", token);
    };

    const fetchUser = async () => {
      try {
        const token = getTokenFromUrl();

        if (!token) {
          navigate("/");
          return;
        }

        saveTokenToLocalStorage(token);
        console.log("Access Token:", token);

        const response = await axios.get("http://localhost:8081/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
        navigate("/error");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/");
  };

  return (
    <div>
      <h1>Hello</h1>
      {user && (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <div>
            <img
              src={user.picture}
              alt={user.name}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            {user.name}
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
