import React from "react";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import { deepOrange, deepPurple } from "@mui/material/colors";
import UndoIcon from "@mui/icons-material/Undo";
import Knowledgebase from "./Knowledgebase";
const sidebardata = [
  {
    text: "All discussions",
    link: "/AllDiscussions",
  },
  {
    text: "General",
    link: "/AllDiscussions",
  },
  {
    text: "Proposal",
    link: "/AllDiscussions",
  },
  {
    text: "Support",
    link: "/AllDiscussions",
  },
  {
    text: "Knowledge base",
    link: "/Knowledgebase",
  },
  {
    text: "Community Development",
    link: "/AllDiscussions",
  },
  {
    text: "Feed",
    link: "/AllDiscussions",
  },
  {
    text: "Project Proposal",
    link: "/AllDiscussions",
  },
];
function AllDiscussions() {
  const location = useLocation();
  return (
    <Box
      sx={{ width: "100%", backgroundColor: "body.main", minHeight: "100vh" }}
    >
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item md={2} sx={{ display: { md: "block", xs: "none" } }}>
            <Button
              sx={{
                width: "100%",
                height: "36px",
                fontSize: "10px",
                fontWeight: 700,
                padding: "8px 30px 8px 30px",
                backgroundColor: "primary.main",
                color: "text.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              Start a Discussion
            </Button>
            <Box sx={{ mt: 2, width: "100%" }}>
              {sidebardata?.map(({ text, link }, index) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      py: 1,
                    }}
                  >
                    <AutorenewIcon
                      sx={{
                        width: "30%",
                        mr: 1,
                        color:
                          index == 0 ? "primary.main" : "primary.lightmain",
                      }}
                    />
                    <Link to={link} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          width: "70%",
                          fontSize: "13px",
                          fontWeight: 700,
                          color:
                            index == 0 ? "primary.main" : "primary.lightmain",
                        }}
                      >
                        {text}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          {location.pathname == "/AllDiscussions" ? (
            <Grid item md={10} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "white",
                    borderRadius: "4px",

                    "&:hover": {
                      backgroundColor: "text.main",
                    },
                  }}
                >
                  Latest
                </Button>
                <Button
                  sx={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "white",
                    border: "4px",
                  }}
                >
                  <AutorenewIcon />
                </Button>
              </Box>
              {/* 
                .........start main sections here ............. */}
              {[1, 2, 3, 4, 5, 6, 7].map(() => {
                return (
                  <Box
                    sx={{
                      mt: 2,
                      pt: 0.5,
                      pb: { md: 1, xs: 0 },
                      pr: 4,
                      "&:hover": {
                        backgroundColor: "text.main",
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
                          fontSize:{md:"14px",xs:'12px'}
                        }}
                      >
                        OP
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
                              color: "text.detail",
                              fontSize: { md: "16px", xs: "12px" },
                            }}
                          >
                            Please Use Our Discord for General Enquiry
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <UndoIcon sx={{ color: "text.lightgray" }} />
                            <Typography
                              sx={{ color: "text.lightgray", fontSize: "11px" }}
                            >
                              <strong> kschan</strong> started December 26, 2021
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Button
                            startIcon={
                              <AutorenewIcon sx={{ fontSize: {md:"8px",xs:"4px"} }} />
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
                            Knowledge base
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
                        color: "text.lightgray",
                        fontSize: "11px",
                        width: "85%",
                        m: "auto",
                        display: { md: "block", xs: "none" },
                      }}
                    >
                      If you have any questions regarding how the protocol works
                      and its various mechanisms, please head to the Olympus
                      Discord, you are more likely to get immediate support
                      there. ...
                    </Typography>
                  </Box>
                );
              })}
            </Grid>
          ) : (
            <Knowledgebase />
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default AllDiscussions;
