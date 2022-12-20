import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const SelectPlan = () => {
  return (
    <Stack spacing={2} minHeight="60vh" justifyContent="space-around" alignItems="center" direction={{ xl: "row", lg: "row", md: "row", sm: "row", xs: "column" }}>
      <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5" }}>
        <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Free Plan</Typography>
        <Box>
          <ul style={{ margin: "30px" }} >
            <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
            <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
            <li><Typography variant="span" component="span">Valid for 15 days</Typography></li>
            <li><Typography variant="span" component="span">Cost ₹0</Typography></li>
          </ul>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" >Select</Button></Box>
      </Paper>
      <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5" }}>
        <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Free Plan</Typography>
        <Box>
          <ul style={{ margin: "30px" }} >
            <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
            <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
            <li><Typography variant="span" component="span">Valid for 15 days</Typography></li>
            <li><Typography variant="span" component="span">Cost ₹0</Typography></li>
          </ul>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" >Select</Button></Box>
      </Paper>
      <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5" }}>
        <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Free Plan</Typography>
        <Box>
          <ul style={{ margin: "30px" }} >
            <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
            <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
            <li><Typography variant="span" component="span">Valid for 15 days</Typography></li>
            <li><Typography variant="span" component="span">Cost ₹0</Typography></li>
          </ul>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" >Select</Button></Box>
      </Paper>
    </Stack >
  )
}

export default SelectPlan;