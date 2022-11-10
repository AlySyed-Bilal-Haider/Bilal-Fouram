import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Home from "./components/Home";
import NetworkChange from "./networkSwitch";
import AllDiscussions from "./components/AllDiscussions";
import AdminPanel from "./components/AdminPenal/AdminPage";
import MainPage from "./components/UserPenal/MainPage";
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { url } from "./utils";
import Emailverfiy from "./components/Emailverfiy";
import Forgetpassord from "./components/ForgetPassword.jsx";
const PrivateRoute = ({ children, checkrole }) => {
  if (checkrole !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};
function App() {
  const [open, setOpen] = useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setusernameState] = React.useState("");
  const [checkrole, setRolestate] = useState("");
  const tokenVerfiy = async () => {
    try {
      await fetch(`${url}/verifytoken`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("name", data.name);
          localStorage.setItem("user_id", data.id);
          setusernameState(data.name);
          setUserId(data.id);
          setRolestate(data?.role);
        });
    } catch (error) {
      console.log("Token verify route", error);
    }
  };

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      tokenVerfiy();
    }
  }, []);
  ///////////check user verified "YES or NO"//////////

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Signup
        open={openSign}
        setOpensign={setOpenSign}
        setOpenlogin={setOpenLogin}
      />
      <Login
        open={openLogin}
        setOpenlogin={setOpenLogin}
        setOpensign={setOpenSign}
      />
      <NetworkChange open={open} setOpen={setOpen} />
      <Box sx={{ backgroundColor: "body.main" }}>
        <Header
          setOpensign={setOpenSign}
          setOpenlogin={setOpenLogin}
          name={username}
          role={checkrole}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home setOpenlogin={setOpenLogin} userid={userId} />}
          />
          <Route path="/profile/:id" element={<MainPage />} />
          <Route
            path="/AllDiscussions"
            element={
              <AllDiscussions setOpenlogin={setOpenLogin} username={username} />
            }
          />
          <Route path="/AllDiscussions/:value" element={<AllDiscussions />} />
          <Route
            path="/detail/:id"
            element={<Detail userId={userId} username={username} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/resetpassword/:id/:token" element={<Forgetpassord />} />
          <Route path="/verifyemail/:id" element={<Emailverfiy />} />
          <Route
            path="/admin"
            element={
              <>
                <PrivateRoute checkrole={checkrole}>
                  <AdminPanel />
                </PrivateRoute>
              </>
            }
          />
        </Routes>
      </Box>
    </>
  );
}
export default App;
