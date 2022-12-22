import React from 'react'
import { Box, Button, Divider, Paper } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';

const ActiveOrderCard = () => {

  const MenuButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.projSecondary.main),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    width: "98%",
    borderRadius: "5px",
    backgroundColor: theme.palette.projSecondary.main,
    display: "block",
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.projSecondary.darker),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
      width: "98%",
      borderRadius: "5px",
      backgroundColor: theme.palette.projSecondary.darker,
      display: "block",
    },
  }));

  return (
    <Paper elevation={3}>
      <Typography textAlign={"center"} fontWeight={600} p={0.5}>Ticket 1</Typography>
      <Divider />
      <Box p={"10px 20px"}>
        <Stack direction="row" mt={1}><Typography fontWeight={500} pr={1}>Order Id:</Typography><Typography>232</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Name:</Typography><Typography>John Carter</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Address:</Typography><Typography>Electronic City, Bengaluru, Karnataka 560100, India.</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Total Items:</Typography><Typography>4</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Delivery Person:</Typography><Typography fontWeight={500} color="red">Not Assigned</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Status:</Typography><Typography fontWeight={500} color="red">Not-Accepted</Typography></Stack>
        <MenuButton>Update Status</MenuButton>
      </Box>
    </Paper>
  )
}

export default ActiveOrderCard;