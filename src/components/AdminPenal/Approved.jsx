import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import moment from "moment";
import { url } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Approved() {
  const [Approvedstate, setApprovedstate] = useState([]);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));

  // Approved post fetch
  const fetchApproved = async () => {
    try {
      await fetch(`${url}/fetchapprovedposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approved data !", data);
          setApprovedstate(data?.posts);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    idstate && fetchApproved();
  }, []);

  const rejected = async (post_id) => {
    console.log("post_id", post_id);
    try {
      await fetch(`${url}/rejectpost/${post_id}`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Rejected data !");
          data?.status == "ok" && toast.success(data.message);
          data?.status == "ok" && fetchApproved();
        });
    } catch (error) {
      console.log("Reject post error", error);
      toast.error(error.message);
    }
  };
  return (
    <Box pb={10}>
      {Approvedstate?.length > 0 ? (
        Approvedstate?.map(
          ({ _id, addedAt, description, status, tag, title, user }, i) => {
            return (
              <Box key={_id + i}>
                <Box pl={8} pb={3} borderBottom="1px solid #fff">
                  <Box py={2} display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      color="primary.main"
                      fontWeight="700"
                    >
                      {user?.name}
                    </Typography>

                    <Typography
                      ml={2}
                      variant="body1"
                      color="primary.light"
                      fontSize="13px"
                    >
                      {moment(addedAt).format("LL")}
                    </Typography>
                    <Typography
                      ml={2}
                      variant="body1"
                      color="primary.light"
                      fontSize="13px"
                    >
                      {status}
                    </Typography>
                  </Box>

                  <Box fontSize="14px" color="text.paragraph">
                    {title}
                    <br />
                    <br />
                    {description}
                    <br />
                  </Box>

                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Button
                      onClick={() => {
                        rejected(_id);
                      }}
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
                      Rejected
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          }
        )
      ) : (
        <Typography
          sx={{ mt: 3, fontWeight: 700, textAlign: "center", fontSize: "20px" }}
        >
          Coming soon !
        </Typography>
      )}
    </Box>
  );
}
