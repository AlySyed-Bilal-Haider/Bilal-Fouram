import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import verfiyimg from "../images/emailverify.svg";
import axios from "axios";
import { url } from "../utils";
import Loading from "../loading";

import { useParams, NavLink } from "react-router-dom";
function Emailverfiy() {
  console.log("hello");
  const params = useParams();
  const [loading, setloading] = useState(true);
  const [emailverify, setEmailverify] = useState();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`${url}/verifyEmail/${params?.id}`);
        console.log("email verify", data);
        setEmailverify(data?.message);
        setloading(false);
      } catch (error) {
        console.log("error email verify", error);
        setEmailverify(error?.message);
        setloading(false);
      }
    };
    verifyEmail();
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          py: 2,
          mt: { md: 3, xs: 2 },
        }}
      >
        <br />
        <Box sx={{ m: 1, textAlign: "center" }}>
          <img src={verfiyimg} alt="" style={{ width: "50%" }} />
        </Box>
        <Typography
          sx={{
            fontSize: { md: "22px", xs: "18px", textAlign: "center" },
            fontWeight: 700,
            p: 1,
          }}
        >
          {emailverify} !
        </Typography>
        <NavLink to="/">
          <Typography textDecoration="none" sx={{ cursor: "pointer" }}>
            Back to Home
          </Typography>
        </NavLink>
      </Box>
    </>
  );
}

export default Emailverfiy;
