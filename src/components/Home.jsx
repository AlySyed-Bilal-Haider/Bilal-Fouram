import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { styled } from "@mui/styles";

import PopUp from "./UserPenal/AddPollPopup";
import ChooseTag from "./UserPenal/ChooseTag";

import Login from "./Login";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  // const matches = useMediaQuery("(max-width:750px)");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [loginstate, setloginstate] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [username,setusernameState]=React.useState('');
  const [emailState,setEmailstate]=React.useState('');
  const [tagsvalue,setTagsvalue]=useState('');
  const [addpoststate, setPoststate] = React.useState({
    tags: "wow",
    title: "",
    despone:
      "Before you post this: 1. The forum is intended for in-depth discussion only. For support tickets or general queries, please head to our Discord channel: https://forum.olympusdao.finance/d/6-proposal-rules-and-guidelines 2. If this proposal is going to the Proposal section, make sure you have read the Proposal  guidelines:  https://discord.com/invite/olympusdao ",
  });

  const discussionHandler = (e) => {
    setPoststate({ ...addpoststate, [e.target.name]: e.target.value });
  };

  // post discussion record here
  const postSubmitHandler = async () => {
    const polldata = localStorage.getItem("poll");
    let checkstatus = false;
    let updatedata;
    const addnameAndemail={...addpoststate,username:username,email:emailState};
    if(!!tagsvalue){
    if (polldata) {
      const pollrecord = JSON.parse(polldata);
      updatedata = { ...addnameAndemail, ...pollrecord,tag:tagsvalue,};
      checkstatus = true;
    }
    try {
      if (checkstatus) {
        const { data } = await axios.post(`${url}/posts`, updatedata);
        if (data.status == "ok") {
          toast.success(data.message);
          setTagsvalue('');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${url}/posts`, addnameAndemail);
        if (data.status == "ok") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }}else{
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

  const handleClose = () => {
    setOpen(false);
  };
  const CheckloginHandler=()=>{
    const token = localStorage.getItem("token");
    if(token){
      handleClickOpen();
    }else{
      setloginstate(true);
    }
    
  }
  // ..........Token verfications ...........
  const tokenVerfiy = async () => {
    try {
      await fetch(`${url}/verifytoken`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then(response => response.json())
      .then(data => {
        console.log("all data",data);
        localStorage.setItem('name',data.name);
      })
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jsonwebtoken.decode(token);
      setusernameState(user?.name);
      setEmailstate(user?.email);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        tokenVerfiy();
      }
    }
  }, []);


  // ..........end token verfication........
  return (
    <Box sx={{ width: "100%" }}>
      <PopUp open={open1} setOpen={setOpen1} />
      <ChooseTag open={open2} setOpen={setOpen2}  setTagsvalue={setTagsvalue}/>

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
            onClick={CheckloginHandler}
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
                    />
                  </Box>
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

            <Box mt={-2} mb={5} mx={4.5}>
              <TextInput
                type="text"
                name="despone"
                value={addpoststate.despone}
                onChange={discussionHandler}
                fullWidth
                multiline
                rows={5}
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
      {loginstate && <Login setloginstate={setloginstate} open={loginstate} />}
    </Box>
  );
}
