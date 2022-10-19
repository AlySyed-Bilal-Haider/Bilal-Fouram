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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { url } from "../utils";
import Loading from "../loading";

const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "#3f385b",
    backgroundColor: "#DFDEF6",
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
function CommentEdite({ openCommentEdite, commentValue, setOpen, open }) {
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [editecommentValue, setEditevalue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const commentEditeHandle = (e) => {
    setEditevalue(e.target.value);
  };
  const updateComment = async () => {
    try {
      const newComment = {
        comment_id: openCommentEdite,
        comment: editecommentValue,
      };
      setLoading(true);
      const { data } = await axios.put(`${url}/editcomment`, newComment);
      console.log("data:", data);
      data.status == "ok" && setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log("comment edite error !", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Loading loading={loading} />
      <Dialog
        // fullScreen
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: "#d7d6f7",
            boxShadow: "none",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            boxShadow: "none",
            background: "transparent",
            paddingY: "10px",
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
                sx={{ color: "secondary.main", marginTop: "-40px" }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box mt={-5} mb={3} mx={4}>
          <TextInput
            type="text"
            name="description"
            placeholder="Comment here!"
            fullWidth
            multiline
            rows={5}
            value={editecommentValue || commentValue}
            sx={{ fontSize: "15px" }}
            onChange={commentEditeHandle}
          />
        </Box>
        <Divider />
        <Button
          type="submit"
          onClick={() => {
            updateComment();
          }}
          disableRipple={true}
          sx={{
            cursor: "pointer",
            backgroundColor: "secondary.main",
            color: "text.main",
            textTransform: "capitalize",
            width: "150px",
            marginY: "20px",
            marginLeft: "20px",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Edite Comment
        </Button>
      </Dialog>
    </>
  );
}

export default CommentEdite;
