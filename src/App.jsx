import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Web3 from "web3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NetworkChange from "./networkSwitch";
import AllDiscussions from "./components/AllDiscussions";
import MainPage from "./components/UserPenal/MainPage";
import Signup from "./components/Signup";

const web3 = new Web3(
  Web3.givenProvider
    ? Web3.givenProvider
    : "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
function App() {
  const [open, setOpen] = useState(false);
  const [opensign, setOpensign] = useState(false);

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

      <Signup open={opensign} setOpensign={setOpensign} />
      <NetworkChange open={open} setOpen={setOpen} />
      <Box sx={{ backgroundColor: "body.main" }}>
        <Header open={opensign} setOpensign={setOpensign} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<MainPage />} />
          <Route path="/AllDiscussions" element={<AllDiscussions />} />
          <Route path="/Knowledgebase" element={<AllDiscussions />} />
          <Route path="/general" element={<AllDiscussions />} />
          <Route path="/support" element={<AllDiscussions />} />
          <Route path="/community" element={<AllDiscussions />} />
          <Route path="/proposal" element={<AllDiscussions />} />
          <Route path="/projectpropsal" element={<AllDiscussions />} />
          <Route path="/feedback" element={<AllDiscussions />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
