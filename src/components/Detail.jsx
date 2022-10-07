import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Reply from "./Reply";
import {
  Box,
  Container,
  Typography,
  styled,
  Menu,
  InputBase,
  MenuItem,
  Button,
} from "@mui/material";
import { FaRegComments, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsFillPinFill, BsFillHeartFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import moment from "moment";
import Login from "./Login";
import { url } from "../utils";
import Poll from "./Poll";

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
    border: "1px transparent",
    boxShadow: "none",

    "& .MuiMenu-list": {
      padding: "10px 6px",
      background: "#fff !important",
    },
  },
}));

export default function Detail({ userId, username }) {
  const param = useParams();
  //close menu tag on click
  const userToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const [openstate, setOpenlogin] = useState(false);
  const [descriptionstate, setPostDescription] = useState("");
  const [editPopOpen, setEditPopOpen] = useState(false);
  const [ReplyPopOpen, setReplyPopOpen] = useState(false);
  const [postdetails, setPostdetails] = useState();
  const [postidstate, setPostIdstate] = useState("");
  const [checklikeUnlike, setChecklikeUnlikestate] = useState("");
  const [renderPost, setRenderstate] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentID, setCommentIDstate] = useState();
  const [commentValue, setcommentValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCommentEdite, setCommentsection] = useState("");
  const [editecommentValue, setEditevalue] = useState("");
  const [checkedPoll, setCheckPollstate] = useState(false);
  const [postReplyId, setPostReplyID] = useState("");
  const open = Boolean(anchorEl);
  const HandleChecked = (value) => {
    setCheckPollstate(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // .........fetch post details and set states.........
  useEffect(() => {
    fetchdetails();
  }, [param?.id, renderPost, checkedPoll]);

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

  const CheckloginHandler = (title) => {
    setPostDescription(title);
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
    const likevalue = { post_id: param?.id, user_id: user_id };

    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/like`, likevalue);
        console.log("like response:", data);
        if (data.message === "ok") {
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
    const unliked = { post_id: param?.id, user_id: user_id };
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/unlike`, unliked);
        console.log("unliked response:", data);
        if (data.message === "ok") {
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
  const replyHandle = (commentID, commentvalue, post_id) => {
    setCommentIDstate(commentID);
    setcommentValue(commentvalue);
    setPostReplyID(post_id);
    if (userToken) {
      setReplyPopOpen(true);
    } else {
      setOpenlogin(true);
    }
  };

  //  ......... liked reply handle ...........
  const likeReplyHandle = async (comment_id) => {
    console.log("liked reply:", comment_id);
    const likeReply = { comment_id, user_id: userId };
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/likecomment`, likeReply);
        console.log("like replyed data", data);
        if (data.message === "ok") {
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
        if (data.message === "ok") {
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
    console.log("remove comment Id !", id);
    try {
      const { data } = await axios.delete(`${url}/removeComment/${id}`);
      console.log("comment remove", data);
      data.status === "ok" && setRenderstate(!renderPost);
    } catch (error) {
      console.log("remove comment error:", error);
    }
  };

  // Update comment
  const editecomment = (value, id) => {
    console.log("value", value, "id:Mubeen", id);
    setEditevalue(value);
    setCommentsection(id);
    setAnchorEl(null);
  };
  const updateComment = async (comment_id) => {
    try {
      const newComment = { comment_id, comment: editecommentValue };
      const { data } = await axios.put(`${url}/editcomment`, newComment);

      data.status === "ok" && setRenderstate(!renderPost);
    } catch (error) {
      console.log("comment edite error !", error);
    }
  };

  const commentEditeHandle = (e) => {
    setEditevalue(e.target.value);
  };
  return (
    <>
      <Comment
        open={editPopOpen}
        setOpen={setEditPopOpen}
        post_id={param?.id}
        title={descriptionstate}
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
        post_id={postReplyId}
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
                key={index + "det"}
              >
                <Box
                  display="flex"
                  color="text.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="primary.main"
                    backgroundColor="text.main"
                    borderRadius="4px"
                    py="1px"
                    px="5px"
                    width="fit-content"
                    textTransform="capitalize"
                  >
                    {items?.tag === "general" ? (
                      <FaRegComments
                        size="15px"
                        style={{ marginRight: "5px" }}
                      />
                    ) : items?.tag === "Proposal" ? (
                      <FaChalkboardTeacher
                        size="15px"
                        style={{ marginRight: "5px" }}
                      />
                    ) : items?.tag === "Knowledge Base" ? (
                      <FaBook size="13px" style={{ marginRight: "5px" }} />
                    ) : items?.tag === "Community Development" ? (
                      <RiGroupFill size="15px" style={{ marginRight: "5px" }} />
                    ) : items?.tag === "Feedback" ? (
                      <CgNotes size="15px" style={{ marginRight: "5px" }} />
                    ) : (
                      ""
                    )}
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
        {postdetails?.length > 0 ? (
          postdetails?.map((items, index) => {
            return (
              <Box
                mb={10}
                sx={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
                key={index + Math.random() * 10}
              >
                <Box pb={2}>
                  <Box py={2.5} pl={6} borderBottom="1px solid #fff">
                    <Box py={2} display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      >
                        {postdetails[index]?.user?.img ? (
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                            src={`${url}/upload/${postdetails[index]?.user?.img}`}
                            alt="Good"
                          />
                        ) : (
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {postdetails[0]?.user?.name
                              ?.toUpperCase()
                              .slice(0, 1)}
                          </Avatar>
                        )}
                      </Box>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        fontWeight="700"
                      >
                        {postdetails[0]?.user?.name}
                      </Typography>

                      <Typography
                        ml={2}
                        variant="body1"
                        color="primary.light"
                        fontSize="13px"
                      >
                        {moment(items?.enddate).format("LL")}
                      </Typography>
                    </Box>

                    <Box pr={4} fontSize="14px" color="text.paragraph">
                      {items?.description}
                    </Box>
                  </Box>
                </Box>
                {/* Poll start here, poll mean Questions and Ans */}
                <Box py={2} pl={6}>
                  <Poll
                    polldetails={postdetails[index]?.poll}
                    user_id={user_id}
                    checkedfunc={HandleChecked}
                  />

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
                        CheckloginHandler(items?.description);
                      }}
                      ml="30px"
                      variant="body1"
                      fontSize="14px"
                      color="primary.light"
                    >
                      Comment
                    </Typography>
                    {checklikeUnlike === true ? (
                      <Typography
                        onClick={unLikedHandler}
                        ml="30px"
                        mr="20px"
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
                        mr="20px"
                        variant="body1"
                        sx={{
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "primary.light",
                        }}
                      >
                        Like
                      </Typography>
                    )}
                  </Box>
                  {checklikeUnlike === true && (
                    <Typography>This is liked !</Typography>
                  )}
                </Box>
                {/* comment data and reply like */}

                {commentData?.map(
                  ({ _id, addedAt, comment, visibility }, index) => {
                    console.log("_id", _id);
                    return (
                      <>
                        {visibility === true && (
                          <div key={`index${_id}`}>
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
                              <Box
                                pr={4}
                                fontSize="14px"
                                color="text.paragraph"
                              >
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
                                  replyHandle(_id, comment, items?._id);
                                }}
                                sx={{ cursor: "pointer" }}
                                ml="30px"
                                variant="body1"
                                fontSize="14px"
                                color="primary.light"
                              >
                                Reply
                              </Typography>

                              {commentData[index]?.like?.includes(userId) ? (
                                <Typography
                                  onClick={() => {
                                    unLikeReply(_id);
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
                                    likeReplyHandle(_id);
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
                              <Box>
                                <BsThreeDots
                                  onClick={handleClick}
                                  size="22px"
                                  style={{
                                    position: "relative",
                                    marginLeft: "30px",
                                    cursor: "pointer",
                                  }}
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
                                      editecomment(comment, _id);
                                    }}
                                  >
                                    <GrEdit style={{ marginRight: "15px" }} />
                                    Edit
                                  </MenuItem>

                                  <MenuItem
                                    onClick={() => {
                                      removeComment(_id);
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
                            </Box>
                            {/* comment Edite sections here */}
                            {openCommentEdite == _id ? (
                              <Box m={1} p={1}>
                                <Typography>Edite comment ....</Typography>
                                <InputBase
                                  value={editecommentValue}
                                  name="commentvalue"
                                  onChange={() => {
                                    commentEditeHandle(_id);
                                  }}
                                  sx={{
                                    border: "none",
                                    borderBottom: "1px solid white",
                                    outline: "none",
                                    borderRadius: "5px",
                                    p: 1,
                                  }}
                                  fullWidth
                                />
                                <Button
                                  onClick={() => {
                                    updateComment(_id);
                                  }}
                                  sx={{
                                    mt: 0.5,
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
                            ) : null}
                            {/* Replay start here display */}
                            {commentData[index]?.reply
                              ? commentData[index]?.reply?.map(
                                  (
                                    { _id, addedAt, comment, userName },
                                    index
                                  ) => {
                                    return (
                                      <>
                                        <Box
                                          py={2.5}
                                          pl={6}
                                          key={`${_id}index`}
                                        >
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
                                          </Box>

                                          {commentData[index]?.like?.includes(
                                            userId
                                          ) ? (
                                            <Box>
                                              <Typography
                                                onClick={() => {
                                                  unLikeReply(_id);
                                                }}
                                                ml="30px"
                                                variant="body1"
                                                fontSize="14px"
                                                color="primary.light"
                                                sx={{ cursor: "pointer" }}
                                              >
                                                unlike
                                              </Typography>
                                            </Box>
                                          ) : null}
                                          <Typography
                                            variant="body1"
                                            color="primary.main"
                                            fontWeight="700"
                                          >
                                            {userName}
                                          </Typography>
                                          <Box
                                            pr={4}
                                            fontSize="14px"
                                            color="text.paragraph"
                                          >
                                            {comment}
                                          </Box>
                                          <Typography
                                            ml={2}
                                            variant="body1"
                                            color="primary.light"
                                            fontSize="13px"
                                          >
                                            {moment(addedAt).format("LL")}
                                          </Typography>
                                        </Box>
                                      </>
                                    );
                                  }
                                )
                              : null}
                          </div>
                        )}
                      </>
                    );
                  }
                )}
              </Box>
            );
          })
        ) : (
          <Typography
            align="center"
            sx={{ fontWeight: "bold", m: 6, fonSize: "22px" }}
          >
            This post is not Approved from Admin !
          </Typography>
        )}
      </Container>

      {openstate && <Login setOpenlogin={setOpenlogin} open={openstate} />}
    </>
  );
}
