import React,{useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  AppBar,
  Dialog,
  Divider,
  Toolbar,
  InputBase,
  useTheme,
  Slide,
} from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { styled } from "@mui/styles";

import PopUp from "./UserPenal/AddPollPopup";

const TextInput = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    color: "primary.main",
    backgroundColor: "transparent",
    fontSize: "18px",
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
}));

const discussion = [
  {
    icons: <CloudOffIcon />,
    maintext: "General",
    subtext:
      " For topics that do not belong to any other particular topics,please post them here",
  },
  {
    icons: <ContactEmergencyIcon />,
    maintext: "Proposal",
    subtext: "OIP-94B Inverse Bond Framework Approval",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Support",
    subtext: "How do I get any help on here?",
    color: "white",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Knowledge Base",
    subtext:
      "https://www.facebook.com/Juan-Rivera-Keto-Gummies-106696188817590",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Community Development",
    subtext:
      "All non-educational community proposals and community engagement ideas can be posted here",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Feedback",
    subtext:
      "Provide feedback about the protocol, the community and the team here",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Project Proposal",
    subtext: "Project Proposals within the DAO",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
  const navigate=useNavigate();
  const matches = useMediaQuery("(max-width:750px)");
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const url = "http://localhost:4000";
  // ..........Token verfications ...........
  const tokenVerfiy = async () => {
    try {
      const req = await fetch(`${url}/verifytoken`, {
        method: "post",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = req.json(req);
      console.log("data check token verify:", data);
      if (data.status == "error") {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jsonwebtoken.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        tokenVerfiy();
      }
    }
  
  }, []);
  // ..........end token verfication........
  return (
    <Box sx={{ width: "100%" }}>
      <PopUp open={open1} setOpen={setOpen1} />

      <Container maxWidth="lg" sx={{ mt: { md: 4, xs: 0 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            display: { md: "block", xs: "none" },
          }}
        >
          <Button
            onClick={handleClickOpen}
            sx={{
              height: "36px",
              fontSize: "10px",
              fontWeight: 700,
              padding: "8px 35px 8px 35px",
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
                    color="primary.main"
                    variant="subtitle2"
                    component="span"
                    sx={{
                      border: `1px dotted ${theme.palette.primary.main}`,
                      borderRadius: "5px",
                      px: "6px",
                      py: "2px",
                    }}
                  >
                    Choose Tags
                  </Typography>
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

                  <Box>
                    <TextInput placeholder="Discussion Title" type="text" />
                  </Box>
                </Box>

                <IconButton
                  disableRipple={true}
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: "primary.light", marginTop: "-15px" }}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Box mb={5} mx={5}>
              <Typography
                contentEditable={true}
                suppressContentEditableWarning={true}
                mb={2}
                variant="body1"
                component="div"
                color="text.paragraph"
              >
                Before you post this:
              </Typography>
              <Typography
                contentEditable={true}
                suppressContentEditableWarning={true}
                variant="body1"
                component="div"
                color="text.paragraph"
              >
                i. The forum is intended for in-depth discussion only. For
                support tickets or general queries, please head to our Discord
                channel: https://discord.com/invite/olympusdao
              </Typography>
              <Typography
                contentEditable={true}
                suppressContentEditableWarning={true}
                mt={2}
                variant="body1"
                component="div"
                color="text.paragraph"
              >
                ii. If this proposal is going to the Proposal section, make sure
                you have read the Proposal guidelines:
                https://forum.olympusdao.finance/d/6-proposal-rules-and-guidelines
              </Typography>
            </Box>
            <Divider />
            <Button
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
          <Link to="/AllDiscussions" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<CloudOffIcon />}
              sx={{
                ml: 2,
                color: "text.paragraph",
                "&:hover": {
                  backgroundColor: "secondary.light",
                  color: "text.main",
                },
              }}
            >
              All Discussions
            </Button>
          </Link>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt: { md: 4, xs: 0.1 } }}>
        <Grid container>
          {discussion?.map((items, index) => {
            return (
              <Grid
                key={index}
                item
                md={4}
                xs={12}
                sx={{
                  mt: { md: 0, xs: 1 },
                  height: "200px",
                  backgroundColor:
                    index == 0 ? "primary.main" : "primary.light",
                }}
              >
                <Box
                  sx={{
                    height: "158px",
                    padding: "15px",
                    borderTopLeftRadius: "4px",
                    "&:hover": {
                      backgroundColor: "hover.main",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "text.main",
                        mt: 0.5,
                      }}
                    >
                      {items.icons}
                    </Box>
                    <Typography
                      sx={{
                        ml: 1,
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "text.main",
                      }}
                    >
                      {items.maintext}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.light",
                    }}
                  >
                    {items.subtext}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
