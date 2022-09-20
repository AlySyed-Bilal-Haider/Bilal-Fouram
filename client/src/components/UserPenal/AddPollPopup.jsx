import React from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { Dialog, DialogContent, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles, styled } from "@mui/styles";

const StyleTextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#fff",
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

const StyledModal = withStyles(() => ({
  root: {
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "#F4EFE6 !important",
      height: "auto",
      width: "350px",
      borderRadius: "5px",
    },
  },
}))(Dialog);

function PopUp({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

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
              <CloseIcon fontSize="small" sx={{ color: "primary.main" }} />
            </IconButton>
          </Box>
          <Typography
            mt={-2}
            pb={3}
            variant="body1"
            component="div"
            textAlign="center"
            fontSize="20px"
            color="#000"
          >
            Add a Poll
          </Typography>

          <Typography
            variant="body1"
            component="div"
            color="#000"
            fontWeight="700"
            mb={1}
          >
            Question
          </Typography>
          <StyleTextInput fullWidth type="text" />

          <Typography
            mt={3}
            mb={1}
            variant="body1"
            component="div"
            color="#000"
            fontWeight="700"
          >
            Answers
          </Typography>
          <StyleTextInput fullWidth type="text" placeholder="Answer #1" />
          <Box mt={2}>
            <StyleTextInput fullWidth type="text" placeholder="Answer #2" />
          </Box>

          <Typography
            mt={3}
            mb={1}
            variant="body1"
            component="div"
            color="#000"
            fontWeight="700"
          >
            Poll end date (Optional)
          </Typography>
          <StyleTextInput fullWidth type="text" />

          <Button
            disableRipple={true}
            sx={{
              backgroundColor: "primary.main",
              color: "text.main",
              textTransform: "capitalize",
              width: "100px",
              marginTop: "25px",
              "&:hover": {
                backgroundColor: "primary.main",
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
