import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { url } from "../../utils";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pending() {
  const [pendingpost, setPendingpost] = useState([]);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));

  // fetch pending post
  const fetchPending = async () => {
    try {
      await fetch(`${url}/fetchpendingposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approved data !", data);
          setPendingpost(data?.posts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    idstate && fetchPending();
  }, []);

  const approveHandle = async (post_id) => {
    console.log("post_id", post_id);
    try {
      await fetch(`${url}/approvepost/${post_id}`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approve data !");
          data?.status == "ok" && toast.success(data.message);
          data?.status == "ok" && fetchPending();
        });
    } catch (error) {
      console.log("Approved post error", error);
      toast.error(error.message);
    }
  };
  return (
    <Box pb={10}>
      {pendingpost?.map(
        ({ _id, addedAt, description, status, user, tag, title }, i) => {
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
                      approveHandle(_id);
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
                    Approved
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
}
