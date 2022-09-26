import React from "react";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useLocation, NavLink } from "react-router-dom";
// import Signup from './Signup';
import MainHeader from "./Common/MainHeader";
import Knowledgebase from "./Knowledgebase";
import General from "./General";
import Projectprosal from "./Projectprosal";
import Proposal from "./Proposal";
import Community from "./Community";
import Feed from "./Feed";
import Support from "./Support";
import Commonpage from "./Common/Commonpage";
import { sidebardata } from "./Common/Links";
const renderComponent = (locationpath) => {
  switch (locationpath) {
    case "/AllDiscussions":
      return <Commonpage />;
    case "/AllDiscussions/General":
      return <General title="General" tage="General" />;
    case "/AllDiscussions/Proposal":
      return <Proposal title="Proposal" tage="Proposal"/>;
    case "/AllDiscussions/Support":
      return <Support title="Support" tage="Support" />;
    case "/AllDiscussions/KnowledgeBase":
      return <Knowledgebase title="Knowledgebase" tage="Knowledge Base" />;
    case "/AllDiscussions/CommunityDevelopment":
      return <Community title="Community" tage="Community Development"/>;
    case "/AllDiscussions/Feedback":
      return <Feed title="Feed" tage="Feedback"/>;
    case "/AllDiscussions/ProjectProposals":
      return <Projectprosal title="Project propsal" tage="Project Proposals" />;
    default:
      <h1> Page Not Found</h1>;
      break;
  }
};
const mainHeader = (locationpath) => {
  switch (locationpath) {
    case "/AllDiscussions/General":
      return <MainHeader title="General" />;
    case "/AllDiscussions/Proposal":
      return <MainHeader title="Proposal" />;
    case "/AllDiscussions/Support":
      return <MainHeader title="Support" />;
    case "/AllDiscussions/KnowledgeBase":
      return <MainHeader title="Knowledgebase" />;
    case "/AllDiscussions/CommunityDevelopment":
      return <MainHeader title="Community" />;
    case "/AllDiscussions/Feedback":
      return <MainHeader title="Feed" />;
    case "/AllDiscussions/ProjectProposals":
      return <MainHeader title="Project propsal" />;

    default:
      return null;
  }
};
function AllDiscussions() {
  const location = useLocation();
  console.log("location",location.pathname);
  return (
    <>
      {location?.pathname && mainHeader(location?.pathname)}

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
                  backgroundColor: "secondary.main",
                  color: "text.main",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Start a Discussion
              </Button>
              <Box sx={{ mt: 2, width: "100%" }}>
                {sidebardata?.map(({ text, link }, index) => {
                  return (
                    <Box
                      key={index}
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
                          color: index == 0 ? "primary.main" : "primary.light",
                        }}
                      />
                      <NavLink
                        to={link}
                        style={{ textDecoration: "none", fontSize: "16px" }}
                        className={({ isActive }) =>
                          isActive ? "active" : "inactive"
                        }
                      >
                        {text}
                      </NavLink>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            {location?.pathname && renderComponent(location?.pathname)}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default React.memo(AllDiscussions);
