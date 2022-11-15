import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { MdPendingActions, MdDisabledByDefault } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import Approved from "./Approved";
import Pending from "./Pending";
import Rejected from "./Rejected";
import Loading from "../../loading";
import { url } from "../../utils";
const useStyles = makeStyles({
  paperMenu: {
    background: "#3f385b !important",
    justifyContent: "center",
    width: "92%",
  },
});
export default function AdminPanel() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:700px)");
  const [tabText, settabText] = useState("Approved");
  const [loading, setLoading] = useState(false);
  const [reRenderstate, setRerenderstate] = useState(false);
  const [show, setShow] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));
  const [Approvedstate, setApprovedstate] = useState([]);
  const [pendingpost, setPendingpost] = useState([]);
  const [rejected, setRejectedstate] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchApproved = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/fetchapprovedposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("All data !", data);
          setApprovedstate(data?.posts);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchPending = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/fetchpendingposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approved data !", data);
          setPendingpost(data?.posts);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchRejected = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/fetchrejectedposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Rejected data !", data);
          setRejectedstate(data?.posts);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    idstate && fetchApproved();
    idstate && fetchPending();
    idstate && fetchRejected();
  }, [idstate, reRenderstate]);
  return (
    <>
      <Loading loading={loading} />
      <Box bgcolor="primary.light">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box
              py={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection={matches ? "column" : "row"}
            >
              <Typography
                variant="body1"
                textAlign="center"
                color="text.main"
                fontSize="25px"
                fontWeight="700"
              >
                Admin Panel
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box mt={5}>
          {matches ? (
            <Grid item xs={12} sm={4} md={12}>
              <>
                <Button
                  startIcon={
                    tabText === "Approved" ? (
                      <FcApproval
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : tabText === "Pending" ? (
                      <MdPendingActions
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : (
                      <MdDisabledByDefault
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    )
                  }
                  sx={{
                    width: "100%",
                    bgcolor: "primary.main",
                    color: "text.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }}
                  onClick={handleClick}
                >
                  {tabText}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  classes={{ paper: classes.paperMenu }}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontFamily="Open Sans"
                      fontSize="17px"
                      color="text.main"
                      width="100%"
                      onClick={() => settabText("Approved")}
                    >
                      <FcApproval
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Approved
                    </Box>
                  </MenuItem>

                  <MenuItem onClick={handleClose} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontFamily="Open Sans"
                      color="text.main"
                      fontSize="17px"
                      width="100%"
                      onClick={() => settabText("Pending")}
                    >
                      <MdPendingActions
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Pending
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontFamily="Open Sans"
                      color="text.main"
                      fontSize="17px"
                      width="100%"
                      onClick={() => settabText("Rejected")}
                    >
                      <MdDisabledByDefault
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Rejected
                    </Box>
                  </MenuItem>
                </Menu>
              </>
            </Grid>
          ) : null}
          <Grid container spacing={5}>
            {matches ? null : (
              <Grid item xs={0} md={3}>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center">
                    <Box
                      color={show === 0 ? "primary.main" : "primary.light"}
                      fontWeight={show === 0 ? 700 : 500}
                      ml={3}
                      fontSize="17px"
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow(0)}
                    >
                      <FcApproval
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Approved {Approvedstate?.length}
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color={show === 1 ? "primary.main" : "primary.light"}
                      fontWeight={show === 1 ? 700 : 500}
                      ml={3}
                      fontSize="17px"
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow(1)}
                    >
                      <MdPendingActions
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Pending {pendingpost?.length}
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color={show === 2 ? "primary.main" : "primary.light"}
                      fontWeight={show === 2 ? 700 : 500}
                      ml={3}
                      fontSize="17px"
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow(2)}
                    >
                      <MdDisabledByDefault
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Rejected {rejected?.length}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9}>
              {show === 0 ? (
                <Approved
                  Approvedstate={Approvedstate}
                  func={setRerenderstate}
                  state={reRenderstate}
                />
              ) : show === 1 ? (
                <Pending
                  pendingpost={pendingpost}
                  func={setRerenderstate}
                  state={reRenderstate}
                />
              ) : (
                <Rejected
                  rejected={rejected}
                  func={setRerenderstate}
                  state={reRenderstate}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
