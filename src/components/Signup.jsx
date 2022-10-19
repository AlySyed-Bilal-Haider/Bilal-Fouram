import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../loading";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Box,
  InputBase,
  Button,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/styles";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
    "&:focus": {
      backgroundColor: "#D9D9D9",
    },
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "input:-internal-autofill-selected": {
      backgroundColor: "#D9D9D9 !important",
    },
  },
});

function Signup({ open, setOpensign, setOpenlogin }) {
  const [userstate, setUserstate] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordHideshow, setPasswordState] = useState(false);
  const [loading, setLoading] = useState(false);
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  //Submit form, after filling the user form;
  const submitHandler = async () => {
    try {
      if (
        userstate.name !== "" ||
        userstate.email !== "" ||
        userstate.password !== ""
      ) {
        setLoading(true);
        const { data } = await axios.post(`${url}/usersignup`, userstate);
        toast.success(data.message);
        setUserstate({
          name: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("Please fill Signup form !");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpensign(false);
  };

  const passwordHideshowfunc = () => {
    setPasswordState(!passwordHideshow);
  };
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
            <FormControl onSubmit={submitHandler} onkeyPress={submitHandler}>
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
                    autocomplete="false"
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
                    autocomplete="false"
                    value={userstate.email || ""}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={changeHandler}
                    required
                  />

                  <TextInput
                    fullWidth
                    type={passwordHideshow ? "text" : "password"}
                    value={userstate.password || ""}
                    onChange={changeHandler}
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    endAdornment={
                      <IconButton
                        style={{
                          backgroundColor: "#D9D9D9",
                          height: "50px",
                          marginTop: "10px",
                          borderTopRightRadius: "5px",
                          borderTopLeftRadius: "5px",
                          borderBottomRightRadius: "5px",
                          borderBottomLeftRadius: "0px",
                          pl: 2,
                          marginLeft: "-7px",
                        }}
                        onClick={passwordHideshowfunc}
                      >
                        {passwordHideshow ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                    required
                  />

                  <Button
                    onClick={submitHandler}
                    onKeyDown={(e) => {
                      e.key === "Enter" && submitHandler();
                    }}
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
            </FormControl>
          </Box>
        </DialogContent>
      </StyledModal>
    </>
  );
}

export default Signup;
