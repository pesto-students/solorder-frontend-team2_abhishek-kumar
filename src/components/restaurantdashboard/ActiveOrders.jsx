import React from 'react'
import ActiveOrderCard from './ActiveOrderCard'
import { Grid } from '@mui/material'

const ActiveOrders = () => {
  return (
    <Grid container spacing={2} p={2}>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <ActiveOrderCard />
      </Grid>
    </Grid>
  )
}

export default ActiveOrders;