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
import { url } from "../../utils";
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

export default function EditPopUp({ open, setOpen, postId,title }) {
  // const [editPoll, setEditPoll] = React.useState(false);
  const [editePoststate, setEditePostState] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handlerInput = (e) => {
    setEditePostState(e.target.value);
  };

  const handlerSubmit = async () => {
    try {
      const editepost={id:postId,description:editePoststate};
      const { data } = await axios.put(
        `${url}/editepost/`,
        editepost
      );
      console.log("data update", data);
      if (data.status == "ok") {
        toast.success(data.message);
        setEditePostState('');
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
            name="editePoststate"
            value={editePoststate}
            placeholder={title}
            fullWidth
            multiline
            rows={2}
            sx={{ fontSize: "15px" }}
            onChange={handlerInput}
          />
        </Box>
{/* 
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
        </Button> */}

       

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
