import React,{useEffect, useState} from "react";
import { Box, Typography, Menu, styled, MenuItem } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

import axios from "axios";
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

 function Post({email}) {
  //close menu tag on click
  const name = localStorage.getItem("name");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userposts,setPoststate]=useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////////////////
  // fetch post of specific users
  const url = "http://localhost:4000";
  console.log("email",email);
   useEffect(() => {
     if (email) {
       fetchPost();
     }
   }, [email]);
 
   const fetchPost = async () => {
     try {
       const { data } = await axios.get(`${url}/fetchspecificpost/${email}`);
      //  console.log("data descussion",);
       setPoststate(data);
     } catch (error) {
       console.log("Discussions error:", error);
     }
   };
  return (
    <>
      <Box pb={10}>
        {userposts?.map((item, i) => {
          return (
            <Box mt={i === 0 ? 0 : 2} key={i}>
              <Typography variant="body1" color="primary.main" fontWeight="700">
                {/* {item} */}
              </Typography>

              <Box pl={8} pb={3} borderBottom="1px solid #fff">
                <Box py={2} display="flex" alignItems="center">
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight="700"
                  >
                   {name}
                  </Typography>
                  <Typography
                    ml={2}
                    variant="body1"
                    color="primary.light"
                    fontSize="13px"
                  >
                    {item?.enddate}
                  </Typography>
                  <Typography
                    ml={2}
                    variant="body1"
                    color="primary.light"
                    fontSize="13px"
                  >
                    Awaiting approval
                  </Typography>
                </Box>

                <Box fontSize="14px" color="text.paragraph">
                {item?.title}
                  <br />
                  <br />
                 {item?.description}
                  <br />
                </Box>

                <Box
                  mt={2}
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
                  <Typography
                    ml="30px"
                    variant="body1"
                    fontSize="14px"
                    color="primary.light"
                  >
                    Like
                  </Typography>
                  <BsThreeDots
                    onClick={handleClick}
                    size="22px"
                    style={{ marginLeft: "30px", cursor: "pointer" }}
                  />

                  <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      disableRipple
                      sx={{ fontSize: "16px" }}
                    >
                      <GrEdit style={{ marginRight: "15px" }} />
                      Edit
                    </MenuItem>

                    <MenuItem
                      onClick={handleClose}
                      disableRipple
                      sx={{ fontSize: "16px" }}
                    >
                      <RiDeleteBin5Line style={{ marginRight: "15px" }} />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default React.memo(Post)