import React, { useEffect, useState } from "react";
import moment from "moment";
import Comment from "../Comment";
import { Box, Typography, Menu, styled, MenuItem } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import EditPopUp from "./EditPopUp";
import { url } from "../../utils";

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
  const name = localStorage.getItem("name");
  const user_id = localStorage.getItem("user_id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userposts, setPoststate] = useState([]);
  const [postIDstate, setPostIdstate] = useState();
  const [PostID, setPostID] = useState("");
  const [descriptionstate, setDescriptionstate] = useState("");
  const [updatepost, setUpdatestate] = useState(false);
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
  }, [user_id, editPopOpen,updatepost]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchuserpost/${user_id}`);
      console.log("data descussion allpost", data);

      data && setPoststate(data.data);
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

  console.log("userposts", userposts);
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
        {userposts ? (
          userposts?.map((item, i) => {
            return (
              <Box mt={i === 0 ? 0 : 2} key={i}>
                <Typography
                  variant="body1"
                  color="primary.main"
                  fontWeight="700"
                >
                  {/* {item} */}
                </Typography>

                <Box pl={8} pb={3} borderBottom="1px solid #fff">
                  <Box py={2} display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      color="primary.main"
                      fontWeight="700"
                    >
                      {name}
                    </Typography>
                    <Typography
                      ml={2}
                      variant="body1"
                      color="primary.light"
                      fontSize="13px"
                    >
                      {item?.addedAt
                        ? moment(item?.addedAt).format("LL")
                        : null}
                    </Typography>
                    <Typography
                      ml={2}
                      variant="body1"
                      color="primary.light"
                      fontSize="13px"
                    >
                      Awaiting approval
                    </Typography>
                  </Box>

                  <Box fontSize="14px" color="text.paragraph">
                    {item?.title}
                    <br />
                    <br />
                    {item?.description}
                    <br />
                  </Box>

                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <AiFillLike size="22px" />
                    <AiFillDislike size="22px" style={{ marginLeft: "30px" }} />
                    <Typography
                      onClick={() => {
                        CommentHandler(item?._id, item?.description);
                      }}
                      sx={{ cursor: "pointer" }}
                      ml="30px"
                      variant="body1"
                      fontSize="14px"
                      color="primary.light"
                    >
                      Reply
                    </Typography>
                    <Typography
                      ml="30px"
                      variant="body1"
                      fontSize="14px"
                      color="primary.light"
                    >
                      Like
                    </Typography>
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
                          editeHandler(item?._id, item?.description);
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
                        <RiDeleteBin5Line style={{ marginRight: "15px" }} />
                        <Typography
                          onClick={() => {
                            removeHandler(item?._id);
                          }}
                        >
                          Delete
                        </Typography>
                      </MenuItem>
                    </StyledMenu>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="h3" textAlign="center" fontWeight={700}>
            Post Coming Soon
          </Typography>
        )}
      </Box>
    </>
  );
}

export default React.memo(Post);
