import React from "react";
import { NavLink } from "react-router-dom";
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

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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

function Signup({ open, setOpensign, setOpenlogin }) {
  const url = "http://localhost:4000";
  const [userstate, setUserstate] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  //Submit form, after filling the user form;
  const submitHandler = async () => {
    try {
      const { data } = await axios.post(`${url}/usersignup`, userstate);
      toast.success(data.message);
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
    setOpensign(false);
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
              Sign up
            </Typography>
            <Box
              sx={{
                width: "100%",
                padding: "30px 25px",
                backgroundColor: "formscheme.main",
              }}
            >
              <TextInput
                autoComplete="off"
                fullWidth
                value={userstate.name || ""}
                type="text"
                name="name"
                placeholder="Username"
                onChange={changeHandler}
                required
              />

              <TextInput
                fullWidth
                autoComplete="off"
                value={userstate.email || ""}
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeHandler}
                required
              />

              <TextInput
                fullWidth
                autoComplete="off"
                value={userstate.password || ""}
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                required
              />

              <Button
                onClick={submitHandler}
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
                Already have an account?
              </Typography>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  onClick={() => {
                    setOpenlogin(true);
                    setOpensign(false);
                  }}
                  variant="body1"
                  component="span"
                  fontWeight="700"
                  color="text.main"
                  borderBottom="1px solid #D9D9D9"
                  sx={{ cursor: "pointer" }}
                >
                  Log In
                </Typography>
              </NavLink>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledModal>
  );
}

export default Signup;
