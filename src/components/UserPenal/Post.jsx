import React from "react";
import { Box, Typography, Menu, styled, MenuItem } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

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

export default function Post() {
  //close menu tag on click
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////////////////

  return (
    <>
      <Box pb={10}>
        {["In TestPool", "In Testing"].map((item, i) => {
          return (
            <Box mt={i === 0 ? 0 : 2} key={i}>
              <Typography variant="body1" color="primary.main" fontWeight="700">
                {item}
              </Typography>

              <Box pl={8} pb={3} borderBottom="1px solid #fff">
                <Box py={2} display="flex" alignItems="center">
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight="700"
                  >
                    MajorSaab
                  </Typography>
                  <Typography
                    ml={2}
                    variant="body1"
                    color="primary.light"
                    fontSize="13px"
                  >
                    2 days ago
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
                  Before you post this:
                  <br />
                  <br />
                  i. The forum is intended for in-depth discussion only. For
                  support tickets or general queries, please head to our Discord
                  channel: https://discord.com/invite/olympusdao
                  <br />
                  <br />
                  ii. If this proposal is going to the Proposal section, make
                  sure you have read the Proposal guidelines:
                  https://forum.olympusdao.finance/d/6-proposal-rules-and-guidelines
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
