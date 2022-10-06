import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
export default function Mention() {
  const user_id = localStorage.getItem("user_id") || "";
  const [mentionState, setMentionState] = useState([]);
  useEffect(() => {
    const fetchlikepost = async () => {
      try {
        const { data } = await axios.get(`${url}/fetchuserposts/${user_id}`);
        console.log("mentions:", data);
        setMentionState(data?.data);
        console.log("like component:", data.data);
      } catch (error) {
        console.log("Likes error", error);
      }
    };
    user_id && fetchlikepost();
  }, [user_id]);

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(mentionState?.length / postsPerPage);
  return (
    <>
      <Box pb={10}>
        {mentionState?.length > 0 ? (
          mentionState
            ?.slice(
              currentPage * postsPerPage - postsPerPage,
              currentPage * postsPerPage
            )
            ?.map(({ ref_id }, i) => {
              return (
                <>
                  {ref_id?.comments?.mention?.includes(user_id) ? (
                    <Box
                      key={i + ref_id?._id}
                      p={2}
                      sx={{
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
                          {ref_id?.title}
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
                          {ref_id?.comments?.mention?.length}
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
                        {ref_id?.description}
                      </Box>
                    </Box>
                  ) : null}
                </>
              );
            })
        ) : (
          <Box py={5} color="primary.light" fontSize="18px" textAlign="center">
            It looks vote there are no posts here.
          </Box>
        )}

        {mentionState?.length > 0 && (
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
