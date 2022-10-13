import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
import Loading from "../../loading";
export default function Like({ id }) {
  const user_id = localStorage.getItem("user_id") || "";
  const [likestate, setlikestate] = useState([]);
  const [loading, setLoading] = useState(false);
  let count = 0;
  useEffect(() => {
    const fetchlikepost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(`${url}/fetchuserposts/${id}`);
        setlikestate(data);
        setLoading(false);
      } catch (error) {
        console.log("Likes error", error);
        setLoading(false);
      }
    };
    id && fetchlikepost();
  }, [id]);

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(likestate?.length / postsPerPage);
  return (
    <>
      <Loading loading={loading} />
      <Box pb={10}>
        {likestate?.length > 0
          ? likestate?.map((item) => {
              return (
                <>
                  {item?.discussion?.map((items, i) => {
                    return (
                      <>
                        {items?.ref_id?.visibility == true &&
                          items?.ref_id?.status == "Approved" &&
                          items?.ref_id?.like?.includes(user_id) && (
                            <>
                              count++
                              <Box
                                mt={i === 0 ? 0 : 2}
                                key={i}
                                sx={{
                                  boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                                  borderRadius: "4px",
                                  "&:hover": {
                                    backgroundColor: "hover.primary",
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  color="primary.main"
                                  fontWeight="700"
                                >
                                  {/* {item} */}
                                </Typography>

                                <Box
                                  pl={8}
                                  pb={3}
                                  borderBottom="1px solid #fff"
                                >
                                  <Box
                                    py={2}
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <Box
                                      sx={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        mr: 1,
                                      }}
                                    >
                                      <Avatar sx={{ width: 32, height: 32 }}>
                                        {items?.ref_id?.user?.img ? (
                                          <img
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: "50%",
                                            }}
                                            src={`${url}/upload/${items?.ref_id?.user?.img}`}
                                            alt="Good"
                                          />
                                        ) : (
                                          items?.ref_id?.user?.name
                                            ?.toUpperCase()
                                            .slice(0, 1)
                                        )}
                                      </Avatar>
                                    </Box>
                                    <Typography
                                      variant="body1"
                                      color="primary.main"
                                      fontWeight="700"
                                    >
                                      {items?.ref_id?.user?.name}
                                    </Typography>

                                    <Typography
                                      ml={2}
                                      variant="body1"
                                      color="primary.light"
                                      fontSize="13px"
                                    >
                                      {moment(items?.ref_id?.addedAt).format(
                                        "LL"
                                      )}
                                    </Typography>
                                    <Typography
                                      ml={2}
                                      variant="body1"
                                      color="primary.light"
                                      fontSize="13px"
                                    >
                                      {items?.ref_id?.status}
                                    </Typography>
                                  </Box>

                                  <Box fontSize="14px" color="text.paragraph">
                                    {items?.ref_id?.title}
                                    <br />
                                    <br />
                                    {items?.ref_id?.description}
                                    <br />
                                  </Box>
                                </Box>
                              </Box>
                            </>
                          )}
                      </>
                    );
                  })}
                </>
              );
            })
          : ""}

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
      </Box>
    </>
  );
}
