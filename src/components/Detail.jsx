import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import swal from "sweetalert";
import Comment from "./Comment";
import Reply from "./Reply";
import {
  Box,
  Container,
  Typography,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import CommentEdite from "./CommentEdite";
import { FaRegComments, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { RiGroupFill } from "react-icons/ri";
import DeleteIcon from "@mui/icons-material/Delete";
import { CgNotes } from "react-icons/cg";
import EditIcon from "@mui/icons-material/Edit";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import moment from "moment";
import Login from "./Login";
import { url } from "../utils";
import Poll from "./Poll";
import Loading from "../loading";
import { toast } from "react-toastify";

const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
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
  const Mailverified = localStorage.getItem("verified");
  const [loading, setLoading] = useState(false);
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
  const [checkedPoll, setCheckPollstate] = useState(false);
  const [postReplyId, setPostReplyID] = useState("");
  const [editecommentValue, setEditevalue] = useState("");
  const [countLikestate, setLikestate] = useState("");
  const [editeCommentOpen, setOpenedite] = useState(false);
  const open = Boolean(anchorEl);
  const HandleChecked = (value) => {
    if (Mailverified) {
      setCheckPollstate(value);
    } else {
      toast.error("First email verify,please check your Mail!");
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // .........fetch post details and set states.........
  const fetchdetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/fetchPostDetails/${param?.id}`);
      console.log("Post details:", data);
      setPostdetails(data);
      setCommentData(data[0]?.comments);
      setPostDescription(data?.description);
      setPostIdstate(data._id);
      setLoading(false);
      setLikestate(data[0]?.like);
    } catch (error) {
      console.log("error details pages", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchdetails();
  }, [param?.id, renderPost, checkedPoll, editeCommentOpen]);

  const CheckloginHandler = (title) => {
    if (Mailverified) {
      setPostDescription(title);
      if (userToken) {
        setEditPopOpen(true);
      } else {
        setOpenlogin(true);
      }
    } else {
      toast.error("First email verify,please check your Mail!");
    }
  };

  // checkedlike and dislike  functionality here !
  const checkedLike = async () => {
    try {
      if (user_id) {
        setLoading(true);
        const { data } = await axios.get(
          `${url}/checklike/${param?.id}/${user_id}`
        );
        console.log("status:", data);
        if (data.status) {
          setChecklikeUnlikestate(true);
        } else {
          setChecklikeUnlikestate(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("checked like error !", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    user_id && checkedLike();
  }, [user_id]);

  // ..........like handler ..........
  const likeHandler = async () => {
    try {
      setLoading(true);
      const likevalue = { post_id: param?.id, user_id: user_id };
      if (userToken) {
        const { data } = await axios.post(`${url}/like`, likevalue);
        console.log("like response:", data);
        if (data.message === "ok") {
          checkedLike();
        }
      } else {
        setOpenlogin(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("like error", error);
      setLoading(false);
    }
  };
  // .........unliked handler section ..........
  const unLikedHandler = async () => {
    try {
      const unliked = { post_id: param?.id, user_id: user_id };

      setLoading(true);
      if (userToken) {
        const { data } = await axios.post(`${url}/unlike`, unliked);
        console.log("unliked response:", data);
        if (data.message === "ok") {
          checkedLike();
        }
      } else {
        setOpenlogin(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("unliked code error", error);
      setLoading(false);
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
    try {
      const likeReply = { comment_id, user_id: userId };
      setLoading(true);
      if (userToken) {
        const { data } = await axios.post(`${url}/likecomment`, likeReply);
        if (data.message === "ok") {
          fetchdetails();
        }
      } else {
        setOpenlogin(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("reply like error !", error);
      setLoading(false);
    }
  };
  // unlike reply handler
  const unLikeReply = async (comment_id) => {
    const unlikeReply = { comment_id, user_id: userId };
    try {
      setLoading(true);
      if (userToken) {
        const { data } = await axios.post(`${url}/unlikecomment`, unlikeReply);
        console.log("unlike replyed data", data);
        if (data.message === "ok") {
          fetchdetails();
        }
      } else {
      }
      setLoading(false);
    } catch (error) {
      console.log("reple unlike error !", error);
      setLoading(false);
    }
  };

  const renderDetails = () => {
    setRenderstate(!renderPost);
  };

  // ........remove comment here..........

  const removeComment = (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          setLoading(true);
          const { data } = await axios.delete(`${url}/removeComment/${id}`);
          data.status === "ok" && setRenderstate(!renderPost);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("remove comment error:", error);
      setLoading(false);
    }
  };

  // Update comment
  const editecomment = (value, id) => {
    console.log("value", value, "id:Mubeen", id);
    setEditevalue(value);
    setCommentsection(id);
    setAnchorEl(null);
    setOpenedite(true);
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
      <CommentEdite
        openCommentEdite={openCommentEdite}
        commentValue={editecommentValue}
        setOpen={setOpenedite}
        open={editeCommentOpen}
      />
      <Box bgcolor="primary.light">
        <Loading loading={loading} />
        {postdetails?.map((items, index) => {
          return (
            <>
              <Box
                py={5}
                textAlign="center"
                display="flex"
                flexDirection="column"
                key={index + Math.random() * 15}
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
                    {items?.tag === "General" ? (
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
        {postdetails?.length > 0 &&
          postdetails?.map((items, index) => {
            return (
              <Box
                mb={10}
                sx={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
                key={index + Math.random() * 10}
              >
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
                      {items?.user?.img ? (
                        <NavLink
                          to={`/profile/${items?.user?._id}`}
                          style={{ textDecoration: "none", cursor: "pointer" }}
                        >
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                            src={`${url}/upload/${items?.user?.img}`}
                            alt="Good"
                          />
                        </NavLink>
                      ) : (
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {items?.user?.name?.toUpperCase().slice(0, 1)}
                        </Avatar>
                      )}
                    </Box>
                    <NavLink
                      to={`/profile/${items?.user?._id}`}
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <Typography
                        variant="body1"
                        color="primary.main"
                        fontSize="18px"
                        fontWeight="800"
                      >
                        {items?.user?.name}
                      </Typography>
                    </NavLink>
                    <Typography
                      ml={1}
                      pt={0.5}
                      variant="body1"
                      color="primary.light"
                      fontSize="11px"
                    >
                      {moment(items?.enddate).format("LL")}
                    </Typography>
                  </Box>

                  <Box pr={4} fontSize="14px" color="text.paragraph">
                    {items?.description}
                  </Box>

                  {/* Poll start here, poll mean Questions and Ans */}
                  <Box pt={2} sx={{ md: 6, xs: 4 }}>
                    <Poll
                      polldetails={postdetails[index]?.poll}
                      user_id={user_id}
                      checkedfunc={HandleChecked}
                      Mailverified={Mailverified}
                    />

                    {/* start comment sections start here */}
                    <Box
                      width="100%"
                      mt={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {checklikeUnlike === true ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ThumbDownAltIcon sx={{ mr: 1, color: "#3F385B" }} />
                          <Typography>{countLikestate?.length} </Typography>
                        </Box>
                      ) : (
                        <Box />
                      )}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            CheckloginHandler(items?.description);
                          }}
                          ml="30px"
                          mt="-2px"
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
                            mt="-2px"
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
                            mt="-2px"
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
                    </Box>
                  </Box>
                </Box>

                {/* comment data and reply like */}
                {commentData?.map(
                  ({ _id, addedAt, comment, visibility, user }, index) => {
                    return (
                      <>
                        {visibility === true && (
                          <div key={`index${_id}`}>
                            <Box
                              pl={7}
                              pt={3}
                              pb={2}
                              borderBottom="1px solid #fff"
                            >
                              <Stack direction="row" alignItems="center">
                                <Box style={{ marginTop: "3px" }}>
                                  {user?.img ? (
                                    <NavLink
                                      to={`/profile/${user?._id}`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                        }}
                                        src={`${url}/upload/${user?.img}`}
                                        alt=""
                                      />
                                    </NavLink>
                                  ) : (
                                    <Avatar
                                      sx={{
                                        bgcolor: "secondary.light",
                                      }}
                                    >
                                      {user?.name?.slice(0, 1)?.toUpperCase()}
                                    </Avatar>
                                  )}
                                </Box>
                                <NavLink
                                  to={`/profile/${user?._id}`}
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    color="primary.main"
                                    fontWeight="700"
                                    ml={1}
                                  >
                                    {user?.name}
                                  </Typography>
                                </NavLink>
                                <Typography
                                  variant="body1"
                                  color="primary.light"
                                  fontSize="11px"
                                  ml={1}
                                >
                                  {moment(addedAt).format("LL")}
                                </Typography>
                              </Stack>
                              <Box
                                mt={1}
                                ml={4}
                                fontSize="14px"
                                color="text.paragraph"
                              >
                                {comment}
                              </Box>

                              <Box
                                mt={2}
                                pr={5}
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                              >
                                <Typography
                                  onClick={() => {
                                    replyHandle(_id, comment, items?._id);
                                  }}
                                  sx={{ cursor: "pointer" }}
                                  ml="30px"
                                  mt="-2px"
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
                                    mt="-2px"
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
                                    mt="-2px"
                                    color="primary.light"
                                    sx={{ cursor: "pointer" }}
                                  >
                                    like
                                  </Typography>
                                )}
                                {user_id == user?._id ? (
                                  <>
                                    <Box>
                                      <Typography
                                        ml="30px"
                                        variant="body1"
                                        fontSize="14px"
                                        mt="-2px"
                                        color="primary.light"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => {
                                          editecomment(comment, _id);
                                        }}
                                      >
                                        <EditIcon />
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        ml="30px"
                                        variant="body1"
                                        fontSize="14px"
                                        mt="-2px"
                                        color="primary.light"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => {
                                          removeComment(_id);
                                        }}
                                      >
                                        <DeleteIcon />
                                      </Typography>
                                    </Box>
                                  </>
                                ) : (
                                  ""
                                )}

                                {/* start remove and update comment */}
                                <Box
                                  sx={{ position: "relative", display: "none" }}
                                >
                                  <BsThreeDots
                                    onClick={handleClick}
                                    size="16px"
                                    style={{
                                      marginLeft: "20px",
                                      marginTop: "7px",
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
                              {/* Replay start here display */}

                              {commentData[index]?.reply.length > 0 &&
                                commentData[index]?.reply?.map(
                                  (replyitems, index) => {
                                    return (
                                      <>
                                        <Box key={index}>
                                          <Typography
                                            variant="subtitle2"
                                            display={
                                              index === 0 ? "block" : "none"
                                            }
                                            ml={8}
                                            mb={-1}
                                            color="#8055CD"
                                          >
                                            Replies
                                          </Typography>
                                          <Box
                                            pt={1.5}
                                            pl={3}
                                            my={1}
                                            ml={5}
                                            key={`${replyitems?._id}index`}
                                            sx={{
                                              background: "#DFDEF6",
                                              borderRadius: "50px",
                                              width: "80%",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  width: "40px",
                                                  height: "40px",
                                                  borderRadius: "50%",
                                                  ml: 1,
                                                }}
                                              >
                                                {replyitems?.user?.img ? (
                                                  <NavLink
                                                    to={`/profile/${replyitems?.user?._id}`}
                                                    style={{
                                                      textDecoration: "none",
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <img
                                                      style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                      }}
                                                      src={`${url}/upload/${replyitems?.user?.img}`}
                                                      alt="Good"
                                                    />
                                                  </NavLink>
                                                ) : (
                                                  <Avatar
                                                    sx={{
                                                      width: 32,
                                                      height: 32,
                                                      mt: 0.5,
                                                    }}
                                                  >
                                                    {replyitems?.user?.name
                                                      ?.toUpperCase()
                                                      .slice(0, 1)}
                                                  </Avatar>
                                                )}
                                              </Box>
                                              {replyitems?.user?.name && (
                                                <NavLink
                                                  to={`/profile/${replyitems?.user?._id}`}
                                                  style={{
                                                    textDecoration: "none",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <Typography
                                                    variant="body1"
                                                    color="primary.main"
                                                    fontSize="15px"
                                                    fontWeight="600"
                                                    ml={1}
                                                  >
                                                    {replyitems?.user?.name}
                                                  </Typography>
                                                </NavLink>
                                              )}

                                              <Typography
                                                ml={1}
                                                variant="body1"
                                                color="primary.light"
                                                fontSize="11px"
                                              >
                                                {moment(addedAt).format("LL")}
                                              </Typography>
                                            </Box>
                                            <Box
                                              py={1}
                                              pl={7}
                                              key={`${replyitems?._id}index`}
                                              sx={{
                                                background: "#DFDEF6",
                                                borderRadius: "50px",
                                                width: "80%",
                                              }}
                                            >
                                              <Box
                                                pr={4}
                                                fontSize="14px"
                                                color="text.paragraph"
                                              >
                                                {replyitems?.comment}
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </>
                                    );
                                  }
                                )}
                            </Box>
                          </div>
                        )}
                      </>
                    );
                  }
                )}
              </Box>
            );
          })}
      </Container>

      {openstate && <Login setOpenlogin={setOpenlogin} open={openstate} />}
    </>
  );
}
