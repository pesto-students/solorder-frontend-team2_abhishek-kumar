import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { numToAmount } from '../../utils';
import Item from '../menuCard/Item';
import "./style.css"

const RightSide = (props) => {
  let { restDetails, cartItems } = props
  let defaultImage = restDetails?.galaryImgs?.length ? restDetails.galaryImgs.find((resDetail) => (resDetail?.isDefaultImg)) : null;

  const [itemTotal, setItemTotal] = React.useState(0)
  const [deliveryFee, setDeliveryFee] = React.useState(25)

  React.useEffect(() => {
    if (cartItems && Object.values(cartItems).length) {
      let total = 0
      Object.values(cartItems).forEach((item) => {
        if (item?.itemData?.price && item?.itemCount)
          total = total + (item.itemData.price * item.itemCount)
      })
      setItemTotal(total)
    }
  }, [cartItems])

  return (
    <Paper elevation={3} sx={{ width: { md: "30%", sm: "100%" }, ml: { md: 1, sm: 0 }, mt: 1, height: "min-content" }}>
      <Stack direction={"row"} alignItems="center" p="5px 0px 5px 5px" >
        <img
          style={{ height: 100, paddingRight: 15 }}
          src={defaultImage?.url || ""}
          alt={defaultImage?.originalFilename || ""}
        />
        <Box>
          <Typography gutterBottom variant="h5" component="div" fontWeight={800} fontSize={"1em"}>
            {restDetails?.name || ""}
          </Typography>
          <Typography variant="p" component="div" color="text.secondary" fontWeight={600} fontSize={"0.7em"}>
            {restDetails?.cuisines?.length && restDetails.cuisines.join(", ") || ""}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Stack className='MenuCard' sx={{
        mt: 0.5,
        mb: 0.5,
        maxHeight: "80vh",
        overflowY: "auto"
      }}>
        {cartItems && Object.values(cartItems).length ? Object.values(cartItems).map((itemDetails) => (<Item parent="checkout" itemDetails={itemDetails?.itemData || {}} {...props} />)) : ""}
      </Stack>
      <Divider />
      <Stack direction="column" p={1}>
        <Typography gutterBottom variant="h5" component="div" fontWeight={800} fontSize={"1em"}>
          Bill Details
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            Item Total
          </Typography>
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            {itemTotal ? numToAmount(itemTotal) : "₹0"}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" pt={0.5}>
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            Delivery Fee
          </Typography>
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            {deliveryFee ? numToAmount(deliveryFee) : "₹0"}
          </Typography>
        </Stack>
        {/* <Stack direction="row" justifyContent="space-between" pt={0.5}>
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            Delivery Fee
          </Typography>
          <Typography variant="p" component="div" fontWeight={400} fontSize={"1em"}>
            ₹25
          </Typography>
        </Stack> */}
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" p="3px 7px 7px 7px">
        <Typography variant="h5" component="div" fontWeight={800} fontSize={"1em"}>
          Item Total
        </Typography>
        <Typography variant="h5" component="div" fontWeight={800} fontSize={"1em"}>
          {deliveryFee && itemTotal ? numToAmount(deliveryFee + itemTotal) : "₹0"}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default RightSide;