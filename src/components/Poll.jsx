import React, { useEffect } from "react";
import moment from "moment";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { GoCheck } from "react-icons/go";
import axios from "axios";
import { url } from "../utils";
import { Box, styled, Checkbox, Typography } from "@mui/material";
import Login from "./Login";
import { toast } from "react-toastify";
const LinearProgressBox = styled(LinearProgress)(({ theme }) => ({
  height: "100%",
  width: "100%",
  // border: `2px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.hover.primary,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
}));
const BpIcon = styled("span")({
  borderRadius: 3,
  border: "1px solid #282439",
  width: 18,
  height: 18,
  backgroundColor: "transparent",
});
const BpCheckbox = (props) => {
  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={
        <>
          <Box
            width="18px"
            height="18px"
            border="1px solid #282439"
            color="#282439"
            borderRadius="3px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <GoCheck size="14px" />
          </Box>
        </>
      }
      icon={<BpIcon />}
      {...props}
    />
  );
};

function Poll({ polldetails, user_id, checkedfunc }) {
  const [checkstatus, setCheckstate] = React.useState(false);
  const Mailverified = localStorage.getItem("verified");
  const userToken = localStorage.getItem("token");
  const [openstate, setOpenlogin] = React.useState(false);
  const pollApproveUnapprove = async (poll_id, answer_id, user_id) => {
    try {
      if (Mailverified) {
        if (userToken) {
          const pollvalue = { poll_id, answer_id, user_id };
          console.log("pollvalue", pollvalue);
          const { data } = await axios.post(`${url}/votepoll`, pollvalue);
          console.log("data", data);
          (await data.status) === "ok" && checkedfunc(true);
        } else {
          setOpenlogin(true);
        }
      } else {
        toast.error("Please first email verify !");
      }
    } catch (error) {
      console.log("Approve poll error !", error);
    }
  };
  function vote() {
    let len = polldetails?.answers?.length - 1;
    for (let i = 0; i <= len; i++) {
      let status = polldetails?.answers[i]?.vote?.includes(user_id);
      if (status) {
        setCheckstate(true);
        break;
      }
    }
  }

  useEffect(() => {
    vote();
  }, [polldetails]);

  return (
    <>
      {polldetails?.visibility == true ? (
        <Box>
          <Typography
            variant="body1"
            fontSize="25px"
            fontWeight="700"
            color="primary.main"
          >
            Poll
          </Typography>

          <Typography
            mt={2}
            variant="body1"
            fontSize="18px"
            color="primary.light"
          >
            {polldetails?.question}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
            }}
          ></Box>

          <Box
            mt={2}
            px={2}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "center", md: "space-between" }}
            flexWrap="wrap"
          >
            {polldetails?.answers?.map(({ title, _id }, i) => {
              return (
                <>
                  <Box
                    key={_id + i}
                    mt={{ md: 0, xs: 1.5 }}
                    height="39px"
                    width="270px"
                    position="relative"
                  >
                    <LinearProgressBox variant="determinate" value={5} />
                    <Typography
                      variant="subtitle1"
                      display="flex"
                      alignItems="center"
                      sx={{ position: "absolute", top: "2px" }}
                    >
                      {checkstatus == true ? (
                        <>
                          {polldetails?.answers[i]?.vote?.includes(user_id) ? (
                            <BpCheckbox
                              disabled
                              checked
                              onClick={() => {
                                pollApproveUnapprove(
                                  polldetails?._id,
                                  _id,
                                  user_id
                                );
                              }}
                            />
                          ) : (
                            <BpCheckbox
                              disabled
                              onClick={() => {
                                pollApproveUnapprove(
                                  polldetails?._id,
                                  _id,
                                  user_id
                                );
                              }}
                            />
                          )}
                        </>
                      ) : (
                        <BpCheckbox
                          onClick={() => {
                            {
                              userToken
                                ? pollApproveUnapprove(
                                    polldetails?._id,
                                    _id,
                                    user_id
                                  )
                                : setOpenlogin(true);
                            }
                          }}
                        />
                      )}

                      {title}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </Box>

          <Typography
            px={2}
            mt={2}
            fontSize="12px"
            variant="subtitle1"
            color="primary.light"
          >
            {moment(polldetails?.endDate).format("LL")}
          </Typography>
        </Box>
      ) : null}

      {openstate && <Login setOpenlogin={setOpenlogin} open={openstate} />}
    </>
  );
}

export default React.memo(Poll);
