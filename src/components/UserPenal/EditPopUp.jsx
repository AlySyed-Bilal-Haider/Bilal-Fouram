import React from "react";
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

export default function EditPopUp({ open, setOpen }) {
  const [editPoll, setEditPoll] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
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
            name="despone"
            defaultValue="Before you post this:
            i. The forum is intended for in-depth discussion only. For support tickets or general queries, please head to our Discord channel: 
            https://discord.com/invite/olympus"
            // value={addpoststate.despone}
            // onChange={discussionHandler}
            fullWidth
            multiline
            // rows={5}
            sx={{ fontSize: "15px" }}
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
                // name="despone"
                defaultValue="Poll Question"
                // value={addpoststate.despone}
                // onChange={discussionHandler}
                fullWidth
                sx={{ fontWeight: "700" }}
              />
              <Box my={2} display="flex" justifyContent="space-around">
                <TextInput
                  type="text"
                  // name="despone"
                  defaultValue="Answer # 1"
                  // value={addpoststate.despone}
                  // onChange={discussionHandler}

                  sx={{ fontSize: "14px", width: "25%" }}
                />

                <TextInput
                  type="text"
                  // name="despone"
                  defaultValue="Answer # 2"
                  // value={addpoststate.despone}
                  // onChange={discussionHandler}
                  sx={{ fontSize: "14px", width: "25%" }}
                />
              </Box>
            </Box>
          </>
        ) : null}

        <Divider />
        <Button
          type="submit"
          //   onClick={postSubmitHandler}
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
          Save Changes
        </Button>
      </Dialog>
      {/* ------------------------------------- */}
    </>
  );
}
