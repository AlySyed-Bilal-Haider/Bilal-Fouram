import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import AccountMenu from "./MenuItem";
import Loading from "../loading";
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import { styled } from "@mui/styles";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { url } from "../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledModal = withStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      width: "350px !important",
    },
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
      height: "100% !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
    },
    "& .MuiDialogContent-root": {
      padding: "15px 0px !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: `${theme.palette.primary.light} !important`,
      boxShadow: "black 0px 0px 8px 1px",
      borderRadius: "5px",
    },
    "& .dialoge__content__section": {
      background: "formscheme.main",
    },
  },
}))(Dialog);

const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#D9D9D9",
    fontSize: "18px",
    padding: "12px 20px",
    marginTop: "10px",
    textAlign: "center",
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
});

function Login({ open, setOpenlogin, setOpensign }) {
  const [menuItem, setMenuitem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userstate, setUserstate] = React.useState({
    email: "",
    password: "",
  });
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpenlogin(false);
  };

  //Submit form, after filling the user form;
  const loginHandler = async () => {
    console.log("userstate:", userstate);
    try {
      setLoading(true);
      const { data } = await axios.post(`${url}/login`, userstate);
      if (data.status == "ok") {
        toast.success(data.message);
        localStorage.setItem("token", data.user);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        setTimeout(() => {
          window.location.href = "/";
        }, 0);
        handleClose();
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
    setUserstate({
      name: "",
      email: "",
      password: "",
    });
  };
  // const signupHandler = () => {
  //   // setOpensign(true);
  //   setloginstate(false);
  // };
  return (
    <>
      <Loading loading={loading} />
      <StyledModal
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialoge__content__section">
          <Box sx={{ float: "right", p: 1, cursor: "pointer" }}>
            <CloseIcon sx={{ color: "text.main" }} onClick={handleClose} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              align: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  paddingBottom: "20px",
                  color: "text.main",
                  fontWeight: 700,
                }}
              >
                Log in
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  padding: "30px 25px",
                  backgroundColor: "formscheme.main",
                }}
              >
                <TextInput
                  fullWidth
                  type="email"
                  value={userstate.email || ""}
                  onChange={changeHandler}
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                />

                <TextInput
                  fullWidth
                  type="password"
                  value={userstate.password || ""}
                  onChange={changeHandler}
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  autoFocus
                />

                <Button
                  onClick={loginHandler}
                  type="submit"
                  sx={{
                    width: "100%",
                    my: 1,
                    py: 1.5,
                    color: "text.main",
                    backgroundColor: "secondary.main",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                  value="submit"
                >
                  Submit
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    padding: "20px",
                    color: "text.light",
                  }}
                >
                  Don't have an account?
                </Typography>

                <Typography
                  onClick={() => {
                    setOpensign(true);
                    setOpenlogin(false);
                  }}
                  variant="body1"
                  component="span"
                  fontWeight="700"
                  color="text.main"
                  borderBottom="1px solid #D9D9D9"
                  textDecoration="none"
                  sx={{ cursor: "pointer" }}
                >
                  Sign up
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </StyledModal>
      {menuItem && <AccountMenu />}
      {/* {opensign && <Signup setOpensign={setOpensign} opensign={opensign} />} */}
    </>
  );
}

export default Login;
