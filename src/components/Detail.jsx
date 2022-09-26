import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import {
  Box,
  Container,
  Typography,
  styled,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComments, FaLock } from "react-icons/fa";
import {
  BsFillPinFill,
  BsFlagFill,
  BsThreeDots,
  BsFillHeartFill,
} from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 150,
    borderRadius: "5px",
    border: "1px transparent",
    boxShadow: "none",

    "& .MuiMenu-list": {
      padding: "10px 6px",
      background: "#fff !important",
    },
  },
}));

const LinearProgressBox = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  width: 280,
  marginTop: 15,
  border: `2px solid ${theme.palette.secondary.light}`,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "transparent",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const BpIcon = styled("span")({
  borderRadius: 3,
  border: "1px solid #282439",
  width: 18,
  height: 18,
  backgroundColor: "transparent",
});

const BpCheckbox = (props) => {
  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={
        <>
          <Box
            width="18px"
            height="18px"
            border="1px solid #282439"
            color="#282439"
            borderRadius="3px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <GoCheck size="14px" />
          </Box>
        </>
      }
      icon={<BpIcon />}
      {...props}
    />
  );
};

export default function Detail() {
  const param = useParams();
  const url = "http://localhost:4000";
  //close menu tag on click
  const [userToken, setuserTokenstate] = useState(
    localStorage.getItem("token")
  );
  const userProfile = jsonwebtoken.decode(userToken);
  const [name, setNamestate] = useState(localStorage.getItem("name"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postdetails, setPostdetails] = useState();
  const [postidstate, setPostIdstate] = useState("");
  const [checkstate, setCheckstate] = useState(false);
  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // fetch post details from server
  useEffect(() => {
    if (param?.id) {
      fetchdetails();
    }
  }, [param?.id]);

  const fetchdetails = async () => {
    try {
      const { data } = await axios.get(`${url}/fetchPostDetails/${param.id}`);
      setPostdetails(data);
      setPostIdstate(data._id);
    } catch (error) {
      console.log("error details pages", error);
    }
  };

  // check this user is approveed or not

  useEffect(() => {
    if (postidstate && userProfile?.email) {
      console.log("post id", postidstate);
      approveORnotapproveCheck();
    }
  }, []);

  const approveORnotapproveCheck = async () => {
    const voteinfo = { id: postidstate, email: userProfile?.email };
    try {
      const { data } = await axios.post(`${url}/getvotesdetails`, voteinfo);
      if(data){
      setCheckstate(data?.votedetails?.checkstatus);
      }
    } catch (error) {
      console.log("check approve and unapprove", error);
    }
  };
  //Approve Handler
  const handleApprove = async (id) => {
    let approveinfo = { id, email: userProfile?.email };
    try {
      const { data } = await axios.post(`${url}/approve`, approveinfo);
      console.log("approve data", data);
      data.status == "ok" && approveORnotapproveCheck();
    } catch (error) {
      console.log("error", error);
    }
  };
  //unapprove handler
  const unapproveHandler = async (id) => {
    let unapprove = { id, email: userProfile?.email };
    console.log("approveinfo", unapprove);
    try {
      const { data } = await axios.post(`${url}/unapprove`, unapprove);
      data.status == "ok" && approveORnotapproveCheck();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Box bgcolor="primary.light">
        <Box py={5} textAlign="center" display="flex" flexDirection="column">
          <Box
            display="flex"
            color="text.main"
            alignItems="center"
            justifyContent="center"
          >
            <BsFillPinFill
              size="24px"
              style={{
                background: "#CD3D31",
                borderRadius: "50%",
                padding: "4px",
              }}
            />
            <FaLock
              size="26px"
              style={{
                marginRight: "7px",
                background: "#282439",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="primary.main"
              backgroundColor="text.main"
              borderRadius="5px"
              py="1px"
              width="90px"
            >
              <FaRegComments style={{ marginRight: "5px" }} />
              <Typography variant="body1" fontSize="14px" component="span">
                {postdetails?.tag}
              </Typography>
            </Box>
          </Box>

          <Typography mt={2} variant="body1" fontSize="20px" color="text.main">
            {postdetails?.title}
          </Typography>
        </Box>
      </Box>
      <Container>
        <Box pb={10}>
          <Box py={2.5} pl={6} borderBottom="1px solid #fff">
            <Box py={2} display="flex" alignItems="center">
              <Typography variant="body1" color="primary.main" fontWeight="700">
                {name ? name : null}
              </Typography>
              <Typography
                ml={2}
                variant="body1"
                color="primary.light"
                fontSize="13px"
              >
                {moment(postdetails?.enddate).format("LL")}
              </Typography>
            </Box>

            <Box pr={4} fontSize="14px" color="text.paragraph">
              {postdetails?.description}
            </Box>

            <Box
              mt={3}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <AiFillLike size="22px" />
              <AiFillDislike size="22px" style={{ marginLeft: "30px" }} />
              <Typography
                ml="30px"
                variant="body1"
                fontSize="14px"
                color="primary.light"
              >
                Reply
              </Typography>
            </Box>
          </Box>

          <Box
            py={2}
            pl={6}
            borderBottom="1px solid #fff"
            display="flex"
            alignItems="center"
            color="#D13E32"
          >
            <BsFillPinFill size="25px" style={{ marginRight: "20px" }} />
            <Typography variant="body1">
              <span style={{ fontWeight: "800" }}>{name ? name : null}</span>{" "}
              stickied the discussion.
            </Typography>
          </Box>

          <Box
            py={2}
            pl={6}
            borderBottom="1px solid #fff"
            display="flex"
            alignItems="center"
            color="primary.light"
          >
            <FaLock size="23px" style={{ marginRight: "20px" }} />
            <Typography variant="body1">
              <span style={{ fontWeight: "800" }}>{name ? name : null}</span>{" "}
              Locked the discussion.
            </Typography>
          </Box>

          {postdetails?.status == true ? (
            <Box mt={5} py={2} pl={6} borderBottom="1px solid #fff">
              <Typography
                variant="body1"
                fontSize="25px"
                fontWeight="700"
                color="primary.main"
              >
                Poll
              </Typography>

              <Typography
                mt={2}
                variant="body1"
                fontSize="14px"
                color="primary.light"
              >
                {postdetails?.question}
              </Typography>

              <Typography
                mt={3}
                variant="body1"
                fontSize="16px"
                fontWeight="700"
                color="primary.main"
              >
                Approve Launch Plan and Base Rate?
              </Typography>

              <Box
                mt={1}
                px={2}
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", md: "space-between" }}
                flexWrap="wrap"
              >
                <Box>
                  <LinearProgressBox variant="determinate" value={5} />
                  <Typography
                    mt={-4.6}
                    variant="subtitle1"
                    display="flex"
                    alignItems="center"
                  >
                    {checkstate == true ? null : (
                      <BpCheckbox
                        onClick={() => {
                          unapproveHandler(postdetails?._id);
                        }}
                      />
                    )}
                    Do not approve
                  </Typography>
                </Box>

                <Box>
                  <LinearProgressBox variant="determinate" value={70} />
                  <Typography
                    mt={-4.6}
                    variant="subtitle1"
                    display="flex"
                    alignItems="center"
                  >
                    {checkstate == true ? null : (
                      <BpCheckbox
                        onClick={() => {
                          handleApprove(postdetails?._id);
                        }}
                      />
                    )}
                    Approve
                  </Typography>
                </Box>
              </Box>

              <Typography
                px={2}
                mt={2}
                fontSize="12px"
                variant="subtitle1"
                color="primary.light"
              >
                Poll ends in 11 hours.
              </Typography>
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <AiFillLike size="22px" />
                <AiFillDislike size="22px" style={{ marginLeft: "30px" }} />
                <BsFillHeartFill
                  size="22px"
                  style={{ marginLeft: "30px", color: "#DD2E44" }}
                />

                <Typography
                  ml="30px"
                  variant="body1"
                  fontSize="14px"
                  color="primary.light"
                >
                  Reply
                </Typography>
                <Typography
                  ml="30px"
                  variant="body1"
                  fontSize="14px"
                  color="primary.light"
                >
                  Like
                </Typography>
                {/* <BsThreeDots
            onClick={handleClick}
            size="22px"
            style={{ marginLeft: "30px", cursor: "pointer" }}
          /> */}

                {/* <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={handleClose}
              disableRipple
              sx={{ fontSize: "16px" }}
            >
              <BsFlagFill style={{ marginRight: "15px" }} />
              Flag
            </MenuItem>
          </StyledMenu> */}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
