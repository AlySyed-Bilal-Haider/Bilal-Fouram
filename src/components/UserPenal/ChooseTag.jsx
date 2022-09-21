import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Dialog, DialogContent, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { BiMessageRounded } from "react-icons/bi";
import { FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { MdGroup, MdFeed } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";

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

function ChooseTag({ open, setOpen }) {
  const tagsData = [
    {
      Icon: BiMessageRounded,
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
      Icon: MdGroup,
      label: "Community Development",
      descrp:
        "All non-educational community proposals and community engagement ideas can be posted here",
    },
    {
      Icon: MdFeed,
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
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
              >
                General
              </Typography>

              <Typography
                mt={2}
                ml={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
              >
                Proposal
              </Typography>

              <Typography
                mt={2}
                ml={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
              >
                Knowledge Base
              </Typography>

              <Typography
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
              >
                Community Development
              </Typography>

              <Typography
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
              >
                Feedback
              </Typography>
              <Typography
                ml={2}
                mt={2}
                variant="subtitle2"
                color="primary.light"
                px={1.5}
                py={0.5}
                backgroundColor="text.light"
                borderRadius="50px"
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