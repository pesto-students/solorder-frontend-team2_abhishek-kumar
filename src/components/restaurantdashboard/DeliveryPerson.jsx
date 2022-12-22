import React from 'react'
import AddressAndDelivery from '../addressAndDelivery';
import Grid from '@mui/material/Grid';


const DeliveryPerson = (props) => {
  return (
    <Grid container spacing={2} p={2}>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery delivery />
      </Grid>
    </Grid>
  )
}

export default DeliveryPerson;