import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";

function Discussion() {
  const user_id = localStorage.getItem("user_id") || "";
  const [descussionstate, setDescussionState] = useState([]);
  useEffect(() => {
    const fetchdescussion = async () => {
      try {
        const { data } = await axios.get(
          `${url}/fetchuserdiscussion/${user_id}`
        );
        console.log("data descussion", data);
        setDescussionState(data?.data);
      } catch (error) {
        console.log("Descussion error", error);
      }
    };
    user_id && fetchdescussion();
  }, [user_id]);

  // start descussion here
  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(descussionstate?.length / postsPerPage);
  return (
    <Box pb={10}>
      {descussionstate?.length > 0 &&
        descussionstate
          ?.slice(
            currentPage * postsPerPage - postsPerPage,
            currentPage * postsPerPage
          )
          ?.map((item, i) => {
            return (
              <>
                {descussionstate[i]?.discussion?.map(
                  (
                    { _id, addedAt, description, tag, status, title, name },
                    i
                  ) => {
                    return (
                      <>
                        <Box py={2} display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          >
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {descussionstate[i]?.img ? (
                                <img
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                  }}
                                  src={`${url}/upload/${descussionstate[i]?.img}`}
                                  alt="Good"
                                />
                              ) : (
                                descussionstate[i]?.name
                                  .toUpperCase()
                                  .slice(0, 1)
                              )}
                            </Avatar>
                          </Box>
                          <Typography
                            variant="body1"
                            color="primary.main"
                            fontWeight="700"
                          >
                            {descussionstate[i]?.name}
                          </Typography>

                          <Typography
                            ml={2}
                            variant="body1"
                            color="primary.light"
                            fontSize="13px"
                          >
                            {item?.addedAt
                              ? moment(item?.addedAt).format("LL")
                              : null}
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

                        <Box
                          key={_id + i}
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
                              {title}
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
                                {name}
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
                            {description}
                          </Box>
                        </Box>
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
                      </>
                    );
                  }
                )}
              </>
            );
          })}
    </Box>
  );
}
export default Discussion;
