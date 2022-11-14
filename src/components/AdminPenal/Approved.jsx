import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import moment from "moment";
import { url } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading";
import Avatar from "@mui/material/Avatar";
import { useNavigate, NavLink } from "react-router-dom";
function Approved({ Approvedstate, func, state }) {
  const navigate = useNavigate();
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));
  const [loading, setLoading] = useState(false);
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
          data?.status == "ok" && func(!state);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const detailsHandle = (id) => {
    navigate(`/detail/${id}`);
  };
  const profileHandle = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <>
      <Loading loading={loading} />

      <Box pb={10}>
        {Approvedstate?.length > 0 &&
          Approvedstate?.map(
            ({ _id, addedAt, description, status, tag, title, user }, i) => {
              return (
                <Box sx={{ cursor: "pointer" }} key={_id + i}>
                  <Box pl={8} pb={3} borderBottom="1px solid #fff">
                    <Box py={2} display="flex" alignItems="center">
                      <Box
                        onClick={(e) => {
                          profileHandle(user?._id);
                        }}
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      >
                        {user?.img ? (
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                            src={`${url}/upload/${user?.img}`}
                            alt=""
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: "secondary.light",
                            }}
                          >
                            {user?.name?.toUpperCase().slice(0, 1)}
                          </Avatar>
                        )}
                      </Box>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        fontWeight="700"
                        onClick={() => profileHandle(_id)}
                        // onClick={(e) => profileHandle(_id)}
                      >
                        {user?.name}
                      </Typography>

                      <Typography
                        onClick={() => {
                          detailsHandle(_id);
                        }}
                        ml={2}
                        variant="body1"
                        color="primary.light"
                        fontSize="13px"
                      >
                        {moment(addedAt).format("LL")}
                      </Typography>
                      <Typography
                        onClick={() => {
                          detailsHandle(_id);
                        }}
                        ml={2}
                        variant="body1"
                        color="primary.light"
                        fontSize="13px"
                      >
                        {status}
                      </Typography>
                    </Box>
                    <Box
                      fontSize="14px"
                      color="text.paragraph"
                      onClick={() => {
                        detailsHandle(_id);
                      }}
                    >
                      {title}
                    </Box>
                    <br />
                    <Box
                      fontSize="14px"
                      color="text.paragraph"
                      onClick={() => {
                        detailsHandle(_id);
                      }}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <br />
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
                        Reject
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            }
          )}
        {Approvedstate?.length == 0 && (
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
      </Box>
    </>
  );
}

export default React.memo(Approved);
