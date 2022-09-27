import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  Slide,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../utils";

const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "#3f385b",
    backgroundColor: "#f5f5f5",
    padding: "5px",
    paddingLeft: "10px",
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Comment({ open, setOpen, postId, title, userid }) {
  console.log("userid comment",userid);
  const [commentstate, setCommentstate] = useState("");
  const handleClose = () => {
    setCommentstate("");
    setOpen(false);
  };
  const addComment = async () => {
    const commentValue = { comment:commentstate, postId,userid };
    try {
      const { data } = await axios.post(`${url}/comment`, commentValue);

      data.status == "ok" && handleClose();
    } catch (error) {
      console.log("Comment routes not work !",error);
    }
  };
  // const fetchcomment = async () => {
  //   try {
  //     const { data } = await axios.get(`${url}/fetchcomment/${postId}`);
  //     console.log("comment data", data);
  //   } catch (error) {
  //     console.log("comment page error", error);
  //   }
  // };

  // useEffect(() => {
  //   postId && fetchcomment();
  // }, [postId]);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          boxShadow: "none",
          background: "transparent",
          paddingY: "20px",
        }}
      >
        <Toolbar>
          <IconButton
            disableRipple={true}
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon
              fontSize="small"
              sx={{ color: "primary.light", marginTop: "-45px" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box mt={-3} mb={3} mx={4.5}>
        <Typography sx={{ m: 1 }}>{title}</Typography>
        <TextInput
          type="text"
          name="description"
          placeholder="Reply here !"
          fullWidth
          multiline
          rows={2}
          sx={{ fontSize: "15px" }}
          onChange={(e) => {
            setCommentstate(e.target.value);
          }}
        />
      </Box>
      <Divider />
      <Button
        type="submit"
        onClick={() => {
          addComment();
        }}
        disableRipple={true}
        sx={{
          cursor: "pointer",
          backgroundColor: "secondary.main",
          color: "text.main",
          textTransform: "capitalize",
          width: "150px",
          marginTop: "20px",
          marginLeft: "20px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        Comment
      </Button>
    </Dialog>
  );
}

export default Comment;
