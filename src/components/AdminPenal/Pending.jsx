import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Pagination } from "@mui/material";
import { url } from "../../utils";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading";
export default function Pending() {
  const [pendingpost, setPendingpost] = useState([]);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));
  const [loading, setLoading] = useState(false);

  // fetch pending post
  const fetchPending = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    idstate && fetchPending();
  }, []);

  const approveAndReactHandle = async (path, post_id) => {
    console.log("post_id", post_id);
    try {
      setLoading(true);
      await fetch(`${url}/${path}/${post_id}`, {
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
      setLoading(false);
    } catch (error) {
      console.log("Approved post error", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const btn = {
    width: "120px",
    height: "36px",
    fontSize: "10px",
    fontWeight: 700,
    padding: "8px 30px 8px 30px",
  };

  // paginations start here
  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(pendingpost?.length / postsPerPage);
  return (
    <>
      <Loading loading={loading} />
      <Box pb={10}>
        {pendingpost?.length > 0 &&
          pendingpost
            ?.slice(
              currentPage * postsPerPage - postsPerPage,
              currentPage * postsPerPage
            )
            ?.map(
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
                            approveAndReactHandle("approvepost", _id);
                          }}
                          style={btn}
                          sx={{
                            backgroundColor: "secondary.main",
                            color: "text.main",
                            "&:hover": {
                              backgroundColor: "secondary.main",
                            },
                          }}
                        >
                          Approved
                        </Button>
                        <Button
                          style={btn}
                          sx={{
                            m: 1,
                            backgroundColor: "secondary.main",
                            color: "text.main",
                            "&:hover": {
                              backgroundColor: "secondary.main",
                            },
                          }}
                          onClick={() => {
                            approveAndReactHandle("rejectpost", _id);
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            )}{" "}
        {pendingpost?.length == 0 && (
          <Typography
            sx={{
              mt: 3,
              fontWeight: 700,
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Coming soon !
          </Typography>
        )}
        {pendingpost?.length > 0 && (
          <Box my="15px" mx="10" px>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangepage}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
