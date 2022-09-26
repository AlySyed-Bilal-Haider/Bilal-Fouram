import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    } else {
      localStorage.removeItem("name");
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }, []);
}

export default Logout;
