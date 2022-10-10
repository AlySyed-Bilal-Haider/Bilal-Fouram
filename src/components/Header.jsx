import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import axios from "axios";

// import { AppContext } from "../utils";
// import { ToastNotify, useTokenContract } from "../ConnectivityAssets/hooks";

import logo from "../images/logo.png";
import { url } from "../utils";

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

export default function Header({ setOpensign, setOpenlogin, name, role }) {
  // const { account, connect, disconnect, signer } = useContext(AppContext);
  // const tokenContract = useTokenContract(signer);
  const [namestate, setnamestate] = useState("");
  const [searchstate, setsearchstate] = useState(true);
  const [options, setOptionsstate] = useState([]);
  const [filterstate, setfilterstate] = useState("Search here");
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // fetch all details from sever
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const { data } = await axios.get(`${url}/alldiscussion`);
        // setOptionsstate(data.allDiscussion);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdetails();
  }, []);

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
      {name ? (
        <AccountMenu name={name} role={role} />
      ) : (
        <List>
          <ListItem
            button
            key="Log in"
            onClick={() => {
              setOpenlogin(true);
            }}
          >
            <ListItemText
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "text.main",
                fontSize: "13px",
              }}
              primary="Log in"
            />
          </ListItem>
          <ListItem
            button
            key="Sign up"
            onClick={() => {
              setOpensign(true);
            }}
          >
            <ListItemText
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "text.main",
                fontSize: "13px",
              }}
              primary="Sign up"
            />
          </ListItem>
        </List>
      )}
    </div>
  );
  const Autocompletege = styled(Autocomplete)(({ theme }) => ({
    "& .MuiAutocomplete-inputFocused": {
      border: "none",
      outline: "none",
    },
    "& .css-rwpby0-MuiListSubheader-root-MuiAutocomplete-groupLabel": {
      // backgroundColor: theme.palette.text.light,
    },
  }));

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
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "text.light",
                      backgroundColor: "secondary.main",
                      borderRadius: "4px",
                    }}
                  >
                    <SearchIcon
                      style={{
                        fontSize: "40px",
                        cursor: "pointer",
                        padding: "7px",
                        color: "text.secondary",
                        margin: "2px 0px 0px 5px",
                      }}
                    />
                    <InputBase
                      autoComplete="false"
                      type="text"
                      sx={{
                        position: "relative",
                        width: { md: "230px", xs: "150px" },
                        height: "50px",
                        backgroundColor: "none",
                        color: "text.primary",
                        "&::placeholder": {
                          color: "red",
                        },
                      }}
                      onClick={() => {
                        setsearchstate(false);
                      }}
                      onMouseLeave={() => {
                        setsearchstate(true);
                      }}
                      placeholder="search"
                      autoFocus={false}
                    />
                  </Box>
                  {name ? (
                    <AccountMenu name={name} role={role} />
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
