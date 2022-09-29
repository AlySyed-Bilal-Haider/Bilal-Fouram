import React from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { Dialog, DialogContent, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles, styled } from "@mui/styles";
import { useState } from "react";
import axios from "axios";
import { url } from "../../utils";
import { ConstructionOutlined } from "@mui/icons-material";

const StyleTextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#D9D9D9",
    fontSize: "14px",
    padding: "8px",
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

const StyledModal = withStyles((theme) => ({
  root: {
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: `${theme.palette.primary.light} !important`,
      height: "auto",
      width: "350px",
      borderRadius: "5px",
    },
  },
}))(Dialog);

function PopUp({ open, setOpen }) {
  const [addpoll, setAddpollstate] = useState({
    question: "",
    ans1:'',
  ans2:'',
    enddate: "",
    status: true,
  });

  const pollHandler = (e) => {
    setAddpollstate({ ...addpoll, [e.target.name]: e.target.value });
  };


  const addPollHandler = () => {

    // try {
    //   axios.post(`${url}/`);
    // } catch (error) {
    //   console.log("poll error !", error);
    // }

    setAddpollstate({
      question: "",

      enddate: "",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("addpoll", addpoll);
  return (
    <>
      <StyledModal
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialoge__content__section">
          <Box mt={-2} textAlign="right">
            <IconButton
              disableRipple={true}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon fontSize="small" sx={{ color: "text.main" }} />
            </IconButton>
          </Box>
          <Typography
            mt={-2}
            pb={3}
            variant="body1"
            component="div"
            textAlign="center"
            fontSize="20px"
            color="text.main"
          >
            Add a Poll
          </Typography>

          <Typography
            variant="body1"
            component="div"
            color="text.main"
            fontWeight="700"
            mb={1}
          >
            Question
          </Typography>
          <StyleTextInput
            fullWidth
            type="text"
            name="question"
            value={addpoll.question || ""}
            onChange={pollHandler}
          />

          <Typography
            mt={3}
            mb={1}
            variant="body1"
            component="div"
            color="text.main"
            fontWeight="700"
          >
            Answers
          </Typography>
          <StyleTextInput
            fullWidth
            type="text"
            placeholder="Answer #1"
            value={addpoll.ans1|| ""}
            name="ans1"
            onChange={pollHandler}
          />
          <Box mt={2}>
            <StyleTextInput
              fullWidth
              type="text"
              placeholder="Answer #2"
              value={addpoll.ans2 || ""}
              name="ans2"
              onChange={pollHandler}
            />
          </Box>
          <Button
            sx={{
              color: "text.main",
              mt: 1,
              width: "120px",
              height: "40px",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Add ans
          </Button>
          <Typography
            mt={3}
            mb={1}
            variant="body1"
            component="div"
            color="text.main"
            fontWeight="700"
          >
            Poll end date (Optional)
          </Typography>
          <StyleTextInput
            fullWidth
            type="date"
            value={addpoll.enddate}
            name="enddate"
            onChange={pollHandler}
          />

          <Button
            onClick={addPollHandler}
            type="submit"
            disableRipple={true}
            sx={{
              backgroundColor: "secondary.main",
              color: "text.main",
              textTransform: "capitalize",
              width: "100px",
              marginTop: "25px",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Submit
          </Button>
        </DialogContent>
      </StyledModal>
    </>
  );
}

export default PopUp;
