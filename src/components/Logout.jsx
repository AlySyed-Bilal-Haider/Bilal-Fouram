import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");

    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");
    }
    window.location.href = "/";
  }, []);
}

export default Logout;
