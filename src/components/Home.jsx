import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import StartDiscussionButton from "./StartDiscussionButton";
const discussion = [
  {
    icons: <CloudOffIcon />,
    maintext: "General",
    subtext:
      " For topics that do not belong to any other particular topics,please post them here",
    value: "General",
  },
  {
    icons: <ContactEmergencyIcon />,
    maintext: "Proposal",
    subtext: "OIP-94B Inverse Bond Framework Approval",
    value: "Proposal",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Support",
    subtext: "How do I get any help on here?",
    color: "white",
    value: "Support",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Knowledge Base",
    subtext:
      "https://www.facebook.com/Juan-Rivera-Keto-Gummies-106696188817590",
    value: "KnowledgeBase",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Community Development",
    subtext:
      "All non-educational community proposals and community engagement ideas can be posted here",
    value: "CommunityDevelopment",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Feedback",
    subtext:
      "Provide feedback about the protocol, the community and the team here",
    value: "Feedback",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "ProjectProposal",
    subtext: "Project Proposals within the DAO",
    value: "ProjectProposals",
  },
];

export default function Home({ setOpenlogin,userid }) {
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
          <StartDiscussionButton
            setOpenlogin={setOpenlogin}
            userid={userid}
          />
          <Link to="/AllDiscussions" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<CloudOffIcon />}
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
      <Container maxWidth="lg" sx={{ mt: { md: 4, xs: 0.1 } }}>
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
                        ml: 1,
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
