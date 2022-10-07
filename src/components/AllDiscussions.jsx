import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  FaRegComments,
  FaChalkboardTeacher,
  FaPhone,
  FaBook,
} from "react-icons/fa";
import { RiCheckboxBlankFill, RiGroupFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";

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
import StartDiscussionButton from "./StartDiscussionButton";

const renderComponent = (locationpath) => {
  switch (locationpath) {
    case "/AllDiscussions":
      return <Commonpage />;
    case "/AllDiscussions/General":
      return <General title="General" tage="General" />;
    case "/AllDiscussions/Proposal":
      return <Proposal title="Proposal" tage="Proposal" />;
    case "/AllDiscussions/Support":
      return <Support title="Support" tage="Support" />;
    case "/AllDiscussions/KnowledgeBase":
      return <Knowledgebase title="Knowledgebase" tage="Knowledge Base" />;
    case "/AllDiscussions/CommunityDevelopment":
      return <Community title="Community" tage="Community Development" />;
    case "/AllDiscussions/Feedback":
      return <Feed title="Feed" tage="Feedback" />;
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
      return (
        <MainHeader
          title="General"
          icon={
            <>
              <FaRegComments size="25px" style={{ marginRight: "8px" }} />
            </>
          }
          description="For topics that do not belong to any other particular topics, please
          post them here."
        />
      );
    case "/AllDiscussions/Proposal":
      return (
        <MainHeader
          title="Proposal"
          icon={
            <>
              <FaChalkboardTeacher size="25px" style={{ marginRight: "8px" }} />
            </>
          }
          description="This section reserved for the final versions of MINER DAO Proposals. Use the template provided in the pinned post."
        />
      );
    case "/AllDiscussions/Support":
      return (
        <MainHeader
          title="Support"
          icon={
            <>
              <FaPhone size="22px" style={{ marginRight: "8px" }} />
            </>
          }
          description="Please head to our Discord for support."
        />
      );
    case "/AllDiscussions/KnowledgeBase":
      return (
        <MainHeader
          title="Knowledgebase"
          icon={
            <>
              <FaBook size="22px" style={{ marginRight: "8px" }} />
            </>
          }
          description="Community initiatives driving education to help new ohmies."
        />
      );
    case "/AllDiscussions/CommunityDevelopment":
      return (
        <MainHeader
          title="Community"
          icon={
            <>
              <RiGroupFill size="26px" style={{ marginRight: "8px" }} />
            </>
          }
          description="All non-educational community proposals and community engagement ideas can be posted here"
        />
      );
    case "/AllDiscussions/Feedback":
      return (
        <MainHeader
          title="Feed"
          icon={
            <>
              <CgNotes size="25px" style={{ marginRight: "8px" }} />
            </>
          }
          description="Provide feedback about the protocol, the community and the team here"
        />
      );
    case "/AllDiscussions/ProjectProposals":
      return (
        <MainHeader
          title="Project propsal"
          icon={
            <>
              <RiCheckboxBlankFill size="25px" style={{ marginRight: "8px" }} />
            </>
          }
          description="Project Proposals within the DAO"
        />
      );

    default:
      return null;
  }
};
function AllDiscussions({ modal, setOpenlogin, username }) {
  console.log("setOpen", modal);
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
              <StartDiscussionButton
                setOpenlogin={setOpenlogin}
                username={username}
              />
              <Box sx={{ mt: 2, width: "100%" }}>
                {sidebardata?.map(({ text, link, Icon }, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        cursor: "pointer",
                        py: 1,
                      }}
                    >
                      <NavLink
                        to={link}
                        style={{ textDecoration: "none", fontSize: "16px" }}
                        className={({ isActive }) =>
                          isActive ? "active" : "inactive"
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          {Icon}
                          {text}
                        </Box>
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
