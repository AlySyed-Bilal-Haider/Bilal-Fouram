import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Web3 from "web3";
import { Box } from "@mui/material";

import "./App.css";
import Header from "./components/Header";
import NetworkChange from "./networkSwitch";
import AllDiscussions from "./components/AllDiscussions";
import Knowledgebase from "./components/Knowledgebase";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/UserPenal/MainPage";
const web3 = new Web3(
  Web3.givenProvider
    ? Web3.givenProvider
    : "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
function App() {
  const [open, setOpen] = useState(false);

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
      <NetworkChange open={open} setOpen={setOpen} />
      <Box sx={{ backgroundColor: "body.main" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<MainPage />} />
          <Route path="/AllDiscussions" element={<AllDiscussions />} />
          <Route path="/Knowledgebase" element={<AllDiscussions />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
