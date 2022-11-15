import { useEffect } from "react";
function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("verified");
    window.location.href = "/";
  }, []);
}

export default Logout;
