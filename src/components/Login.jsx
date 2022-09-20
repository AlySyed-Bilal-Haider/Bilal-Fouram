import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {  toast } from 'react-toastify';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledModal = withStyles(() => ({
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
      backgroundColor: "#ffffff !important",
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
    color: "primary.main",
    backgroundColor: "#fff",
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

function Login({ open, setloginstate }) {
  const url = "http://localhost:4000";
  const [userstate, setUserstate] = React.useState({
    email: "",
    password: "",
  });
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  //Submit form, after filling the user form;
  const loginHandler = async () => {
    try {
      const { data } = await axios.post(`${url}/login`, userstate);
      toast.success(data.message);
      localStorage.setItem("token", data.user);
    } catch (error) {
      toast.error(error.message);
    }
    setUserstate({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    setloginstate(false);
  };



  return (
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
          <CloseIcon sx={{ color: "text.detail" }} onClick={handleClose} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            align: "center",
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "text.main" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "20px",
                paddingBottom: "20px",
                color: "text.detail",
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
                type="text"
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
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
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
                  color: "text.secondary",
                  backgroundColor: "white",
                }}
              >
                Don't have an account?
              </Typography>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body1"
                  component="span"
                  color="primary.lightmain"
                >
                  Sign up
                </Typography>
              </NavLink>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledModal>
  );
}

export default Login;
