import React from "react";
import { Box, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { sidebardata } from "../Common/Links";
import { FaReply } from "react-icons/fa";

function MainHeader({ title, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "133px",
        backgroundColor: "primary.light",
        color: "text.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1,
        }}
      >
        {icon}
        {/* <FaReply sx={{ color: "text.paragraph", fontSize: "22px", mr: 1 }} /> */}
        <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
          {title}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "15.5px",
          textAlign: "center",
          fontWeight: "300",
          px: 2,
        }}
      >
        For topics that do not belong to any other particular topics, please
        post them here.
      </Typography>
    </Box>
  );
}

export default MainHeader;
