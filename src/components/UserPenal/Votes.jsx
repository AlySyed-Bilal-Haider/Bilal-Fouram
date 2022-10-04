import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
export default function Vote() {
  const user_id = localStorage.getItem("user_id") || "";
  const [votestate, setVotestate] = useState([]);
  useEffect(() => {
    const fetchvote = async () => {
      try {
        const { data } = await axios.get(`${url}/fetchvotedpolls/${user_id}`);
        setVotestate(data.data);
        console.log("vote component:", data.data);
      } catch (error) {
        console.log("votes error", error);
      }
    };
    user_id && fetchvote();
  }, [user_id]);

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(votestate?.length / postsPerPage);

  return (
    <>
      <Box pb={10}>
        {votestate?.length > 0 ? (
          votestate
            ?.slice(
              currentPage * postsPerPage - postsPerPage,
              currentPage * postsPerPage
            )
            ?.map((item, i) => {
              return (
                <>
                  {votestate[i]?.poll?.map(
                    ({ _id, addedAt, description, tag, title }, i) => {
                      return (
                        <Box
                          key={_id + i}
                          sx={{
                            p: 2,
                            boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "hover.primary",
                              cursor: "pointer",
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
                              General
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
                                {tag}
                              </Typography>
                              <FaRegComment
                                style={{
                                  marginLeft: "15px",
                                  marginRight: "5px",
                                }}
                              />{" "}
                              {item[i]?.like?.length}
                            </Box>
                          </Box>

                          <Box>
                            <Box display="flex" alignItems="center">
                              <Typography
                                variant="subtitle2"
                                color="primary.main"
                                fontWeight="700"
                              >
                                {votestate[i]?.name}
                              </Typography>
                              <Typography
                                ml={1}
                                variant="body1"
                                color="primary.light"
                                fontSize="13px"
                              >
                                {moment(addedAt).format("LL")}
                              </Typography>
                            </Box>
                          </Box>

                          <Box mt={1} fontSize="14px" color="text.paragraph">
                            {title}
                            <br />
                            {description}
                          </Box>
                        </Box>
                      );
                    }
                  )}
                </>
              );
            })
        ) : (
          <Box py={5} color="primary.light" fontSize="18px" textAlign="center">
            It looks vote there are no posts here.
          </Box>
        )}
      </Box>
      <Box my="15px" mx="10" px>
        <Stack direction={"row"} alignItems="center" justifyContent="flex-end">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangepage}
          />
        </Stack>
      </Box>
    </>
  );
}
