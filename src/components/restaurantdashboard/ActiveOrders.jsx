import React, { useEffect } from 'react'
import ActiveOrderCard from './ActiveOrderCard'
import { Grid } from '@mui/material'
import dashboardStore from '../../zustang/restaurant/dashboardStore'
import commonStore from '../../zustang/common/commonStore'

const ActiveOrders = ({viewOnly}) => {
  let { activeOrdersList, getActiveOrders } = dashboardStore(s => s)
  const { isLoader, notify } = commonStore(s => s)
  useEffect(() => {
    isLoader(true)
    getActiveOrders({
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }, [])
  return (
    <Grid container spacing={2} p={2}>
      {activeOrdersList && activeOrdersList.length ? activeOrdersList.map((orderData) => (
        <Grid item md={4} sm={6} xs={12}>
          <ActiveOrderCard orderData={orderData} viewOnly={viewOnly ? true : false} />
        </Grid>
      )) : ""}
    </Grid>
  )
}

export default ActiveOrders;