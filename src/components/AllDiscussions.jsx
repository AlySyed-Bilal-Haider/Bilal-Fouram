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
    case "/general":
      return <General title="General" />;
    case "/proposal":
      return <Proposal title="Proposal" />;
    case "/support":
      return <Support title="Support" />;
    case "/Knowledgebase":
      return <Knowledgebase title="Knowledgebase" />;
    case "/community":
      return <Community title="Community" />;
    case "/feedback":
      return <Feed title="Feed" />;
    case "/projectpropsal":
      return <Projectprosal title="Project propsal" />;
    default:
      <h1> Page Not Found</h1>;
      break;
  }
};
const mainHeader = (locationpath) => {
  switch (locationpath) {
    case "/general":
      return <MainHeader title="General" />;
    case "/proposal":
      return <MainHeader title="Proposal" />;
    case "/support":
      return <MainHeader title="Support" />;
    case "/Knowledgebase":
      return <MainHeader title="Knowledgebase" />;
    case "/community":
      return <MainHeader title="Community" />;
    case "/feedback":
      return <MainHeader title="Feed" />;
    case "/projectpropsal":
      return <MainHeader title="Project propsal" />;

    default:
      return null;
  }
};
function AllDiscussions() {
  const location = useLocation();
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
