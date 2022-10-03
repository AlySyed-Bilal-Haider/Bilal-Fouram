import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("id");
    }
    window.location.href = "/";
  }, []);
}

export default Logout;
