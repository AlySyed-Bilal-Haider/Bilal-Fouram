import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import moment from "moment";
import { url } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
export default function Approved() {
  const navigate = useNavigate();
  const [Approvedstate, setApprovedstate] = useState([]);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));
  const [loading, setLoading] = useState(false);
  const [isActive, setActivestate] = useState(true);
  // Approved post fetch
  const fetchApproved = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/fetchapprovedposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approved data !", data);
          setApprovedstate(data?.posts);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    idstate && fetchApproved();
  }, []);

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
          data?.status == "ok" && fetchApproved();
        });
    } catch (error) {
      console.log("Reject post error", error);
      toast.error(error.message);
    }
  };

  const detailsHandle = (id) => {
    console.log("navigate:", id);
  };
  return (
    <>
      <Loading loading={loading} />

      <Box pb={10}>
        {Approvedstate?.length > 0 &&
          Approvedstate?.map(
            ({ _id, addedAt, description, status, tag, title, user }, i) => {
              return (
                <Box
                  key={_id + i}
                  onClick={() => {
                    detailsHandle(_id);
                  }}
                >
                  <Box pl={8} pb={3} borderBottom="1px solid #fff">
                    <Box py={2} display="flex" alignItems="center">
                      <Box
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
                        onClick={(e) => {
                          e.stopPropagation();
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
