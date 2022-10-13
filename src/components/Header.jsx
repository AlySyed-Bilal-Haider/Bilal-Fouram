import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountMenu from "./MenuItem";
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
  styled,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import axios from "axios";
import logo from "../images/logo.png";
import Autocomplete from "@mui/material/Autocomplete";
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

const Autocompletege = styled(Autocomplete)(({ theme }) => ({
  "& .MuiAutocomplete-inputFocused": {
    border: "none",
    outline: "none",
  },
  "& .css-rwpby0-MuiListSubheader-root-MuiAutocomplete-groupLabel": {
    backgroundColor: theme.palette.primary.main,
  },
}));
export default function Header({ setOpensign, setOpenlogin, name, role }) {
  // const { account, connect, disconnect, signer } = useContext(AppContext);
  // const tokenContract = useTokenContract(signer);
  const navigate = useNavigate();
  const [filterState, setFilterstate] = useState([]);
  const searchHandle = async (e, value) => {
    const key = e.target.value || "";
    try {
      if (key || value?.name) {
        const searchvalue = key || value?.name;
        console.log("searchvalue:", searchvalue);
        const { data } = await axios.get(`${url}/search/${searchvalue}`);
        setFilterstate(data);
      }
    } catch (error) {
      console.log("search error:", error);
    }
  };

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

  // navigation from one component to userProfile
  const navigateHandle = (id) => {
    navigate(`/profile/${id}`);
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

  return (
    <>
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

                    <Autocompletege
                      autoComplete="off"
                      id="grouped-demo"
                      disablePortal={true}
                      sx={{
                        position: "relative",
                        width: { md: "300px", xs: "200px" },
                        padding: "0px",
                        color: "text.primary",

                        "& .MuiAutocomplete-popupIndicator": {
                          color: "text.secondary",
                        },
                        "& .MuiAutocomplete-clearIndicator": {
                          color: "text.secondary",
                        },
                        "& .MuiAutocomplete-root": {
                          backgroundColor: "primary.main",
                          // color: "#fff"
                          "&:hover": {
                            border: "none !important",
                            ouline: "none !important",
                          },
                        },
                      }}
                      multiple={false}
                      options={filterState}
                      onChange={() => {
                        searchHandle();
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option?._id === value?._id
                      }
                      getOptionLabel={(option) => option?.name}
                      renderOption={(props, option) => (
                        <Box
                          sx={{
                            color: "text.primary",
                            fontSize: "10px",
                            py: 1,
                            borderBottom: "1px solid #32241A",
                            cursor: "pointer",
                            outline: "none",
                            "&:hover": {
                              outline: "none",
                            },
                          }}
                          {...props}
                          onClick={() => {
                            navigateHandle(option._id);
                          }}
                        >
                          {option.name || ""}{" "}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          autoFocus={false}
                          sx={{
                            height: "25px",
                            mt: -0.5,
                            position: "relative",
                            backgroundColor: "none",

                            "& .MuiOutlinedInput-root": {
                              padding: "0px !important",
                            },
                            "& fieldset": { border: "none", outline: "none" },
                          }}
                          {...params}
                          onChange={(e) => {
                            searchHandle(e);
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                          placeholder="Search...."
                        />
                      )}
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
