import React, { useEffect } from 'react'
import { Stack } from '@mui/material';
import LeftSide from '../../components/checkout/LeftSide';
import RightSide from '../../components/checkout/RightSide';
import cartStore from '../../zustang/menucheckout/cartStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';

const Checkout = () => {

  const {
    cartItems,
    cartRestaurantId,
    cartUserId,
    addItemToCart,
    resetItemToCart
  } = cartStore(s => s)

  var { restDetails, getRestaurantDetails } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)

  useEffect(() => {
    if (cartRestaurantId) {
      isLoader(true)
      getRestaurantDetails({
        restaurant_id: cartRestaurantId, cb: (res) => {
          isLoader(false)
          if (res.error)
            notify(res.msg, "error")
        }
      })
    }
  }, [])

  return (
    <Stack direction={{ md: "row-reverse", sm: "column", xs: "column" }} minHeight="90vh"><RightSide restDetails={restDetails} cartItems={cartItems} restaurant_id={cartRestaurantId} /><LeftSide /></Stack>
  )
}

export default Checkout;