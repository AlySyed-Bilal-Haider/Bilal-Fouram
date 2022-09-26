import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./MenuItem";
import jsonwebtoken from "jsonwebtoken";

import {
  Paper,
  Box,
  Button,
  Container,
  Typography,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";

import axios from "axios";
// import { AppContext } from "../utils";
// import { ToastNotify, useTokenContract } from "../ConnectivityAssets/hooks";
import Login from "./Login";

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
    background: "#282439 !important",
    justifyContent: "center",
  },
});

export default function Header({ setOpensign, setOpenlogin }) {
  // const { account, connect, disconnect, signer } = useContext(AppContext);
  // const tokenContract = useTokenContract(signer);
  const [namestate, setnamestate] = useState("");
  const [searchstate, setsearchstate] = useState(true);
  const [filterstate, setfilterstate] = useState("");
  const [options, setOptionsstate] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // fetch all details from sever
  const url = "http://localhost:4000";
  useEffect(() => {
    console.log("Header functions");
    const fetchdetails = async () => {
      try {
        const { data } = await axios.get(`${url}/alldiscussion`);
        setOptionsstate(data.allDiscussion);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdetails();
  }, []);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      const user = jsonwebtoken.decode(token);
      setnamestate(user?.name);
    }
  }, []);
  // const [alertState, setAlertState] = useState({
  //   open: false,
  //   message: "",
  //   severity: undefined,
  // });
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

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
      <Box mt={-30} mb={5} display="flex" justifyContent="center">
        <Link to="/">
          <img width="160px" src={logo} alt="" />
        </Link>
      </Box>
      <List>
        {["Log in", "Sign up"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "text.main",
                fontSize: "13px",
              }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
      {/* <Box mb={1} display="flex" justifyContent="center">
        {account ? (
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
        )}
      </Box> */}
    </div>
  );
  return (
    <>
      {/* <ToastNotify alertState={alertState} setAlertState={setAlertState} /> */}
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
            <Box>
              <Link to="/">
                <img src={logo} alt="Miner dao" style={{ width: "130px" }} />
              </Link>
            </Box>

            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Hidden mdDown>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "text.light",
                      backgroundColor: "secondary.main",
                      borderRadius: "4px",
                    }}
                  >
                    <SearchIcon fontSize="small" sx={{ ml: 1 }} />
                    <InputBase
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "text.light",
                        borderRadius: "4px",
                        height: "36px",
                        padding: searchstate
                          ? "10px 20px 8px 10px"
                          : "10px 100px 8px 10px",
                        border: "none",
                        outline: "none",
                        transitionProperty: "padding",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "linear",
                        transitionDelay: "0s",
                      }}
                      type="text"
                      name="search"
                      placeholder="Search Forum"
                      onClick={() => {
                        setsearchstate(false);
                      }}
                      onMouseLeave={() => {
                        setsearchstate(true);
                      }}
                    />
                  </Box>
                  {namestate ? (
                    <AccountMenu />
                  ) : (
                    <>
                      <Typography
                        ml={4}
                        variant="body1"
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "text.main",
                        }}
                        onClick={() => {
                          setOpenlogin(true);
                        }}
                      >
                        Log in
                      </Typography>

                      <Typography
                        ml={4}
                        variant="body1"
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "text.main",
                        }}
                        onClick={() => {
                          setOpensign(true);
                        }}
                      >
                        Sign up
                      </Typography>
                    </>
                  )}

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
                          color: "#fff",
                        }}
                      ></MenuIcon>
                    </Button>
                    <Paper>
                      <SwipeableDrawer
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
