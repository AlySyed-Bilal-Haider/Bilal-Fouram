import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Dialog, DialogContent, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FaRegComments, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { RiGroupFill, RiCheckboxBlankFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
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
      height: "65%",
      width: "90%",
      borderRadius: "5px",
    },
  },
}))(Dialog);
function ChooseTag({ open, setOpen, getTags }) {
  const [tagestate, settageState] = useState("");

  const tagsData = [
    {
      Icon: FaRegComments,
      label: "General",
      descrp:
        "For topics that do not belong to any other particular topics, please post them here.",
    },
    {
      Icon: FaChalkboardTeacher,
      label: "Proposal",
      descrp:
        "This section reserved for the final versions of Miner DAO Proposals. Use the template provided in the pinned post.",
    },
    {
      Icon: FaBook,
      label: "Knowledge Base",
      descrp: "Community initiatives driving education to help new ohmies.",
    },
    {
      Icon: RiGroupFill,
      label: "Community Development",
      descrp:
        "All non-educational community proposals and community engagement ideas can be posted here",
    },
    {
      Icon: CgNotes,
      label: "Feedback",
      descrp:
        "Provide feedback about the protocol, the community and the team here",
    },
    {
      Icon: RiCheckboxBlankFill,
      label: "Project Proposals",
      descrp: "Project Proposals within the DAO",
    },
  ];

  const getvalueHandler = (event, value) => {
    settageState(value.label);
  };

  const selectValueHandler = (e) => {
    settageState(e.target.value);
  };

  const addTagsHandler = (tagvalue) => {
    console.log("tagvalue:", tagvalue);
    if (tagestate || tagvalue) {
      getTags(tagestate || tagvalue);
      handleClose();
    }

    settageState("");
  };
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
          <Box
            mb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body1"
              component="div"
              fontSize="16px"
              color="text.main"
            >
              Choose Tags for Your Discussion
            </Typography>
            <IconButton
              disableRipple={true}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon fontSize="small" sx={{ color: "text.main" }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center">
            <Autocomplete
              fullWidth
              size="small"
              options={tagsData}
              onChange={getvalueHandler}
              autoHighlight
              //   getOptionLabel={(option) => option.label}
              renderOption={(props, { Icon, label, descrp }) => (
                <Box
                  {...props}
                  height="100%"
                  display="flex"
                  alignItems="flex-start !important"
                  flexDirection="column"
                >
                  <Box display="flex" alignItems="center">
                    <Icon size="18px" />
                    <Typography ml={1.5} fontSize="18px" color="primary.main">
                      {label}
                    </Typography>
                  </Box>
                  <Typography fontSize="14px" color="primary.light">
                    {descrp}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  value={tagestate || ""}
                  onChange={selectValueHandler}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  sx={{
                    borderRadius: "5px",
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#D9D9D9",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D9D9D9",
                        borderRadius: "5px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D9D9D9",
                        borderRadius: "5px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#D9D9D9",
                        borderRadius: "5px",
                      },
                    },

                    input: {
                      color: "#000",
                      fontSize: "16px",
                    },
                    background: "#fff",
                  }}
                  placeholder="Select Tag"
                />
              )}
            />

            <Button
              onClick={addTagsHandler}
              disableRipple={true}
              sx={{
                backgroundColor: "secondary.main",
                color: "text.main",
                width: "60px",
                marginLeft: "15px",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              OK
            </Button>
          </Box>

          <Box mt={4}>
            <Typography variant="body1" color="text.main">
              Popular Discussion Tags
            </Typography>

            <Box
              mt={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Typography
                sx={{ cursor: "pointer" }}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("General");
                }}
              >
                General
              </Typography>

              <Typography
                sx={{ cursor: "pointer" }}
                mt={2}
                ml={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("Proposal");
                }}
              >
                Proposal
              </Typography>

              <Typography
                sx={{ cursor: "pointer" }}
                mt={2}
                ml={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("Knowledge Base");
                }}
              >
                Knowledge Base
              </Typography>

              <Typography
                sx={{ cursor: "pointer" }}
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("Community Development");
                }}
              >
                Community Development
              </Typography>

              <Typography
                sx={{ cursor: "pointer" }}
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("Feedback");
                }}
              >
                Feedback
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
                onClick={() => {
                  addTagsHandler("Project Proposals");
                }}
              >
                Project Proposals
              </Typography>
            </Box>

            <Box mt={3} display="flex">
              <Typography variant="body1" color="text.main" fontWeight="600">
                Note:
              </Typography>
              <Typography
                ml={1}
                pt={0.2}
                variant="body1"
                fontSize="14px"
                color="text.light"
              >
                Select your discussion tag from above Dropdown.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </StyledModal>
    </>
  );
}

export default ChooseTag;
