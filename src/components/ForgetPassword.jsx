import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../loading";
import userverified from "../images/userverified.svg";
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
import { useParams } from "react-router-dom";

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

function Forgetpassord() {
  const params = useParams();
  const id = params?.id;
  const token = params?.token;
  const [loading, setLoading] = useState(false);
  const [passwordHideshow, setPasswordState] = useState(false);
  const [setCheckToken, setTokenstate] = useState(false);
  const [userstate, setUserstate] = React.useState({
    password: "",
    confirmpass: "",
  });
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setUserstate({
      password: "",
      confirmpass: "",
    });
  };

  useEffect(() => {
    const userverified = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/resetpassword/${id}/${token}`);
        console.log("user verified ", res);
        res?.data.status == true && setTokenstate(true);
        setLoading(false);
      } catch (error) {
        toast.error("Network error !");
        console.log(error);
        setLoading(false);
      }
    };
    userverified();
  }, [id, token]);

  //Submit form, after filling the user form;
  const PasswordChangeHandler = async () => {
    try {
      if (
        userstate.confirmpass !== "" ||
        userstate.password !== "" ||
        userstate.confirmpass == userstate.password
      ) {
        setLoading(true);
        const passwordvalue = { password: userstate.password };
        const { data } = await axios.post(
          `${url}/resetpassword/${id}/${token}`,
          passwordvalue
        );
        if (data.status === true) {
          toast.success(data.message);

          setTimeout(() => {
            window.location.href = "/";
          }, 500);

          handleClose();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Please fill login form or enter confirm password !");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message);
    }
  };

  const passwordHideshowfunc = () => {
    setPasswordState(!passwordHideshow);
  };
  const passwordstyle = {
    backgroundColor: "#D9D9D9",
    height: "50px",
    marginTop: "10px",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "0px",
    pl: 2,
    marginLeft: "-7px",
  };
  return (
    <>
      <Loading loading={loading} />
      {setCheckToken == true ? (
        <StyledModal
          open="true"
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
                  Check user verified !
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
                    type={passwordHideshow ? "text" : "password"}
                    value={userstate.password || ""}
                    onChange={changeHandler}
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    endAdornment={
                      <IconButton
                        style={passwordstyle}
                        onClick={passwordHideshowfunc}
                      >
                        {passwordHideshow ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                  />
                  <TextInput
                    fullWidth
                    type={passwordHideshow ? "text" : "password"}
                    value={userstate.confirmpass || ""}
                    name="confirmpass"
                    autoComplete="off"
                    onChange={changeHandler}
                    placeholder="Confirm Password"
                    endAdornment={
                      <IconButton
                        style={passwordstyle}
                        onClick={passwordHideshowfunc}
                      >
                        {passwordHideshow ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                  />
                  <Button
                    onClick={PasswordChangeHandler}
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
                    Change passowrd
                  </Button>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </StyledModal>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: "10%" }}>
          <img src={userverified} alt="Verified" width="30%" height="200px" />
          <Typography sx={{ fontSize: "40px" }}>User not verified !</Typography>
        </Box>
      )}
    </>
  );
}

export default Forgetpassord;
