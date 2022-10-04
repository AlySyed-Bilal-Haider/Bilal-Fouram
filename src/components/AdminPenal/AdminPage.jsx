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
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
// import jsonwebtoken from "jsonwebtoken";
// import { toast } from "react-toastify";
import { MdPendingActions, MdDisabledByDefault } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
// import moment from "moment";

import Approved from "./Approved";
import Pending from "./Pending";
import Rejected from "./Rejected";

// import axios from "axios";
// import { url } from "../../utils";

const useStyles = makeStyles({
  paperMenu: {
    background: "#3f385b !important",
    justifyContent: "center",
    width: "92%",
  },
});
export default function AdminPanel() {
  //   const formData = new FormData();
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:700px)");
  const [tabText, settabText] = useState("Approved");
  //   const [userProfilestate, setProfilestate] = useState("");
  //   const [userfile, setUserfile] = useState("");

  const [show, setShow] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   const userProfileHandler = async () => {
  //     try {
  //       const { data } = await axios.get(`${url}/fetchuser/${userMail}`);
  //       console.log("data", data);
  //       setProfilestate(data);
  //       setIDstate(data._id);
  //     } catch (error) {
  //       console.log("user profile issues", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (!!userMail) {
  //       userProfileHandler();
  //     }
  //   }, [userMail]);

  // image upload from server
  //   const handleFile = async (event) => {
  //     let file = event.target.files[0];
  //     setUserfile(file);
  //   };
  //   const handlerSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       if (userfile) {
  //         formData.append("file", userfile);
  //         formData.append("id", userid);
  //         const response = await axios.post(`${url}/uploadimg`, formData);
  //         console.log("response", response);
  //         if (userMail && response) {
  //           userProfileHandler();
  //         }
  //         setUserfile("");
  //       } else {
  //         toast.error("Choose the file!");
  //       }
  //     } catch (error) {
  //       console.log("error upload", error);
  //     }
  //   };

  return (
    <>
      <Box bgcolor="primary.light">
        {/* height="150px" */}
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box
              py={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection={matches ? "column" : "row"}
            >
              {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                  }}
                >
                  {userProfilestate?.img ? (
                    <form onSubmit={handlerSubmit}>
                      <div className="image-show">
                        <label for="file-input">
                          <img
                            src={`${url}/upload/${userProfilestate?.img}`}
                            alt="avtar"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            loading="lazy"
                          />
                        </label>

                        <input
                          id="file-input"
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={handleFile}
                        />
                      </div>
                      <Box py={1} textAlign="center">
                        <Button
                          type="submit"
                          sx={{
                            color: "text.main",
                            backgroundColor: "secondary.main",
                            textTransform: "capitalize",
                            width: "80px",
                            "&:hover": {
                              backgroundColor: "secondary.light",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </form>
                  ) : (
                    <form onSubmit={handlerSubmit}>
                      <div className="image-upload">
                        <label for="file-input">
                          <img
                            src={avtar}
                            alt=""
                            style={{ width: "100%", cursor: "pointer" }}
                          />
                        </label>

                        <input
                          id="file-input"
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={handleFile}
                        />
                      </div>
                      <Box py={1} textAlign="center">
                        <Button
                          type="submit"
                          sx={{
                            color: "text.main",
                            backgroundColor: "secondary.main",
                            textTransform: "capitalize",
                            width: "80px",
                            "&:hover": {
                              backgroundColor: "secondary.light",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </form>
                  )}
                </Box>
              </Box>

              <Box
                ml={3}
                display="flex"
                flexDirection="column"
                alignItems={matches ? "center" : "flex-start"}
              >
                <Box
                  color="text.main"
                  fontSize="22px"
                  fontWeight={600}
                  fontFamily="Open Sans"
                  mt={matches ? 2 : 0}
                >
                  {userProfilestate?.name}
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent={matches ? "center" : "flex-start"}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      color="text.light"
                      fontSize="15px"
                      fontWeight={400}
                      fontFamily="Open Sans"
                    >
                      Online
                    </Box>
                    <Box
                      color="text.light"
                      ml={3}
                      fontSize="15px"
                      fontWeight={400}
                      fontFamily="Open Sans"
                    >
                      Joined Date{" "}
                      {moment(userProfilestate?.addedAt).format("LL")}
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box
                      color="text.light"
                      ml={3}
                      fontSize="15px"
                      fontWeight={400}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <BsCheckLg style={{ marginRight: "5px" }} /> 0 best
                      answers
                    </Box>
                    <Box
                      color="text.light"
                      ml={3}
                      fontSize="15px"
                      fontWeight={400}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <FaRibbon style={{ marginRight: "5px" }} /> 0 points
                    </Box>
                  </Box>
                </Box>
              </Box> */}

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
                      Approved 0
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
                      Pending 0
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
                      Rejected 0
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9}>
              {show === 0 ? (
                <Approved />
              ) : show === 1 ? (
                <Pending />
              ) : (
                <Rejected />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}