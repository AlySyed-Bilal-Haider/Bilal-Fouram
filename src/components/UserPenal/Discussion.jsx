import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
import Loading from "../../loading";
import { NavLink } from "react-router-dom";
function Discussion({ id }) {
  const [descussionstate, setDescussionState] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(`${url}/fetchuserposts/${id}`);
        setDescussionState(data?.data);
        console.log(data, "all descusssion");
        setLoading(false);
      } catch (error) {
        console.log("Discussions error:", error);
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <Box pb={10}>
        {descussionstate?.length > 0 &&
          descussionstate?.map((item) => {
            return (
              <>
                {item?.discussion?.map((items, i) => {
                  return (
                    <>
                      {items?.ref_id?.visibility == true &&
                        items?.ref_id?.status == "Approved" && (
                          <>
                            <NavLink
                              to={`/detail/${items?.ref_id?._id}`}
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                            >
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
                                  </Box>
                                  <Box
                                    fontSize="14px"
                                    color="text.paragraph"
                                    dangerouslySetInnerHTML={{
                                      __html: items?.ref_id?.description,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </NavLink>
                          </>
                        )}
                    </>
                  );
                })}
              </>
            );
          })}
      </Box>
    </>
  );
}
export default Discussion;
