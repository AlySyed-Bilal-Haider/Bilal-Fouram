import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Box,
  Button,
  useMediaQuery,
  Container,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";

import { AppContext } from "../utils";
import { ToastNotify, useTokenContract } from "../ConnectivityAssets/hooks";

import logo from "../images/logo.png";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    // background: "primary.main !important",
    justifyContent: "center",
  },
  hover: {
    "&:hover": {
      color: "#FFB800",
    },
  },
});

export default function Header() {
  const { account, connect, disconnect, signer } = useContext(AppContext);
  const tokenContract = useTokenContract(signer);
  const [searchstate, setsearchstate] = useState(true);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const matches = useMediaQuery("(max-width:960px)");
  const matches1 = useMediaQuery("(max-width:1279px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box mt={-20} display="flex" justifyContent="center">
        <img width="100px" src="/logo.png" alt="" />
      </Box>
      <List>
        {["Log in", "Sign up"].map((text, index) => (
          <ListItem
            button
            style={{
              justifyContent: "center",
              borderBottom: "1px solid #bbb8b8",
            }}
            key={text}
          >
            <ListItemText
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "text.primary",
                fontSize: "13px",
              }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
      <Box mb={1} display="flex" justifyContent="center">
        {/* {account ? (
          <Box
            width="90%"
            height="42px"
            bgcolor="#098CDC"
            borderRadius="8px"
            sx={{ cursor: "pointer" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="primary.main"
            fontWeight="500"
            fontSize="16px"
            onClick={() => disconnect()}
            style={{ zIndex: 1 }}
          >
            {account.slice(0, 4) + "..." + account.slice(-4)}
          </Box>
        ) : (
          <Box
            zIndex={1}
            sx={{
              cursor: "pointer",
              bgcolor:"primary.main"
            }}
            width="90%"
            height="42px"
            fontWeight="500"
            borderRadius="8px"
            fontSize="20px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => connect()}
          >
            Connect
          </Box>
        )} */}
      </Box>
    </div>
  );
  return (
    <>
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "primary.main",
          zIndex: "100px",
          py: 1,
        }}
        height="52px"
        width="100%"
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // flexBasis="20%"
            >
              <Box
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",

                  fontSize: "20px",
                }}
              >
                <img
                  src={logo}
                  alt="Miner dwo"
                  style={{ width: "30px", height: "30px" }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent={matches1 ? "end" : "space-between"}
              alignItems="center"
              // flexBasis={matches1 ? "45px" : "78%"}
            >
              <Box
                display="flex"
                justifyContent="space-around"
                // flexBasis={matches1 ? "0px" : "70%"}
                alignItems="center"
              >
                <Hidden mdDown>
                  <Box
                    mr={6}
                    fontSize="20px"
                    zIndex="1"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "text.primary",
                      backgroundColor: "primary.light",
                      borderRadius: "4px",
                    }}
                  >
                    <SearchIcon sx={{ ml: 2 }} />
                    <input
                      style={{
                        height: "36px",
                        padding: searchstate
                          ? "10px 20px 8px 10px"
                          : "10px 100px 8px 10px",
                        backgroundColor: "#A78A52",
                        border: "none",
                        outline: "none",
                        transitionProperty: "padding",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "linear",
                        transitionDelay: "0s",
                      }}
                      type="text"
                      name="search"
                      placeholder="search"
                      onClick={() => {
                        setsearchstate(false);
                      }}
                      onMouseLeave={() => {
                        setsearchstate(true);
                      }}
                    />
                  </Box>
                  <Box
                    mr={6}
                    fontSize="13px"
                    zIndex="1"
                    sx={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "text.primary",
                    }}
                  >
                    Log in
                  </Box>
                  <Box
                    mr={6}
                    fontSize="13px"
                    zIndex="1"
                    sx={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "text.primary",
                    }}
                  >
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      Sign up{" "}
                    </Link>
                  </Box>
                  {/* {account ? (
                    <Box
                      width="130px"
                      height="42px"
                      bgcolor="#098CDC"
                      borderRadius="8px"
                      sx={{ cursor: "pointer" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="#ffffff"
                      fontWeight="500"
                      fontSize="16px"
                      onClick={() => disconnect()}
                      style={{ zIndex: 1 }}
                    >
                      {account.slice(0, 4) + "..." + account.slice(-4)}
                    </Box>
                  ) : (
                    <Box
                      zIndex={1}
                      style={{
                        cursor: "pointer",
                      }}
                      bgcolor="#098CDC"
                      width="130px"
                      height="42px"
                      fontWeight="500"
                      borderRadius="8px"
                      fontSize="20px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => connect()}
                    >
                      Connect
                    </Box>
                  )} */}
                </Hidden>
              </Box>

              <Hidden mdUp>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      style={{ zIndex: 1 }}
                    >
                      <MenuIcon
                        style={{
                          fontSize: "38px",
                          cursor: "pointer",
                          color: "#000000",
                        }}
                      ></MenuIcon>
                    </Button>
                    <Paper sx={{ backgroundColor: "primary.main" }}>
                      <SwipeableDrawer
                        sx={{ backgroundColor: "primary.main" }}
                        classes={{ paper: classes.paper }}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </Paper>
                  </React.Fragment>
                ))}
              </Hidden>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
