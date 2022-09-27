import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Web3 from "web3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NetworkChange from "./networkSwitch";
import AllDiscussions from "./components/AllDiscussions";
import MainPage from "./components/UserPenal/MainPage";
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import Login from "./components/Login";

const web3 = new Web3(
  Web3.givenProvider
    ? Web3.givenProvider
    : "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
function App() {
  const [open, setOpen] = useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  // useEffect(() => {
  //   let chain = async () => {
  //     const chainid = await web3.eth.getChainId();
  //     if (chainid !== 97) {
  //       setOpen(true);
  //     }
  //   };
  //   chain();
  // }, []);

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
        <Header setOpensign={setOpenSign} setOpenlogin={setOpenLogin} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home setOpenlogin={setOpenLogin} />}
          />
          <Route path="/profile" element={<MainPage />} />
          <Route path="/AllDiscussions" element={<AllDiscussions />} />
          <Route path="/AllDiscussions/:value" element={<AllDiscussions />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
