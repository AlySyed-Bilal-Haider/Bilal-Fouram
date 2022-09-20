import React from "react";
import { Box, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
function MainHeader({ title }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "133px",
        backgroundColor: "transparent",
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
        <UndoIcon sx={{ color: "text.paragraph", fontSize: "22px", mr: 1 }} />
        <Typography sx={{ color: "text.paragraph", fontSize: "22px" }}>
          {title}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "text.paragraph",
          fontSize: "15.5px",
          textAlign: "center",
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
