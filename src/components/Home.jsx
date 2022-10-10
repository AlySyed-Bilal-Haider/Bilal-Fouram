import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import {
  FaRegComments,
  FaChalkboardTeacher,
  FaPhone,
  FaBook,
} from "react-icons/fa";
import { RiCheckboxBlankFill, RiGroupFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";

import StartDiscussionButton from "./StartDiscussionButton";
const discussion = [
  {
    icons: <FaRegComments size="30px" />,
    maintext: "General",
    subtext:
      " For topics that do not belong to any other particular topics, please post them here",
    value: "General",
  },
  {
    icons: <FaChalkboardTeacher size="30px" />,
    maintext: "Proposal",
    subtext:
      "This section reserved for the final versions of MINER DAO Proposals. Use the template provided in the pinned post.",
    value: "Proposal",
  },
  {
    icons: <FaPhone size="26px" />,
    maintext: "Support",
    subtext: "Please head to our Discord for support.",
    color: "white",
    value: "Support",
  },
  {
    icons: <FaBook size="26px" />,
    maintext: "Knowledge Base",
    subtext: "Community initiatives driving education to help new ohmies.",
    value: "KnowledgeBase",
  },
  {
    icons: <RiGroupFill size="28px" />,
    maintext: "Community Development",
    subtext:
      "All non-educational community proposals and community engagement ideas can be posted here",
    value: "CommunityDevelopment",
  },
  {
    icons: <CgNotes size="28px" />,
    maintext: "Feedback",
    subtext:
      "Provide feedback about the protocol, the community and the team here",
    value: "Feedback",
  },
  {
    icons: <RiCheckboxBlankFill size="30px" />,
    maintext: "ProjectProposal",
    subtext: "Project Proposals within the DAO",
    value: "ProjectProposals",
  },
];

export default function Home({ setOpenlogin, userid }) {
  const navigate = useNavigate();
  // ..........end token verfication........
  const navigationHandler = (value) => {
    console.log("value", value);
    navigate(`/AllDiscussions/${value}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="lg" sx={{ mt: { md: 4, xs: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <StartDiscussionButton setOpenlogin={setOpenlogin} userid={userid} />
          <Link to="/AllDiscussions" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<FaRegComments />}
              sx={{
                ml: 2,
                color: "text.paragraph",
                "&:hover": {
                  backgroundColor: "secondary.light",
                  color: "text.main",
                },
              }}
            >
              All Discussions
            </Button>
          </Link>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt: { md: 4, xs: 0.1 }, mb: 10 }}>
        <Grid container>
          {discussion?.map((items, index) => {
            return (
              <Grid
                onClick={() => {
                  navigationHandler(items.value);
                }}
                key={index}
                item
                md={4}
                xs={12}
                sx={{
                  cursor: "pointer",
                  mt: { md: 0, xs: 1 },
                  height: "200px",
                  backgroundColor:
                    index === 0 ? "primary.main" : "primary.light",
                }}
              >
                <Box
                  sx={{
                    height: "158px",
                    padding: "15px",
                    borderTopLeftRadius: "4px",
                    "&:hover": {
                      backgroundColor: "hover.main",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "text.main",
                        mt: 0.5,
                      }}
                    >
                      {items.icons}
                    </Box>
                    <Typography
                      sx={{
                        ml: 1.2,
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "text.main",
                      }}
                    >
                      {items.maintext}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.light",
                    }}
                  >
                    {items.subtext}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
