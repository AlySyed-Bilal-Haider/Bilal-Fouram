import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Box,
  Typography,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import {
  FaRegComments,
  FaChalkboardTeacher,
  FaBook,
  FaReply,
  FaRegComment,
} from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";

import { url } from "../../utils";
// /detail
function Commonpage(props) {
  const naviagte = useNavigate();
  const [alldetailsstate, setDetailsState] = React.useState();
  const [categorystate, setCategorystate] = useState([]);
  const [allDescussionsstate, setAlldescussionsstate] = useState([]);
  // fetch specific details from server
  useEffect(() => {
    async function fetchcategory() {
      try {
        const { data } = await axios.get(`${url}/category/${props.tage}`);
        console.log("data category", data);
        setCategorystate(data.data);
      } catch (error) {
        console.log("commonpage category error:", error);
      }
    }
    props?.title && fetchcategory();
  }, [props?.title]);

  // fetch all details from sever
  let allPost = true;
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const { data } = await axios.get(`${url}/alldiscussion`);
        console.log("data.allDiscussion", data.allDiscussion);
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

  // start paginations code
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(alldetailsstate?.length / postsPerPage);
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
      {props.title && categorystate.length === 0 ? (
        <Typography variant="h4" mt={2} fontWeight={700} align="center">
          Upcoming as soon {props.title} !
        </Typography>
      ) : (
        alldetailsstate?.length > 0 &&
        alldetailsstate
          ?.slice(
            currentPage * postsPerPage - postsPerPage,
            currentPage * postsPerPage
          )
          .map((items, i) => {
            return (
              <Box
                onClick={() => {
                  detailsHandler(items?._id);
                }}
                key={i}
                sx={{
                  mt: 2,
                  pb: { md: 2, xs: 1 },
                  boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "hover.primary",
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
                    {alldetailsstate[i]?.user?.img ? (
                      <img
                        src={`${url}/upload/${alldetailsstate[i]?.user?.img}`}
                        alt=""
                      />
                    ) : (
                      alldetailsstate[i]?.user?.name?.slice(0, 1).toUpperCase()
                    )}
                  </Avatar>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
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
                        <FaReply size="14px" style={{ marginRight: "3px" }} />
                        <Typography
                          sx={{ color: "text.paragraph", fontSize: "11px" }}
                        >
                          <strong style={{ marginRight: "5px" }}>
                            {alldetailsstate[i]?.user?.name
                              ? alldetailsstate[i]?.user?.name
                              : "Admin"}
                          </strong>

                          {items?.addedAt
                            ? moment(items?.addedAt).format("LL")
                            : new Date()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography
                        px="5px"
                        py="2px"
                        variant="body1"
                        sx={{
                          color: "text.main",
                          fontSize: "11px",
                          fontWeight: 700,
                          backgroundColor: "secondary.light",
                          borderRadius: "4px",
                          textTransform: "capitalize",
                          width: "fit-content",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {items?.tag === "general" ? (
                          <FaRegComments
                            size="15px"
                            style={{ marginRight: "5px" }}
                          />
                        ) : items?.tag === "Proposal" ? (
                          <FaChalkboardTeacher
                            size="15px"
                            style={{ marginRight: "5px" }}
                          />
                        ) : items?.tag === "Knowledge Base" ? (
                          <FaBook size="13px" style={{ marginRight: "5px" }} />
                        ) : items?.tag === "Community Development" ? (
                          <RiGroupFill
                            size="15px"
                            style={{ marginRight: "5px" }}
                          />
                        ) : items?.tag === "Feedback" ? (
                          <CgNotes size="15px" style={{ marginRight: "5px" }} />
                        ) : (
                          ""
                        )}

                        {items?.tag ? items?.tag : "All descussion"}
                      </Typography>

                      <Typography variant="body1" fontSize="14px" ml={2}>
                        <FaRegComment style={{ marginRight: "5px" }} /> 0
                      </Typography>
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
      <Box my="15px" mx="10" px>
        <Stack direction={"row"} alignItems="center" justifyContent="flex-end">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangepage}
          />
        </Stack>
      </Box>
    </Grid>
  );
}

export default Commonpage;
