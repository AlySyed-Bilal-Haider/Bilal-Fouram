import { useEffect } from "react";
function Logout() {
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
