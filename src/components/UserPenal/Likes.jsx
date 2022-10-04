import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { url } from "../../utils";
import moment from "moment";
export default function Like() {
  const user_id = localStorage.getItem("user_id") || "";
  const [likestate, setlikestate] = useState([]);
  useEffect(() => {
    const fetchlikepost = async () => {
      try {
        const { data } = await axios.get(`${url}/fetchlikedposts/${user_id}`);
        setlikestate(data.data);
        console.log("like component:", data.data);
      } catch (error) {
        console.log("Likes error", error);
      }
    };
    user_id && fetchlikepost();
  }, [user_id]);

  return (
    <>
      <Box pb={10}>
        {likestate?.map((item, i) => {
          return (
            <>
              {likestate[i]?.like?.map(
                ({ _id, addedAt, description, tag, title, name }, i) => {
                  return (
                    <Box
                      key={_id + i}
                      p={2}
                      sx={{
                        // opacity: "0.4",
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
        })}
      </Box>
    </>
  );
}
