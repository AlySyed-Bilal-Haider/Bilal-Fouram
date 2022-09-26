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

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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

export default function EditPopUp({ open, setOpen, postId }) {
  const url = process.env.URL || "http://localhost:4000";

  const [editPoll, setEditPoll] = React.useState(false);
  const [editePoststate, setEditePostState] = useState({
    description: "",
    Question: "",
    ans1: "",
    ans2: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    postId && fetchuser();
  }, [postId]);

  const fetchuser = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchPostDetails/${postId}`);
      console.log("fetch post details:", data);
      setEditePostState({
        description: data?.description,
        Question: data?.question,
        ans1: data?.ans1,
        ans2: data?.ans2,
      });
    } catch (error) {
      console.log("Edite post error", error);
    }
  };

  const handlerInput = (e) => {
    setEditePostState({ ...editePoststate, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${url}/editepost/${postId}`,
        editePoststate
      );
      // console.log("data upadte", data);
      if (data.status == "ok") {
        toast.success(data.message);
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Edite post server error:", error);
    }
  };

  return (
    <>
      {/* ------------Dialog box------------ */}
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
            <Box
              sx={{ ml: 2, flex: 1 }}
              color="primary.main"
              fontSize="14px"
              fontWeight="600"
            >
              Post # 1 in post new
            </Box>

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
          <TextInput
            type="text"
            name="description"
            value={editePoststate?.description}
            fullWidth
            multiline
            rows={2}
            sx={{ fontSize: "15px" }}
            onChange={handlerInput}
          />
        </Box>

        <Button
          onClick={() => setEditPoll(true)}
          disableRipple={true}
          sx={{
            backgroundColor: "body.main",
            color: "primary.light",
            textTransform: "capitalize",
            fontSize: "13px",
            width: "70px",
            height: "23px",
            marginLeft: 5.5,
            marginBottom: 2,
            "&:hover": {
              backgroundColor: "primary.light",
              color: "text.main",
            },
          }}
        >
          Edit Poll
        </Button>

        {editPoll === true ? (
          <>
            <Box mx={5}>
              <TextInput
                type="text"
                name="Question"
                value={editePoststate?.Question}
                fullWidth
                sx={{ fontWeight: "700" }}
                onChange={handlerInput}
              />
              <Box my={2} display="flex" justifyContent="space-around">
                <TextInput
                  type="text"
                  name="ans1"
                  value={editePoststate?.ans1}
                  sx={{ fontSize: "14px", width: "25%" }}
                  onChange={handlerInput}
                />

                <TextInput
                  type="text"
                  name=" ans2"
                  value={editePoststate?.ans2}
                  sx={{ fontSize: "14px", width: "25%" }}
                  onChange={handlerInput}
                />
              </Box>
            </Box>
          </>
        ) : null}

        <Divider />
        <Button
          type="submit"
          onClick={() => {
            handlerSubmit();
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
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Save Changes
        </Button>
      </Dialog>
      {/* ------------------------------------- */}
    </>
  );
}
