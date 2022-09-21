import { Box, Typography } from "@mui/material";
import { FaRegComment } from "react-icons/fa";

export default function Discussion() {
  return (
    <Box pb={10}>
      {["TestPool", "Testing"].map((item, i) => {
        return (
          <Box
            key={i}
            p={2}
            sx={{
              opacity: "0.4",
              "&:hover": {
                background: "#fff",
                borderRadius: "10px",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="primary.main"
                fontWeight="700"
                fontSize="18px"
              >
                {item}
              </Typography>

              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  color="text.main"
                  backgroundColor="primary.main"
                  borderRadius="5px"
                  px="7px"
                  py="1px"
                >
                  General
                </Typography>
                <FaRegComment
                  style={{ marginLeft: "15px", marginRight: "5px" }}
                />{" "}
                0
              </Box>
            </Box>

            <Box>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  fontWeight="700"
                >
                  MajorSaab
                </Typography>
                <Typography
                  ml={1}
                  variant="body1"
                  color="primary.light"
                  fontSize="13px"
                >
                  started 2 days ago
                </Typography>
              </Box>
            </Box>

            <Box mt={1} fontSize="14px" color="text.paragraph">
              Before you post this:
              <br />
              i. The forum is intended for in-depth discussion only. For support
              tickets or general queries, please head to our Discord channel:
              https://discord.com/invite/olympusdao
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
