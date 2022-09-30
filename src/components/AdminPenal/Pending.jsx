import React from "react";
import { Box, Typography, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Pending() {
  return (
    <Box pb={10}>
      <Box>
        <Typography variant="body1" color="primary.main" fontWeight="700">
          Post 2
        </Typography>

        <Box pl={8} pb={3} borderBottom="1px solid #fff">
          <Box py={2} display="flex" alignItems="center">
            <Typography variant="body1" color="primary.main" fontWeight="700">
              User2
            </Typography>
            <Typography
              ml={2}
              variant="body1"
              color="primary.light"
              fontSize="13px"
            >
              22 dec 2021
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
            Post title
            <br />
            <br />
            Treasury team is glad to present the first Treasury report to the
            community. This thread will be used to publish monthly reports. All
            feedback is welcome and can be shared in ...
            <br />
          </Box>

          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              sx={{
                width: "120px",
                height: "36px",
                fontSize: "10px",
                fontWeight: 700,
                padding: "8px 30px 8px 30px",
                backgroundColor: "secondary.main",
                color: "text.main",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              approved
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
