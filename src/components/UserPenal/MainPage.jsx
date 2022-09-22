import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Paper,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import jsonwebtoken from "jsonwebtoken";


import { makeStyles } from "@mui/styles";
import { BsCheckLg } from "react-icons/bs";
import { FaRibbon } from "react-icons/fa";
import { BiMessageRounded, BiMenu, BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";

import Post from "./Post";
import Discussion from "./Discussion";
import Vote from "./Votes";
import Like from "./Likes";
import Mention from "./Mention";

import avtar from "../../images/avtar.png";
import axios from "axios";

const useStyles = makeStyles({
  paperMenu: {
    background: "#3f385b !important",
    justifyContent: "center",
    width: "92%",
  },
});
export default function MainPage() {
  const url = "http://localhost:4000";
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:700px)");
  const [tabText, settabText] = useState("Post");
  const [userProfilestate, setProfilestate] = useState("");
  const [userToken, setuserTokenstate] = useState(
    localStorage.getItem("token")
  );
  const [show, setShow] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userProfile = jsonwebtoken.decode(userToken);

  const userProfileHandler = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchuser/${userProfile?.email}`);
      setProfilestate(data);
    } catch (error) {
      console.log("user profile issues", error);
    }
  };
  useEffect(() => {
    if (userProfile?.email) {
      userProfileHandler();
    }
  }, [userProfile?.email]);  
  return (
    <>
      <Box bgcolor="primary.light">
        <Container maxWidth="lg">
          <Box display="flex" flexDirection="column">
            <Box
              py={5}
              display="flex"
              alignItems="center"
              flexDirection={matches ? "column" : "row"}
            >
              <img width="120px" src={avtar} alt="" />
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
                      Joined 3 hours ago
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
              </Box>
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
                    tabText == "Post" ? (
                      <BiMessageRounded
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : tabText == "Discussions" ? (
                      <BiMenu
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : tabText == "Likes" ? (
                      <BiLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : tabText == "Votes" ? (
                      <AiTwotoneLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    ) : (
                      <MdAlternateEmail
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                    )
                  }
                  sx={{
                    width: "100%",
                    bgcolor: "primary.main",
                    color: "text.main",
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
                      onClick={() => settabText("Post")}
                    >
                      <BiMessageRounded
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Post
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
                      onClick={() => settabText("Discussions")}
                    >
                      <BiMenu
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Discussions
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
                      onClick={() => settabText("Likes")}
                    >
                      <BiLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Likes
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="text.main"
                      fontFamily="Open Sans"
                      fontSize="17px"
                      width="100%"
                      onClick={() => settabText("Votes")}
                    >
                      <AiTwotoneLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Votes
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="text.main"
                      fontFamily="Open Sans"
                      fontSize="17px"
                      width="100%"
                      onClick={() => settabText("Mentions")}
                    >
                      <MdAlternateEmail
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Mentions
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
                      <BiMessageRounded
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Post 0
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
                      <BiMenu
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Discussions 0
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
                      <BiLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Likes 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color={show === 3 ? "primary.main" : "primary.light"}
                      fontWeight={show === 3 ? 700 : 500}
                      ml={3}
                      fontSize="17px"
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow(3)}
                    >
                      <AiTwotoneLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Votes 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color={show === 4 ? "primary.main" : "primary.light"}
                      fontWeight={show === 4 ? 700 : 500}
                      ml={3}
                      fontSize="17px"
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow(4)}
                    >
                      <MdAlternateEmail
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />
                      Mentions 0
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9}>
              {show === 0 ? (
                <Post email={userProfile?.email}/>
              ) : show === 1 ? (
                <Discussion email={userProfile?.email}/>
              ) : show === 2 ? (
                <Like />
              ) : show === 3 ? (
                <Vote />
              ) : (
                <Mention />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
