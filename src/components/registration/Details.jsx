import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import registrationStore from '../../zustang/restaurant/registrationStore';
import AddressAndDelivery from '../addressAndDelivery';
import { convertOnlyNumber, numToAmount } from '../../utils';
import locationStore from '../../zustang/location/locationStore';
import commonStore from '../../zustang/common/commonStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';

const Details = ({ error, setError, isDasboard, getSetRegistrationData, restaurant_id }) => {
  var { registrationData, setRestaurantData } = registrationStore(s => s)
  var { resetData, recentAddress, handleAddressModel } = locationStore(s => s)
  var { saveRestaurant } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  registrationData = registrationData ? registrationData : {};
  var { name, costForTwo, deliveryRange, deliveryTime, address, state, city, pincode, latitude, longitude, cuisines } = registrationData

  const handleInput = (name) => (e) => {
    let { target: { value } } = e
    if (["costForTwo", 'deliveryRange', "deliveryTime"].includes(name))
      value = convertOnlyNumber(value)
    setRestaurantData({ [name]: value })
    setError({})
  }

  const onUpdate = () => {
    var cuisinesArr = []
    if (cuisines) cuisines.trim().split(",").forEach((cui) => { if (cui.trim()) cuisinesArr.push(cui.trim()) });
    let data = {
      name: name,
      address: address,
      state: state,
      city: city,
      pincode: Number(pincode),
      latitude: Number(latitude),
      longitude: Number(longitude),
      deliveryRange: Number(deliveryRange),
      deliveryTime: Number(deliveryTime),
      costForTwo: Number(costForTwo),
      cuisines: cuisinesArr,
      stepCompleted: 1,
    }
    let error = {}
    if (!name)
      error['name'] = true

    if (!address)
      error['address'] = true

    if (!state)
      error['address'] = true

    if (!city)
      error['address'] = true

    if (!pincode)
      error['address'] = true

    if (!latitude)
      error['address'] = true

    if (!longitude)
      error['address'] = true

    if (!deliveryRange)
      error['deliveryRange'] = true

    if (!deliveryTime)
      error['deliveryTime'] = true

    if (!costForTwo)
      error['costForTwo'] = true

    if (!cuisines)
      error['cuisines'] = true

    if (Object.keys(error).length) {
      setError(error)
    } else {
      isLoader(true)
      saveRestaurant({
        restaurant_id, data, cb: (response) => {
          if (response.error) {
            notify(response.msg, 'error')
            isLoader(false)
          } else {
            notify(response.msg, 'success')
            getSetRegistrationData()
          }
        }
      })
    }
  }

  useEffect(() => {
    if (recentAddress && Object.keys(recentAddress).length) {
      let {
        address,
        city,
        state,
        pincode,
        lat,
        lng
      } = recentAddress
      setRestaurantData({ address, state, city, pincode, latitude: lat, longitude: lng })
      setError({})
    }
  }, [recentAddress])

  return (
    <Grid container rowGap={2} m="auto" width="100%" p={isDasboard ? 5 : ""}>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center">
        <TextField
          id="outlined-basic1"
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleInput("name")}
          error={error?.name ? true : false}
          helperText={error?.name ? "Name is required." : " "}
          color="projDark"
          required
          sx={{ width: "95%" }}
        />
      </Grid>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center">
        <TextField
          id="outlined-basic1"
          label="Cost For Two"
          variant="outlined"
          value={numToAmount(costForTwo)}
          onChange={handleInput("costForTwo")}
          error={error?.costForTwo ? true : false}
          helperText={error?.costForTwo ? "Cost For Two is required." : " "}
          color="projDark"
          required
          sx={{ width: "95%" }}
        />
      </Grid>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center" height="max-content" sx={{ height: "auto" }}>
        <TextField
          id="outlined-start-adornment"
          InputProps={{
            endAdornment: <InputAdornment position="end">km</InputAdornment>,
          }}
          label="Delivery Range"
          variant="outlined"
          value={deliveryRange}
          onChange={handleInput("deliveryRange")}
          error={error?.deliveryRange ? true : false}
          helperText={error?.deliveryRange ? "Delivery Range is required." : " "}
          color="projDark"
          required
          sx={{ width: "95%" }}
        />
      </Grid>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center" height="max-content" sx={{ height: "auto" }}>
        <TextField
          id="outlined-start-adornment"
          InputProps={{
            endAdornment: <InputAdornment position="end">Mins</InputAdornment>,
          }}
          label="Delivery Time"
          variant="outlined"
          value={deliveryTime}
          onChange={handleInput("deliveryTime")}
          error={error?.deliveryTime ? true : false}
          helperText={error?.deliveryTime ? "Delivery Time is required." : " "}
          color="projDark"
          required
          sx={{ width: "95%" }}
        />
      </Grid>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center" height="max-content" sx={{ height: "auto" }}>
        <TextField
          id="outlined-basic1"
          label="Cuisines"
          variant="outlined"
          value={cuisines}
          onChange={handleInput("cuisines")}
          error={error?.cuisines ? true : false}
          helperText={error?.cuisines ? "Cuisines is required." : "Write cuisine separeted by comma(,)."}
          color="projDark"
          required
          sx={{ width: "95%" }}
        />
      </Grid>
      <Grid xl={6} md={6} sm={12} xs={12} display="flex" justifyContent="center" sx={{ height: "auto" }}>
        {/* <AddressAndDelivery AddAddress /> */}
      </Grid>
      <Grid xl={12} md={12} sm={12} xs={12} display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: "auto" }}>
        {address && state && city && pincode && latitude && longitude ?
          <AddressAndDelivery addressData={{ address, state, city, pincode, latitude, longitude }} onEdit={() => { resetData(); handleAddressModel(true) }} />
          :
          <AddressAndDelivery AddAddress onAdd={() => { resetData(); handleAddressModel(true) }} />}
        <Typography sx={{ visibility: error?.address ? "visible" : "hidden", }} color="error">Address is required.</Typography>
      </Grid>
      <Grid xl={12} md={12} sm={12} xs={12} display={isDasboard ? "flex" : "none"} flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: "auto" }}>
        <Button variant="contained" color='success' size='large' onClick={onUpdate}>Save</Button>
      </Grid>
    </Grid>
  );
}

export default Details;
