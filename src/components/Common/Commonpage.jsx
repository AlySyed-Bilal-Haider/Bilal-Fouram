import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Box, Typography, Grid } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import UndoIcon from "@mui/icons-material/Undo";
import { url } from "../../utils";
// /detail
function Commonpage(props) {
  const naviagte = useNavigate();
  const [namestate, setnamestate] = useState(localStorage.getItem("name"));
  const [alldetailsstate, setDetailsState] = React.useState();
  const [categorystate, setCategorystate] = useState([]);
  const [allDescussionsstate, setAlldescussionsstate] = useState([]);
  // fetch specific details from server
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const { data } = await axios.get(`${url}/category/${props.tage}`);
        console.log("data category", data);
        setCategorystate(data);
      } catch (error) {
        console.log("commonpage category error:", error);
      }
    };
    fetchcategory();
  }, [props.title]);

  // fetch all details from sever
  let allPost = true;
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const { data } = await axios.get(`${url}/alldiscussion`);
        setAlldescussionsstate(data.allDiscussion);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdetails();
  }, [allPost]);

  // check this category data and All descussion data
  useEffect(() => {
    if (categorystate.length !== 0) {
      setDetailsState(categorystate);
    } else {
      setDetailsState(allDescussionsstate);
    }
  });

  const detailsHandler = (id) => {
    naviagte(`/detail/${id}`);
  };
  return (
    <Grid item md={10} xs={12}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          disableRipple={true}
          sx={{
            width: "36px",
            height: "36px",
            backgroundColor: "tranparent",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "secondary.light",
              color: "text.main",
            },
          }}
        >
          Latest
        </Button>
        <Button
          sx={{
            width: "36px",
            height: "36px",
            backgroundColor: "secondary.main",
            color: "text.main",
            border: "4px",
          }}
        >
          <AutorenewIcon />
        </Button>
      </Box>
      {/* 
      .........start main sections here ............. */}
      {props.title && categorystate.length == 0 ? (
        <Typography variant="h4" mt={2} fontWeight={700} align="center">
          Upcoming as soon {props.title} !
        </Typography>
      ) : (
        alldetailsstate?.map((items, i) => {
          return (
            <Box
              onClick={() => {
                detailsHandler(items?._id);
              }}
              key={i}
              sx={{
                mt: 2,
                pt: 0.5,
                pb: { md: 1, xs: 0 },
                pr: 4,
                "&:hover": {
                  backgroundColor: "hover.primary",
                  borderRadius: "4px",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-flex",
                  alignItems: { md: "center", xs: "flex-start" },
                  p: { md: 2, xs: 1 },
                }}
              >
                <Avatar
                  sx={{
                    width: { md: "40px", xs: "30px" },
                    height: { md: "40px", xs: "30px" },
                    bgcolor: deepPurple[500],
                    mr: { md: 2, xs: 1 },
                    fontSize: { md: "14px", xs: "12px" },
                  }}
                >
                  {namestate ? namestate?.slice(0, 1).toUpperCase() : null}
                </Avatar>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexDirection: { md: "row", xs: "column" },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "text.paragraph",
                        fontSize: { md: "16px", xs: "12px" },
                      }}
                    >
                      {items.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <UndoIcon sx={{ color: "text.paragraph" }} />
                      <Typography
                        sx={{ color: "text.paragraph", fontSize: "11px" }}
                      >
                        <strong style={{ marginRight: "5px" }}>
                          {namestate ? namestate : "Usman Shab"}
                        </strong>

                        {items?.addedAt
                          ? moment(items?.addedAt).format("LL")
                          : new Date()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      startIcon={
                        <AutorenewIcon
                          sx={{ fontSize: { md: "8px", xs: "4px" } }}
                        />
                      }
                      sx={{
                        height: "17px",
                        fontSize: "8px",
                        fontWeight: 700,
                        backgroundColor: "primary.main",
                        borderRadius: "4px",
                        color: "text.main",
                        px: { md: 1, xs: 0.5 },
                        py: { md: 1.5, xs: 1 },
                        "&:hover": {
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      {items?.tag ? items?.tag : "All descussion"}
                    </Button>
                    <Button
                      startIcon={
                        <AutorenewIcon
                          sx={{
                            fontSize: "14px",
                            display: { md: "block", xs: "none" },
                          }}
                        />
                      }
                      sx={{ height: "21px", fontSize: "14px" }}
                    >
                      0
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "text.paragraph",
                  fontSize: "11px",
                  width: "85%",
                  m: "auto",
                  display: { md: "block", xs: "none" },
                }}
              >
                {items.description}
              </Typography>
            </Box>
          );
        })
      )}
    </Grid>
  );
}

export default Commonpage;
