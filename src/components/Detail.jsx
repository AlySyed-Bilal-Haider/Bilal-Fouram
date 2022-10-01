import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Reply from "./Reply";
import {
  Box,
  Container,
  Typography,
  styled,
  Checkbox,
  Menu,
  MenuItem,
  InputBase,
  Button,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComments, FaLock } from "react-icons/fa";
import { BsFillPinFill, BsFillHeartFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoCheck } from "react-icons/go";
import axios from "axios";
import moment from "moment";
import Login from "./Login";
import { url } from "../utils";
const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 150,
    borderRadius: "5px",
    border: "1px transparent",
    boxShadow: "none",

    "& .MuiMenu-list": {
      padding: "10px 6px",
      background: "#fff !important",
    },
  },
}));

const LinearProgressBox = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  width: 280,
  marginTop: 15,
  border: `2px solid ${theme.palette.secondary.light}`,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "transparent",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
}));
const BpIcon = styled("span")({
  borderRadius: 3,
  border: "1px solid #282439",
  width: 18,
  height: 18,
  backgroundColor: "transparent",
});
const BpCheckbox = (props) => {
  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={
        <>
          <Box
            width="18px"
            height="18px"
            border="1px solid #282439"
            color="#282439"
            borderRadius="3px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <GoCheck size="14px" />
          </Box>
        </>
      }
      icon={<BpIcon />}
      {...props}
    />
  );
};

