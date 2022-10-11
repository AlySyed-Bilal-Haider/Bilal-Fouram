import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading";
export default function Vote({ id }) {
  let count = 0;
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id") || "";
  const [votestate, setVotestate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchvote = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}/fetchuserposts/${id}`);
        setVotestate(data?.data);
        console.log("vote component:", data?.data);
        setLoading(false);
      } catch (error) {
        console.log("votes error", error);
        setLoading(false);
      }
    };
    id && fetchvote();
  }, [id]);

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(votestate?.length / postsPerPage);

  const naviagteHandler = (id) => {
    console.log("id", id);
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <Loading loading={loading} />
      <Box pb={10}>
        {votestate?.length > 0 &&
          votestate
            ?.slice(
              currentPage * postsPerPage - postsPerPage,
              currentPage * postsPerPage
            )
            ?.map(({ ref_id }, i) => {
              return (
                <>
                  {ref_id?.poll?.answers?.vote?.includes(user_id) ? (
                    <>
                      count++;
                      <Box
                        onClick={() => {
                          naviagteHandler(ref_id?._id);
                        }}
                        key={ref_id?._id + i}
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
                            {ref_id?.tag}
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
                              {ref_id?.tag}
                            </Typography>
                            <FaRegComment
                              style={{
                                marginLeft: "15px",
                                marginRight: "5px",
                              }}
                            />{" "}
                            {ref_id.poll?.vote?.length}
                          </Box>
                        </Box>

                        <Box>
                          <Box display="flex" alignItems="center">
                            <Typography
                              variant="subtitle2"
                              color="primary.main"
                              fontWeight="700"
                            >
                              {ref_id?.user?.name}
                            </Typography>
                            <Typography
                              ml={1}
                              variant="body1"
                              color="primary.light"
                              fontSize="13px"
                            >
                              {moment(ref_id?.addedAt).format("LL")}
                            </Typography>
                          </Box>
                        </Box>

                        <Box mt={1} fontSize="14px" color="text.paragraph">
                          {ref_id?.title}
                          <br />
                          {ref_id?.description}
                        </Box>
                      </Box>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
      </Box>
      {count > 0 ? (
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
      ) : (
        <Box py={5} color="primary.light" fontSize="18px" textAlign="center">
          It looks vote there are no posts here.
        </Box>
      )}
    </>
  );
}
