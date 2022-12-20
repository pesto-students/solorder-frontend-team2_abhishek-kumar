import * as React from "react";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import { Button, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Details from "./Details";
import UploadImage from "./UploadImage";
import MenuCard from "../menuCard";
import SetupMenu from "./SetupMenu";
import SelectPlan from "./SelectPlan";

const StepDetails = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "projPrimary.main", mt: 1, p: 2 }}>
      <Stack spacing={1}>
        <Typography gutterBottom variant="h6" component="span" fontWeight={800} display={"flex"} alignItems={'center'}><RestaurantIcon sx={{ mr: 1.5 }} />Restaurant Details</Typography>
        {/* <Details /> */}
        {/* <UploadImage /> */}
        <MenuCard />
        {/* <SetupMenu /> */}
        {/* <SelectPlan /> */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" startIcon={<ArrowBackIosNewIcon />}>
            Previous
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default StepDetails