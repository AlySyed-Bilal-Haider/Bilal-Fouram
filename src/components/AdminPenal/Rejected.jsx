import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { url } from "../../utils";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading";
import Avatar from "@mui/material/Avatar";
export default function Rejected() {
  const [rejected, setRejectedstate] = useState([]);
  const [idstate, setIdstate] = useState(localStorage.getItem("user_id"));
  const [loading, setLoading] = useState(false);
  // fetch rejectd post from server
  const fetchRejected = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/fetchrejectedposts`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Rejected data !", data);
          setRejectedstate(data?.posts);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    idstate && fetchRejected();
  }, []);

  const approveHandle = async (post_id) => {
    console.log("post_id", post_id);
    try {
      await fetch(`${url}/approvepost/${post_id}`, {
        method: "GET",
        headers: {
          "x-access-token": idstate,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Approve data !");
          data?.status == "ok" && toast.success(data.message);
          data?.status == "ok" && fetchRejected();
        });
    } catch (error) {
      console.log("Approved post error", error);
      toast.error(error.message);
    }
  };
  return (
    <Box pb={10}>
      <Loading loading={loading} />
      {rejected?.length > 0 &&
        rejected?.map(
          ({ _id, addedAt, description, status, user, tag, title }, i) => {
            return (
              <Box key={_id + i}>
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
                          alt="Good"
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
                      onClick={() => {
                        approveHandle(_id);
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
                      Approve
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          }
        )}{" "}
      {rejected.length == 0 && (
        <Typography
          sx={{ mt: 3, fontWeight: 700, textAlign: "center", fontSize: "20px" }}
        >
          Coming soon !
        </Typography>
      )}
    </Box>
  );
}
