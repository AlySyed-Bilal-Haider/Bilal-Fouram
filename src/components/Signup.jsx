import React from "react";
import { Typography, Box, InputBase, Button } from "@mui/material";
import { styled } from "@mui/styles";
import { NavLink } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import "./Signup.css";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { withStyles } from "@mui/styles";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="bottom" ref={ref} {...props} />;
});
const StyledModal = withStyles(() => ({
  root: {
    "& .MuiDialog-paper":{
     width:"25% !important"
    },
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
      height: "100% !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
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
const TextInput = styled(InputBase)((theme) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "primary.main",
    fontSize: "18px",
    padding: "15px 20px",
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
}));

function Signup({ open, setOpensign }) {
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
      <Box sx={{float:"right",p:1,cursor:'pointer'}}>
       <CloseIcon sx={{color:"text.detail"}} onClick={handleClose}/>
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
                fontWeight:700
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
                type="text"
                sx={{
                  width: "100%",
                  my: 1,
                  color: "primary.main",
                  backgroundColor: "white",
                }}
                placeholder="Username"
              />
              <br />
              <TextInput
                type="text"
                sx={{
                  width: "100%",
                  my: 1,
                  color: "primary.main",
                  backgroundColor: "white",
                }}
                placeholder="Email"
              />
              <br />
              <TextInput
                type="text"
                sx={{
                  width: "100%",
                  my: 1,
                  color: "primary.main",
                  backgroundColor: "white",
                }}
                placeholder="Password"
              />
              <br />
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  my: 1,
                  color: "text.main",
                  p: 2,
                  mt: 2,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
                value="submit"
              >
                Submit
              </Button>
              <br />
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
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "20px",
                  color: "text.lightcolor",
                  backgroundColor: "white",
                }}
              >
                Already have an account ?
              </Typography>
              <NavLink
                to="/"
                style={{ color: "#BA995B", textDecoration: "none" }}
              >
                login
              </NavLink>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledModal>
  );
}

export default Signup;
