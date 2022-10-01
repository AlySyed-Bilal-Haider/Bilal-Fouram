import React from "react";
import { AppBar, Box, styled, Checkbox, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { GoCheck } from "react-icons/go";

const LinearProgressBox = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  width: 280,
  marginTop: 15,
  border: `2px solid ${theme.palette.secondary.light}`,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "transparent",
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


function Poll({polldetails,user_id}) {
  return ( <>
    {polldetails?.visibility==true ? (
      <Box>
      <Typography
        variant="body1"
        fontSize="25px"
        fontWeight="700"
        color="primary.main"
      >
        Poll
      </Typography>

      <Typography mt={2} variant="body1" fontSize="14px" color="primary.light">
        {polldetails?.question}
      </Typography>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",px:2}}>
      {polldetails?.answers.map(({title,_id},i)=>{
        return <>
           <Typography 
           key={i}
        mt={3}
        variant="body1"
        fontSize="16px"
        fontWeight="700"
        color="primary.main"
      >
       {title}
      </Typography>
        </>
      })}
      </Box>
    

      <Box
        mt={1}
        px={2}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: "center", md: "space-between" }}
        flexWrap="wrap"
      >
        <Box>
          <LinearProgressBox variant="determinate" value={5} />
          <Typography
            mt={-4.6}
            variant="subtitle1"
            display="flex"
            alignItems="center"
          >
            <BpCheckbox />
            Do not approve
          </Typography>
        </Box>

        <Box>
          <LinearProgressBox variant="determinate" value={70} />
          <Typography
            mt={-4.6}
            variant="subtitle1"
            display="flex"
            alignItems="center"
          >
            <BpCheckbox />
            Approve
          </Typography>
        </Box>
      </Box>

      <Typography
        px={2}
        mt={2}
        fontSize="12px"
        variant="subtitle1"
        color="primary.light"
      >
        Poll ends in 11 hours.
      </Typography>
    </Box>
    ):(
    null
    )}
    </>
   
  );
}

export default Poll;
