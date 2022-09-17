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
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaRibbon } from "react-icons/fa";
import { BiMessageRounded, BiMenu, BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import avtar from "../../images/avtar.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paperMenu: {
    background: "#D8BB81 !important",
    justifyContent: "center",
    width: "92%",
    "&:hover": {
      color: "#ffffff",
    },
  },
});
export default function MainPage() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:700px)");
  const [tabText, settabText] = useState("Post");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box bgcolor="primary.lightmain">
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
                  MajorSaab143
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
                      color="text.main"
                      fontSize="15px"
                      fontWeight={400}
                      fontFamily="Open Sans"
                    >
                      Online
                    </Box>
                    <Box
                      color="text.main"
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
                      color="text.main"
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
                      color="text.main"
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
                    bgcolor: "primary.lightmain",
                    color: "#ffffff",
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
                      color="primary.light"
                      ml={3}
                      fontSize="17px"
                      fontWeight={500}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <BiMessageRounded
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Post 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color="primary.light"
                      ml={3}
                      fontSize="17px"
                      fontWeight={500}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <BiMenu
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Discussions 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color="primary.light"
                      ml={3}
                      fontSize="17px"
                      fontWeight={500}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <BiLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Likes 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color="primary.light"
                      ml={3}
                      fontSize="17px"
                      fontWeight={500}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <AiTwotoneLike
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Votes 0
                    </Box>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <Box
                      color="primary.light"
                      ml={3}
                      fontSize="17px"
                      fontWeight={500}
                      fontFamily="Open Sans"
                      display="flex"
                      alignItems="center"
                    >
                      <MdAlternateEmail
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Mentions 0
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9}></Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
