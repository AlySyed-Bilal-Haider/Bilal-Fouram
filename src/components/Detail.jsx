import React from "react";
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
                General
              </Typography>
            </Box>
          </Box>

          <Typography mt={2} variant="body1" fontSize="20px" color="text.main">
            Please Use Our Discord for General Enquiry
          </Typography>
        </Box>
      </Box>
      <Container>
        <Box pb={10}>
          <Box py={2.5} pl={6} borderBottom="1px solid #fff">
            <Box py={2} display="flex" alignItems="center">
              <Typography variant="body1" color="primary.main" fontWeight="700">
                Kschan
              </Typography>
              <Typography
                ml={2}
                variant="body1"
                color="primary.light"
                fontSize="13px"
              >
                Dec 26, 2021
              </Typography>
            </Box>

            <Box pr={4} fontSize="14px" color="text.paragraph">
              If you have any questions regarding how the protocol works and its
              various mechanisms, please head to the Olympus Discord, you are
              more likely to get immediate support there.
              <br />
              Remember, Olympus moderators or administrators will{" "}
              <span style={{ fontWeight: "800" }}>
                NEVER message you first
              </span>{" "}
              on Discord. So, please ask and get answers only from the public
              channel.
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
              <span style={{ fontWeight: "800" }}>kschan</span> stickied the
              discussion.
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
              <span style={{ fontWeight: "800" }}>kschan</span> Locked the
              discussion.
            </Typography>
          </Box>

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
              The poll below is to signal intention to move forward with a
              Snapshot vote. Changes cannot be made between OIP passing and
              Snapshot.
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
                  <BpCheckbox />
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
                  <BpCheckbox />
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
              <BsThreeDots
                onClick={handleClick}
                size="22px"
                style={{ marginLeft: "30px", cursor: "pointer" }}
              />

              <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={{ fontSize: "16px" }}
                >
                  <BsFlagFill style={{ marginRight: "15px" }} />
                  Flag
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
