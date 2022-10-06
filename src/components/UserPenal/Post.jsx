import React, { useEffect, useState } from "react";
import moment from "moment";
import Comment from "../Comment";
import {
  Box,
  Typography,
  Menu,
  styled,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import EditPopUp from "./EditPopUp";
import { url } from "../../utils";
import Login from "../Login";
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

function Post({ userid }) {
  const [editPopOpen, setEditPopOpen] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userposts, setPoststate] = useState([]);
  const [postIDstate, setPostIdstate] = useState();
  const [PostID, setPostID] = useState("");
  const [descriptionstate, setDescriptionstate] = useState("");
  const [updatepost, setUpdatestate] = useState(false);
  const [openstate, setOpenlogin] = useState(false);
  const [checklikeUnlike, setChecklikeUnlikestate] = useState(false);
  const userToken = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // fetch post details and display here
  useEffect(() => {
    if (user_id) {
      fetchPost();
    }
  }, [user_id, editPopOpen, updatepost]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchuserposts/${user_id}`);
      console.log("data descussion allpost", data);

      data && setPoststate(data?.data);
    } catch (error) {
      console.log("Discussions error:", error);
    }
  };

  // post remove from server
  const removeHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${url}/removePost/${id}`);
      console.log("remove post !", data);
      if (data.status == "ok") {
        toast.success(data.message);
        fetchPost();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const editeHandler = (id, descripton) => {
    setTimeout(() => {
      setUpdatestate(!updatepost);
    }, 0);
    setPostIdstate(id);
    setDescriptionstate(descripton);
    handleClose();
  };

  const CommentHandler = (id, descripton) => {
    setPostID(id);
    setDescriptionstate(descripton);
    setEditPopOpen(true);
  };

  // ...................like and unlike post code sections.........................

  // ..........like handler ..........
  const likeHandler = async (podtid) => {
    const likevalue = { post_id: podtid, user_id };
    console.log("likevalue:", likevalue);
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/like`, likevalue);
        console.log("like response:", data);
        if (data.message == "ok") {
          fetchPost();
        }
      } else {
        setOpenlogin(true);
      }
    } catch (error) {
      console.log("like error", error);
    }
  };
  // .........unliked handler section ..........
  const unLikedHandler = async (postid) => {
    const unliked = { post_id: postid, user_id };
    try {
      if (userToken) {
        const { data } = await axios.post(`${url}/unlike`, unliked);
        console.log("unliked response:", data);
        if (data.message == "ok") {
          fetchPost();
        }
      } else {
        setOpenlogin(true);
      }
    } catch (error) {
      console.log("unliked code error", error);
    }
  };

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(userposts?.length / postsPerPage);
  console.log("userposts:", userposts);
  return (
    <>
      <EditPopUp
        open={updatepost}
        setOpen={setUpdatestate}
        postId={postIDstate}
        title={descriptionstate}
      />

      <Comment
        open={editPopOpen}
        setOpen={setEditPopOpen}
        postId={PostID}
        title={descriptionstate}
        userid={userid}
      />
      <Box pb={10}>
        {userposts?.length > 0 ? (
          userposts
            ?.slice(
              currentPage * postsPerPage - postsPerPage,
              currentPage * postsPerPage
            )
            ?.map((item, i) => {
              return (
                <Box
                  mt={i === 0 ? 0 : 2}
                  key={i}
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "hover.primary",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight="700"
                  >
                    {/* {item} */}
                  </Typography>

                  <Box pl={8} pb={3} borderBottom="1px solid #fff">
                    <Box py={2} display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {userposts[i]?.ref_id?.user?.img ? (
                            <img
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                              src={`${url}/upload/${userposts[i]?.ref_id?.user?.img}`}
                              alt="Good"
                            />
                          ) : (
                            userposts[i]?.ref_id?.user?.name
                              ?.toUpperCase()
                              .slice(0, 1)
                          )}
                        </Avatar>
                      </Box>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        fontWeight="700"
                      >
                        {userposts[i]?.ref_id?.user?.name}
                      </Typography>

                      <Typography
                        ml={2}
                        variant="body1"
                        color="primary.light"
                        fontSize="13px"
                      >
                        {item?.addedAt
                          ? moment(item?.ref_id?.addedAt).format("LL")
                          : null}
                      </Typography>
                      <Typography
                        ml={2}
                        variant="body1"
                        color="primary.light"
                        fontSize="13px"
                      >
                        {item?.ref_id?.status}
                      </Typography>
                    </Box>

                    <Box fontSize="14px" color="text.paragraph">
                      {item?.ref_id?.title}
                      <br />
                      <br />
                      {item?.ref_id?.description}
                      <br />
                    </Box>

                    <Box
                      mt={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <AiFillLike size="22px" />
                      <AiFillDislike
                        size="22px"
                        style={{ marginLeft: "30px" }}
                      />
                      <Typography
                        onClick={() => {
                          CommentHandler(item?.ref_id?._id, item?.description);
                        }}
                        sx={{ cursor: "pointer" }}
                        ml="30px"
                        variant="body1"
                        fontSize="14px"
                        color="primary.light"
                      >
                        Reply
                      </Typography>
                      {userposts[i]?.ref_id?.like?.includes(user_id) ? (
                        <Typography
                          onClick={() => {
                            unLikedHandler(item?._id);
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
                            likeHandler(item?._id);
                          }}
                          ml="30px"
                          variant="body1"
                          fontSize="14px"
                          color="primary.light"
                          sx={{ cursor: "pointer" }}
                        >
                          Like
                        </Typography>
                      )}
                      {userposts[i]?.ref_id?.user?._id === user_id ? (
                        <Box>
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
                              onClick={() => {
                                editeHandler(
                                  item?.ref_id?._id,
                                  item?.description
                                );
                              }}
                              disableRipple
                              sx={{ fontSize: "16px" }}
                            >
                              <GrEdit style={{ marginRight: "15px" }} />
                              Edit
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              disableRipple
                              sx={{ fontSize: "16px" }}
                            >
                              <RiDeleteBin5Line
                                style={{ marginRight: "15px" }}
                              />
                              <Typography
                                onClick={() => {
                                  removeHandler(item?.ref_id?._id);
                                }}
                              >
                                Delete
                              </Typography>
                            </MenuItem>
                          </StyledMenu>
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                </Box>
              );
            })
        ) : (
          <Box py={5} color="primary.light" fontSize="18px" textAlign="center">
            It looks vote there are no posts here.
          </Box>
        )}
      </Box>
      {userposts?.length > 0 && (
        <Box my="15px" mx="10" px>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handleChangepage}
            />
          </Stack>
        </Box>
      )}

      {openstate && <Login setOpenlogin={setOpenlogin} open={openstate} />}
    </>
  );
}

export default React.memo(Post);
