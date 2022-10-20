import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopUp from "./UserPenal/AddPollPopup";
import ChooseTag from "./UserPenal/ChooseTag";
import { url } from "../utils";

const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "primary.main",
    backgroundColor: "transparent",
    fontSize: "16px",
    padding: "5px",
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

function StartDiscussionButton({ setOpenlogin }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pollstate, setPollstate] = useState("");
  const [tagsvalue, setTagsvalue] = useState("");
  const [addpoststate, setPoststate] = useState({
    tag: "",
    title: "",
    description:
      "Before you post this: 1. The forum is intended for in-depth discussion only. For support tickets or general queries, please head to our Discord channel: https://forum.olympusdao.finance/d/6-proposal-rules-and-guidelines 2. If this proposal is going to the Proposal section, make sure you have read the Proposal  guidelines:  https://discord.com/invite/olympusdao ",
  });
  const userid = localStorage.getItem("user_id");
  const discussionHandler = (e) => {
    setPoststate({ ...addpoststate, [e.target.name]: e.target.value });
  };
  // post discussion record here
  const handleClose = () => {
    setOpen(false);
  };
  const postSubmitHandler = async () => {
    let postdata;

    if (!!tagsvalue) {
      try {
        if (pollstate) {
          postdata = {
            ...addpoststate,
            user: userid,
            tag: tagsvalue,
            poll: pollstate,
          };
          console.log("postdata one", postdata);
          const { data } = await axios.post(`${url}/posts`, postdata);
          if (data.status === "ok") {
            toast.success(data.message);
            setPollstate("");
            handleClose();
          } else {
            toast.error(data.message);
          }
        } else {
          postdata = { ...addpoststate, user: userid, tag: tagsvalue };

          const { data } = await axios.post(`${url}/posts`, postdata);
          if (data.status === "ok") {
            toast.success(data.message);
            setPollstate("");
            handleClose();
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      setOpen2(true);
    }
  };
  // end post discussion here
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const CheckloginHandler = () => {
    const token = localStorage.getItem("token");

    if (token) {
      handleClickOpen();
    } else {
      setOpenlogin(true);
    }
  };

  const getTag = (value) => {
    setTagsvalue(value);
  };

  const pollHandle = (value) => {
    setPollstate(value);
  };

  return (
    <>
      <PopUp open={open1} setOpen={setOpen1} pollHandle={pollHandle} />
      <ChooseTag open={open2} setOpen={setOpen2} getTags={getTag} />

      <Button
        onClick={CheckloginHandler}
        sx={{
          height: "36px",
          fontSize: "10px",
          fontWeight: 700,
          width: { md: "170px", xs: "145px" },
          // padding: "8px 35px 8px 35px",
          backgroundColor: "secondary.main",
          color: "text.main",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        Start a Discussion
      </Button>
      {/* ------------Dialog box------------ */}
      <Dialog
        fullScreen
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
            paddingY: "20px",
          }}
        >
          <Toolbar>
            <Box sx={{ ml: 2, flex: 1 }}>
              <Typography
                onClick={handleClickOpen2}
                color="primary.main"
                variant="subtitle2"
                component="span"
                sx={{
                  border: `1px dotted ${theme.palette.primary.main}`,
                  borderRadius: "5px",
                  px: "6px",
                  py: "2px",
                  cursor: "pointer",
                }}
              >
                {tagsvalue ? tagsvalue : "choose tags"}
              </Typography>
              {pollstate ? (
                <Typography
                  onClick={() => {
                    toast.error("Poll already add,Please add post !");
                  }}
                  ml={2}
                  sx={{
                    border: `1px dotted ${theme.palette.primary.main}`,
                    borderRadius: "5px",
                    px: "6px",
                    py: "2px",
                    cursor: "pointer",
                  }}
                  color="primary.main"
                  variant="subtitle2"
                  component="span"
                >
                  Poll save
                </Typography>
              ) : (
                <Typography
                  onClick={handleClickOpen1}
                  ml={2}
                  sx={{
                    border: `1px dotted ${theme.palette.primary.main}`,
                    borderRadius: "5px",
                    px: "6px",
                    py: "2px",
                    cursor: "pointer",
                  }}
                  color="primary.main"
                  variant="subtitle2"
                  component="span"
                >
                  Add Poll
                </Typography>
              )}

              <Box>
                <InputBase
                  placeholder="Discussion Title"
                  type="text"
                  name="title"
                  value={addpoststate.title || ""}
                  sx={{
                    fontSize: "18px",
                    width: { xs: "100%", md: "40%" },
                  }}
                  onChange={discussionHandler}
                  required
                />
              </Box>
            </Box>

            {pollstate == "" ? (
              <IconButton
                disableRipple={true}
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "secondary.main", marginTop: "-45px" }}
                />
              </IconButton>
            ) : (
              <IconButton
                disableRipple={true}
                onClick={() => {
                  toast.error("poll already add, Please add post!");
                }}
                aria-label="close"
              >
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "secondary.main", marginTop: "-45px" }}
                />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        <Box mt={-2} mb={5} mx={4.5}>
          <TextInput
            type="text"
            name="description"
            value={addpoststate.description}
            onChange={discussionHandler}
            fullWidth
            multiline
            rows={5}
            required
          />
        </Box>
        <Divider />
        <Button
          type="submit"
          onClick={postSubmitHandler}
          disableRipple={true}
          sx={{
            backgroundColor: "secondary.main",
            color: "text.main",
            textTransform: "capitalize",
            width: "150px",
            marginTop: "20px",
            marginLeft: "20px",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Post Discussion
        </Button>
      </Dialog>
      {/* ------------------------------------- */}
    </>
  );
}

export default StartDiscussionButton;
