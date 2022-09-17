import * as React from "react";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import useMediaQuery from '@mui/material/useMediaQuery';
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { Link } from "react-router-dom";
const discussion = [
  {
    icons: <CloudOffIcon />,
    maintext: "General",
    subtext:
      " For topics that do not belong to any other particular topics,please post them here",
  },
  {
    icons: <ContactEmergencyIcon />,
    maintext: "Proposal",
    subtext: "OIP-94B Inverse Bond Framework Approval",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Support",
    subtext: "How do I get any help on here?",
    color:"white"
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Knowledge Base",
    subtext:
      "https://www.facebook.com/Juan-Rivera-Keto-Gummies-106696188817590",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Community Development",
    subtext:
      "All non-educational community proposals and community engagement ideas can be posted here",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Feedback",
    subtext:
      "Provide feedback about the protocol, the community and the team here",
  },
  {
    icons: <CloudOffIcon />,
    maintext: "Project Proposal",
    subtext: "Project Proposals within the DAO",
  },
];
export default function Home() {
    const matches = useMediaQuery('(max-width:750px)');

  return (
    <Box sx={{ width: "100%"  }}>
      <Container maxWidth="lg" sx={{ mt:{md:4,xs:0} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            display:{md:'block',xs:'none'}
          }}
        >
          <Button
            sx={{
              height: "36px",
              fontSize: "10px",
              fontWeight: 700,
              padding: "8px 35px 8px 35px",
              backgroundColor: "primary.main",
              color: "text.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            Start a Discussion
          </Button>
          <Button
            startIcon={<CloudOffIcon />}
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "text.main",
              },
            }}
          >
           <Link to="/AllDiscussions" style={{textDecoration:'none'}}>All Discussions</Link> 
          </Button>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt:{md:4,xs:0.1} }}>
        <Grid container>
          {discussion?.map((items, index) => {
            return (
              <Grid
                item
                md={4}
                xs={12}
                sx={{
                    mt:{md:0,xs:1},
                  height: "200px",
                  backgroundColor:
                    index == 0 ? "primary.main" :  index==2 ?"text.main":"primary.lightmain",
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
                    <Box  sx={{ color:  index==2 ?"primary.main":"text.main",mt:0.5 }}>{items.icons}</Box> 
                    <Typography
                      sx={{
                        ml: 1,
                        fontSize: "18px",
                        fontWeight: 700,
                        color:  index==2 ?"primary.main":"text.main",
                    
                      }}
                    >
                    {items.maintext}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontSize: "12px",  color:  index==2 ?"primary.main":"text.lightcolor" }}
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