export default function Detail({ userId, username }) {
  const param = useParams();
  //close menu tag on click
  const userToken = localStorage.getItem("token");
  const useremail = localStorage.getItem("email");
  const [name, setNamestate] = useState(localStorage.getItem("name"));
  const user_id = localStorage.getItem("user_id");
  const [openstate, setOpenlogin] = useState(false);
  const [descriptionstate, setPostDescription] = useState("");
  const [editPopOpen, setEditPopOpen] = useState(false);
  const [ReplyPopOpen, setReplyPopOpen] = useState(false);
  const [postdetails, setPostdetails] = useState();
  const [postidstate, setPostIdstate] = useState("");
  const [checkstate, setCheckstate] = useState(false);
  const [checklikeUnlike, setChecklikeUnlikestate] = useState("");
  const [renderPost, setRenderstate] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentID, setCommentIDstate] = useState();
  const [commentValue, setcommentValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCommentEdite, setCommentsection] = useState('');
  const [EditecommentValue, setEditevalue] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // .........fetch post details and set states.........
  useEffect(() => {
    fetchdetails();
  }, [param?.id, renderPost]);

  const fetchdetails = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchPostDetails/${param?.id}`);
      console.log("data fetch post", data);
      setPostdetails(data);
      setCommentData(data[0]?.comments);
      setPostDescription(data?.description);
      setPostIdstate(data._id);
    } catch (error) {
      console.log("error details pages", error);
    }
  };
  // check this user is approveed or not
  // const approveORnotapproveCheck = async () => {
  //   const voteinfo = { id: param?.id, email: useremail };
  //   try {
  //     const { data } = await axios.post(`${url}/getvotesdetails`, voteinfo);
  //     console.log("data votes", data);
  //     setCheckstate(data?.votedetails?.checkstatus);
  //   } catch (error) {
  //     console.log("check approve and unapprove", error);
  //   }
  // };
  // useEffect(() => {
  //   useremail && approveORnotapproveCheck();
  // }, []);
  //Approve Handler
  const handleApprove = async () => {
    let approveinfo = { id: param?.id, email: useremail };
    try {
      const { data } = await axios.post(`${url}/approve`, approveinfo);
      // data.status == "ok" && approveORnotapproveCheck();
    } catch (error) {
      console.log("error", error);
    }
  };
  //unapprove handler
  const unapproveHandler = async () => {
    let unapprove = { id: param?.id, email: useremail };
    console.log("unapprove", unapprove);
    try {
      const { data } = await axios.post(`${url}/unapprove`, unapprove);
      console.log("data", data);
      // data.status == "ok" && approveORnotapproveCheck();
    } catch (error) {
      console.log("error", error);
    }
  };
  const CheckloginHandler = () => {
    if (userToken) {
      setEditPopOpen(true);
    } else {
      setOpenlogin(true);
    }
  };

  // checkedlike and dislike  functionality here !
  const checkedLike = async () => {
    try {
      const { data } = await axios.get(
        `${url}/checklike/${param?.id}/${user_id}`
      );
      console.log("status:", data);
      if (data.status) {
        setChecklikeUnlikestate(true);
      } else {
        setChecklikeUnlikestate(false);
      }
    } catch (error) {
      console.log("checked like error !", error);
    }
  };
  useEffect(() => {
    user_id && checkedLike();
  }, [user_id]);

  // ..........like handler ..........
  const likeHandler = async () => {
    const likevalue = { post_id: param?.id, user_id: userId };
    console.log("likevalue:", likevalue);
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/like`, likevalue);
        console.log("like response:", data);
        if (data.message == "ok") {
          checkedLike();
        }
      } else {
        setOpenlogin(true);
      }
    } catch (error) {
      console.log("like error", error);
    }
  };
  // .........unliked handler section ..........
  const unLikedHandler = async () => {
    const unliked = { post_id: param?.id, user_id: userId };
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/unlike`, unliked);
        console.log("unliked response:", data);
        if (data.message == "ok") {
          checkedLike();
        }
      } else {
        setOpenlogin(true);
      }
    } catch (error) {
      console.log("unliked code error", error);
    }
  };

  // .....reply Hanlder , open the reply modal Box......
  const replyHandle = (commentID, commentvalue) => {
    setCommentIDstate(commentID);
    setcommentValue(commentvalue);
    if (userToken) {
      setReplyPopOpen(true);
    } else {
      setOpenlogin(true);
    }
  };

  //  ......... liked reply handle ...........
  const likeReplyHandle = async (comment_id) => {
    const likeReply = { comment_id, user_id: userId };
    console.log("liked");
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/likecomment`, likeReply);
        console.log("like replyed data", data);
        if (data.message == "ok") {
          fetchdetails();
        }
      } else {
        setOpenlogin(true);
      }
    } catch (error) {
      console.log("reply like error !", error);
    }
  };
  // unlike reply handler
  const unLikeReply = async (comment_id) => {
    const unlikeReply = { comment_id, user_id: userId };
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/unlikecomment`, unlikeReply);
        console.log("unlike replyed data", data);
        if (data.message == "ok") {
          fetchdetails();
        }
      } else {
      }
    } catch (error) {
      console.log("reple unlike error !", error);
    }
  };

  const renderDetails = () => {
    setRenderstate(!renderPost);
  };

  // ........remove comment here..........

  const removeComment = async (id) => {
    try {
      const { data } = await axios.delete(`${url}/removeComment/${id}`);
      console.log("comment remove", data);
      data.status == "ok" && setRenderstate(!renderPost);
    } catch (error) {
      console.log("remove comment error:", error);
    }
  };

  const editecomment = (value,id) => {
    console.log("value", value);
    setEditevalue(value);
    setCommentsection(id);
    setAnchorEl(null);
  };

  const updateComment = async (comment_id) => {
    try {
      const newComment = { comment_id, comment: EditecommentValue };
      const { data } = await axios.put(`${url}/editcomment`, newComment);
      console.log("edite comment !", data);
      data.status == "ok" && setRenderstate(!renderPost);
    } catch (error) {
      console.log("comment edite error !", error);
    }
  };

  console.log("openCommentEdite:",openCommentEdite);
  return (
    <>
      <Comment
        open={editPopOpen}
        setOpen={setEditPopOpen}
        post_id={param?.id}
        title={descriptionstate}
        userid={userId}
        username={username}
        renderFetchpost={renderDetails}
      />
      <Reply
        open={ReplyPopOpen}
        setOpen={setReplyPopOpen}
        title={commentValue}
        comment_id={commentID}
        username={username}
        userid={userId}
        renderFetchpost={renderDetails}
      />
      <Box bgcolor="primary.light">
        {postdetails?.map((items, index) => {
          return (
            <>
              <Box
                py={5}
                textAlign="center"
                display="flex"
                flexDirection="column"
                key={index}
              >
                <Box
                  display="flex"
                  color="text.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <BsFillPinFill
                    size="24px"
                    style={{
                      background: "#CD3D31",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                  <FaLock
                    size="26px"
                    style={{
                      marginRight: "7px",
                      background: "#282439",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="primary.main"
                    backgroundColor="text.main"
                    borderRadius="5px"
                    py="1px"
                    width="90px"
                  >
                    <FaRegComments style={{ marginRight: "5px" }} />
                    <Typography
                      variant="body1"
                      fontSize="14px"
                      component="span"
                    >
                      {items?.tag}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  mt={2}
                  variant="body1"
                  fontSize="20px"
                  color="text.main"
                >
                  {items?.title}
                </Typography>
              </Box>
            </>
          );
        })}
      </Box>
      <Container>
        {postdetails?.map((items, index) => {
          return (
            <>
              <Box pb={10} key={index}>
                <Box py={2.5} pl={6} borderBottom="1px solid #fff">
                  <Box py={2} display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      color="primary.main"
                      fontWeight="700"
                    >
                      {name ? name : null}
                    </Typography>
                    <Typography
                      ml={2}
                      variant="body1"
                      color="primary.light"
                      fontSize="13px"
                    >
                      {/* {moment(items?.enddate).format("LL")} */}
                    </Typography>
                  </Box>

                  <Box pr={4} fontSize="14px" color="text.paragraph">
                    {items?.description}
                  </Box>
                </Box>

                <Box
                  py={2}
                  pl={6}
                  borderBottom="1px solid #fff"
                  display="flex"
                  alignItems="center"
                  color="#D13E32"
                >
                  <BsFillPinFill size="25px" style={{ marginRight: "20px" }} />
                  <Typography variant="body1">
                    <span style={{ fontWeight: "800" }}>
                      {name ? name : null}
                    </span>{" "}
                    stickied the discussion.
                  </Typography>
                </Box>

                <Box
                  py={2}
                  pl={6}
                  borderBottom="1px solid #fff"
                  display="flex"
                  alignItems="center"
                  color="primary.light"
                >
                  <FaLock size="23px" style={{ marginRight: "20px" }} />
                  <Typography variant="body1">
                    <span style={{ fontWeight: "800" }}>
                      {name ? name : null}
                    </span>{" "}
                    Locked the discussion.
                  </Typography>
                </Box>
              </Box>
              {/* 
     Poll start here, poll mean Questions and Ans */}
              <Box mt={5} py={2} pl={6} borderBottom="1px solid #fff">
                <Typography
                  variant="body1"
                  fontSize="25px"
                  fontWeight="700"
                  color="primary.main"
                >
                  Poll
                </Typography>

                <Typography
                  mt={2}
                  variant="body1"
                  fontSize="14px"
                  color="primary.light"
                >
                  Questions
                </Typography>

                <Typography
                  mt={3}
                  variant="body1"
                  fontSize="16px"
                  fontWeight="700"
                  color="primary.main"
                >
                  Approve Launch Plan and Base Rate?
                </Typography>

                <Box
                  mt={1}
                  px={2}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "space-between" }}
                  flexWrap="wrap"
                >
                  <Box>
                    <LinearProgressBox variant="determinate" value={5} />
                    <Typography
                      mt={-4.6}
                      variant="subtitle1"
                      display="flex"
                      alignItems="center"
                    >
                      {checkstate == true ? null : (
                        <BpCheckbox
                          onClick={() => {
                            unapproveHandler();
                          }}
                        />
                      )}
                      Do not approve
                    </Typography>
                  </Box>

                  <Box>
                    <LinearProgressBox variant="determinate" value={70} />
                    <Typography
                      mt={-4.6}
                      variant="subtitle1"
                      display="flex"
                      alignItems="center"
                    >
                      {checkstate == true ? null : (
                        <BpCheckbox
                          onClick={() => {
                            handleApprove();
                          }}
                        />
                      )}
                      Approve
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  px={2}
                  mt={2}
                  fontSize="12px"
                  variant="subtitle1"
                  color="primary.light"
                >
                  Poll ends in 11 hours.
                </Typography>

                {/* start comment sections start here */}
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <AiFillLike size="22px" />
                  <AiFillDislike
                    size="22px"
                    style={{ marginLeft: "30px", cursor: "unavailable" }}
                  />
                  <BsFillHeartFill
                    size="22px"
                    style={{ marginLeft: "30px", color: "#DD2E44" }}
                  />

                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      CheckloginHandler();
                    }}
                    ml="30px"
                    variant="body1"
                    fontSize="14px"
                    color="primary.light"
                  >
                    Comment
                  </Typography>
                  {checklikeUnlike == true ? (
                    <Typography
                      onClick={unLikedHandler}
                      ml="30px"
                      variant="body1"
                      fontSize="14px"
                      color="primary.light"
                      sx={{ cursor: "pointer" }}
                    >
                      Unlike
                    </Typography>
                  ) : (
                    <Typography
                      onClick={likeHandler}
                      ml="30px"
                      variant="body1"
                      sx={{
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "primary.light",
                      }}
                    >
                      like
                    </Typography>
                  )}
                </Box>
                {checklikeUnlike == true && (
                  <Typography>This is liked !</Typography>
                )}
                {commentData?.map(({ _id, addedAt, comment,visibility }, index) => {
                  const commentId = _id;
                  return (
                    <>
                     {visibility==true &&
                      <div key={index}>
                        <Box borderBottom="1px solid white" py={1}>
                          <Box py={2} display="flex" alignItems="center">
                            <Typography
                              ml={2}
                              variant="body1"
                              color="primary.light"
                              fontSize="13px"
                            >
                              {moment(addedAt).format("LL")}
                            </Typography>
                          </Box>
                          <Box pr={4} fontSize="14px" color="text.paragraph">
                            {comment}
                          </Box>
                        </Box>
                        {/* like and dislike of comment */}
                        <Box
                          mt={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <AiFillLike size="22px" />
                          <AiFillDislike
                            size="22px"
                            style={{
                              marginLeft: "30px",
                              cursor: "unavailable",
                            }}
                          />
                          <BsFillHeartFill
                            size="22px"
                            style={{ marginLeft: "30px", color: "#DD2E44" }}
                          />

                          <Typography
                            onClick={() => {
                              replyHandle(_id, comment);
                            }}
                            sx={{ cursor: "pointer" }}
                            ml="30px"
                            variant="body1"
                            fontSize="14px"
                            color="primary.light"
                          >
                            Reply
                          </Typography>

                          {commentData[index].like.includes(userId) ? (
                            <Typography
                              onClick={() => {
                                unLikeReply(commentId);
                              }}
                              ml="30px"
                              variant="body1"
                              fontSize="14px"
                              color="primary.light"
                              sx={{ cursor: "pointer" }}
                            >
                              Unlike
                            </Typography>
                          ) : (
                            <Typography
                              onClick={() => {
                                likeReplyHandle(commentId);
                              }}
                              ml="30px"
                              variant="body1"
                              fontSize="14px"
                              color="primary.light"
                              sx={{ cursor: "pointer" }}
                            >
                              like
                            </Typography>
                          )}
                          {/* start remove and update comment */}
                          <BsThreeDots
                            onClick={handleClick}
                            size="22px"
                            style={{ marginLeft: "30px", cursor: "pointer" }}
                          />
                          <StyledMenu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <MenuItem
                              disableRipple
                              sx={{ fontSize: "16px" }}
                              onClick={() => {
                                editecomment(comment,commentId);
                              }}
                            >
                              <GrEdit style={{ marginRight: "15px" }} />
                              Edit
                            </MenuItem>

                            <MenuItem
                              onClick={() => {
                                removeComment(commentId);
                              }}
                              disableRipple
                              sx={{ fontSize: "16px" }}
                            >
                              <RiDeleteBin5Line
                                style={{ marginRight: "15px" }}
                              />
                              <Typography>Delete</Typography>
                            </MenuItem>
                          </StyledMenu>
                        </Box>
                        {/* comment Edite sections here */}
                        {openCommentEdite==commentId ? (
                          <Box m={1}  p={1}>
                            <Typography>Edite comment ....</Typography>
                            <InputBase
                              value={EditecommentValue}
                              name="commentvalue"
                              onChange={(e) => {
                                setEditevalue(e.target.value);
                              }}
                              sx={{
                                border: "none",
                                outline: "none",
                                borderRadius: "5px",
                                p: 1,
                              }}
                              fullWidth
                            />
                            <Button
                              onClick={() => {
                                updateComment(commentId);
                              }}
                              sx={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "green",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "green",
                                },
                              }}
                            >
                              POST
                            </Button>
                          </Box>
                        ):null}
                        {/* Replay start here display */}
                        {commentData[index].reply
                          ? commentData[index].reply?.map(
                              ({ _id, addedAt, comment, userName }, index) => {
                                return (
                                  <Box py={2.5} pl={6} key={index}>
                                    <Box
                                      py={2}
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <Typography
                                        variant="body1"
                                        color="primary.main"
                                        fontWeight="700"
                                      >
                                        {userName}
                                      </Typography>
                                      <Typography
                                        ml={2}
                                        variant="body1"
                                        color="primary.light"
                                        fontSize="13px"
                                      >
                                        {moment(addedAt).format("LL")}
                                      </Typography>
                                    </Box>

                                    <Box
                                      pr={4}
                                      fontSize="14px"
                                      color="text.paragraph"
                                    >
                                      {comment}
                                    </Box>

                                    {/* like unlike, reply here */}
                                    <Box
                                      mt={2}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="flex-end"
                                    >
                                      <AiFillLike size="22px" />
                                      <AiFillDislike
                                        size="22px"
                                        style={{
                                          marginLeft: "30px",
                                          cursor: "unavailable",
                                        }}
                                      />
                                      <BsFillHeartFill
                                        size="22px"
                                        style={{
                                          marginLeft: "30px",
                                          color: "#DD2E44",
                                        }}
                                      />

                                      <Typography
                                        onClick={() => {
                                          replyHandle(_id, comment);
                                        }}
                                        sx={{ cursor: "pointer" }}
                                        ml="30px"
                                        variant="body1"
                                        fontSize="14px"
                                        color="primary.light"
                                      >
                                        Reply
                                      </Typography>

                                      {commentData[index].like.includes(
                                        userId
                                      ) ? (
                                        <Typography
                                          onClick={() => {
                                            unLikeReply(commentId);
                                          }}
                                          ml="30px"
                                          variant="body1"
                                          fontSize="14px"
                                          color="primary.light"
                                          sx={{ cursor: "pointer" }}
                                        >
                                          Unlike
                                        </Typography>
                                      ) : (
                                        <Typography
                                          onClick={() => {
                                            likeReplyHandle(commentId);
                                          }}
                                          ml="30px"
                                          variant="body1"
                                          fontSize="14px"
                                          color="primary.light"
                                          sx={{ cursor: "pointer" }}
                                        >
                                          like
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                );
                              }
                            )
                          : null}
                      </div>}
                    </>
                  );
                })}
              </Box>
            </>
          );
        })}
      </Container>

      {openstate && <Login setOpenlogin={setOpenlogin} open={openstate} />}
    </>
  );
}
