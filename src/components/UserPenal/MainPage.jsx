import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  // Paper,
  useMediaQuery,
  // InputBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { BsCheckLg } from "react-icons/bs";
import { FaRibbon } from "react-icons/fa";
import { BiMessageRounded, BiMenu, BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import Post from "./Post";
import Discussion from "./Discussion";
import precisePlugin from "moment-precise-range-plugin";
import Vote from "./Votes";
import Like from "./Likes";
import Mention from "./Mention";
import moment from "moment";
import avtar from "../../images/avtar.png";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../utils";
import Loading from "../../loading";
import { useParams } from "react-router-dom";
const useStyles = makeStyles({
  paperMenu: {
    background: "#3f385b !important",
    justifyContent: "center",
    width: "92%",
  },
});
export default function MainPage() {
  const params = useParams();
  const id = params?.id;
  const formData = new FormData();
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:700px)");
  const [tabText, settabText] = useState("Post");
  const [userProfilestate, setProfilestate] = useState("");
  const [userfile, setUserfile] = useState("");
  const user_id = localStorage.getItem("user_id") || "";
  const [show, setShow] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alldata, setAlldatastate] = useState("");
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userProfileHandler = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.post(`${url}/fetchuser/${id}`);
      console.log("data", data);
      setProfilestate(data);
      setLoading(false);
    } catch (error) {
      console.log("user profile issues", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      userProfileHandler();
    }
  }, [id]);

  // fetch all record from server
  const fetchallrecord = async () => {
    try {
      const { data } = await axios.post(`${url}/fetchuserposts/${id}`);
      console.log(data, "data--hi hsdasdfas asdfa sd-=-->");
      setAlldatastate(data);
    } catch (error) {
      console.log("Likes error", error);
    }
  };

  // image upload from server
  const handleFile = async (event) => {
    let file = event.target.files[0];
    setUserfile(file);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userfile) {
        formData.append("file", userfile);
        formData.append("id", params?.id);
        const response = await axios.post(`${url}/uploadimg`, formData);
        if (user_id && response) {
          userProfileHandler();
          fetchallrecord();
        }
        setUserfile("");
      } else {
        toast.error("Choose the file!");
      }
    } catch (error) {
      console.log("error upload", error);
    }
  };

  // fetch all records post
  useEffect(() => {
    id && fetchallrecord();
  }, [id]);
  // date difference between twoo dates
  const currentdate = new Date().toLocaleDateString();
  const joindate = new Date(userProfilestate?.addedAt).toLocaleDateString();
  const date1 = moment(joindate, "YYYY-MM-DD");
  const date2 = moment(currentdate, "YYYY-MM-DD");
  let diff = moment.preciseDiff(date2, date1, true);

  return (
    <>
      <Box bgcolor="primary.light" height="260px">
        <Loading loading={loading} />
        <Container maxWidth="lg">
          <Box display="flex" flexDirection="column">
            <Box
              py={5}
              display="flex"
              alignItems="center"
              flexDirection={matches ? "column" : "row"}
            >
              <Box
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
                      {diff?.months > 0
                        ? new Date().toLocaleDateString()
                        : `${diff?.days} days ago`}
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
                <Post username={userProfilestate?.name} id={id} />
              ) : show == 1 ? (
                <Discussion id={id} />
              ) : show === 2 ? (
                <Like id={id} />
              ) : show === 3 ? (
                <Vote id={id} />
              ) : (
                <Mention id={id} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
