import React,{useEffect} from "react";
import axios from "axios";
import Moment from 'moment';
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import UndoIcon from "@mui/icons-material/Undo";

function Commonpage(props) {
  const url = "http://localhost:4000";
  const [alldetailsstate, setDetailsState] = React.useState([]);
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const { data } = await axios.get(`${url}/alldiscussion`);
        setDetailsState(data.allDiscussion);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdetails();
  }, []);

  console.log("alldetailsstate", alldetailsstate);
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
      {alldetailsstate?.map((items, i) => {
        return (
          <Box
            key={i}
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
                  fontSize: { md: "14px", xs: "12px" },
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
                      <strong> kschan</strong> {items.enddate? (items?.enddate.toString()):new Date()}
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
                    {props.title ? props.title : "All descussion"}
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
              {/* If you have any questions regarding how the protocol works and its
              various mechanisms, please head to the Olympus Discord, you are
              more likely to get immediate support there. ... */}
            </Typography>
          </Box>
        );
      })}
    </Grid>
  );
}

export default Commonpage;
