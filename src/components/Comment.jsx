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
function Comment({ open, setOpen, post_id, title, username, renderFetchpost }) {
  console.log("username:", username, post_id);
  const [commentstate, setCommentstate] = useState("");
  const [mentionState, setMentionstate] = useState();
  const [userState, setUsername] = useState("");
  const [_usernamedropDown, setUsernameDropdown] = useState([]);
  const [filterNameIDstate, setFilterNamestate] = useState([]);
  const handleClose = () => {
    setCommentstate("");
    renderFetchpost && renderFetchpost(true);
    setOpen(false);
  };
  const addComment = async () => {
    try {
      let comment = commentstate.replace("", "@");
      const commentValue = {
        comment,
        userName: username,
        post_id,
        mention: filterNameIDstate,
      };
      const { data } = await axios.post(`${url}/comment`, commentValue);
      console.log("comment data", data);
      setUsername(data);
      data.status == "ok" && handleClose();
    } catch (error) {
      console.log("Comment routes not work !", error);
    }
  };

  // fetch user name and show in drop down from API server side
  const fetchusername = async (e) => {
    try {
      const { data } = await axios.post(`${url}/fetchusername`, mentionState);
      console.log("user name data", data);
      setUsernameDropdown(data);
      setMentionstate("");
    } catch (error) {
      console.log("error here !", error);
    }
  };

  useEffect(() => {
    mentionState === "@" && fetchusername();
  }, [mentionState]);

  // onChange handler get user values;
  const Inputvalue = (e) => {
    let value = e.target.value;
    const atTherate = value.substring(value.length - 1);
    let mention = atTherate.match(/@/gi);
    if (mention) {
      setMentionstate(mention[0]);
      mention = "";
    }
    setCommentstate(value);
  };

  // select name in drop down
  const handleChange = (event, value) => {
    if (value.name) {
      console.log("value.id:", value._id);
      return setFilterNamestate([...filterNameIDstate, value._id]);
    }
  };
  console.log(filterNameIDstate, "mention");
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
      <Box mt={-5} mb={3} mx={4.5}>
        <Typography sx={{ m: 1 }}>{title}</Typography>
        {_usernamedropDown?.length > 0 && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={_usernamedropDown}
            sx={{ width: 300 }}
            onChange={handleChange}
            getOptionLabel={(option) => {
              return option && option?.name;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleChange}
                label="Mentions user"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
          />
        )}

        <TextInput
          type="text"
          name="description"
          placeholder="Reply here !"
          fullWidth
          multiline
          rows={2}
          sx={{ fontSize: "15px" }}
          onChange={Inputvalue}
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
