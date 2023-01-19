import React from 'react'
import { Box, Button, Divider, Paper } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import config from '../../common/config';
import { numToAmount } from '../../utils';
import dashboardStore from '../../zustang/restaurant/dashboardStore';

const ActiveOrderCard = ({ orderData, viewOnly }) => {
  let orderList = config.ORDER_STATUS_LIST ? JSON.parse(String(config.ORDER_STATUS_LIST)) : [];
  const { handleActiveModel } = dashboardStore(s => s)
  let { order_id, user, orderAddress, items, deliveryPerson, orderStatus_Id, totalCost } = orderData;
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
      <Typography textAlign={"center"} fontWeight={600} p={0.5}>Ticket {order_id || ""}</Typography>
      <Divider />
      <Box p={"10px 10px"}>
        <Stack direction="row" mt={1}><Typography fontWeight={500} pr={1}>Order Id:</Typography><Typography>{order_id || ""}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Name:</Typography><Typography>{user?.name || ""}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Address:</Typography><Typography>{`${orderAddress?.address || ""}, ${orderAddress?.city || ""}, ${orderAddress?.state || ""} ${orderAddress?.pincode || ""}`}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Total&nbsp;Items:</Typography><Typography>{items && items.length || ""}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Total&nbsp;Cost&nbsp;(Including all charges):</Typography><Typography>{totalCost && numToAmount(totalCost) || ""}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Delivery&nbsp;Person:</Typography><Typography color="red">{deliveryPerson ? `${deliveryPerson?.name || ""} (${deliveryPerson?.phoneNo || ""})` : "Not Assigned"}</Typography></Stack>
        <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Status:</Typography><Typography fontWeight={500} color="red">{orderStatus_Id && orderList[Number(orderStatus_Id) - 1] ? orderList[Number(orderStatus_Id) - 1].value : ""}</Typography></Stack>
        <MenuButton onClick={(e) => (handleActiveModel(true, order_id, viewOnly))}>{viewOnly ? "View Details" : "Update Order"}</MenuButton>
      </Box>
    </Paper>
  )
}

export default ActiveOrderCard;