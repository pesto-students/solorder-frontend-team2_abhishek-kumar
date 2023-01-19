import { Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MapComp from '../map/MapComp';
import locationStore from '../../zustang/location/locationStore';
import commonStore from '../../zustang/common/commonStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: "60%", sm: "95%", xs: "95%" },
  bgcolor: 'projPrimary.main',
  padding: "7px 0px 20px 10px",
  maxHeight: "100vh",
  overflowY: "auto"
};


const AddressModal = () => {
  const [cityList, setCityList] = useState([])
  const [error, setError] = useState({})
  const [selectCity, setSelectCity] = useState(null)
  const {
    address,
    city,
    state,
    pincode,
    lat,
    lng,
    addressModel,
    resetData,
    setData,
    getPinCodeList,
    handleAddressModel,
    setRecentAddress
  } = locationStore(s => s)
  const { isLoader, notify } = commonStore(s => s)

  const handleZipcode = (e) => {
    let { target: { value } } = e
    setError({})
    value = value.replace(/\D/g, '')
    if (value.length <= 6) {
      setSelectCity(null)
      setCityList([])
      setData({
        pincode: value,
        state: "",
        city: "",
        lat: "",
        lng: "",
      })
      if (value.length === 6) {
        isLoader(true)
        getPinCodeList({
          pincode: value, cb: (res) => {
            isLoader(false)
            let { error, msg, data } = res
            if (!error && data && data.length) {
              let pinData = data[0]
              setData({
                pincode: pinData?.postal_code,
                state: pinData?.state,
              })
              setCityList([...data])
            } else {
              setSelectCity(null)
              setCityList([])
              setData({
                pincode: value,
                state: "",
                city: "",
                lat: "",
                lng: "",
              })
              notify(msg, 'error')
            }
          }
        })
      }
    } else {
      //
    }
  }

  const handleCity = (e) => {
    let { target: { value } } = e
    setError({})
    setSelectCity(value)
    let CityData = cityList[Number(value) - 1]
    setData({
      city: `${CityData?.city + ", " || ""}${CityData?.province}`,
      lat: CityData?.latitude || "",
      lng: CityData?.longitude || "",
    })
  }

  const handleAddress = (e) => {
    let { target: { value } } = e
    setError({})
    setData({
      address: value
    })
  }

  const onUpdate = () => {
    let error = {}

    if (!address)
      error['address'] = true
    if (!city)
      error['city'] = true
    if (!pincode)
      error['pincode'] = true

    if (Object.keys(error).length) {
      setError(error)
    } else {
      let obj = {
        address,
        city,
        state,
        pincode,
        lat,
        lng
      }
      resetData()
      setSelectCity(null)
      setRecentAddress(obj)
    }
  }

  const onClose = () => {
    resetData()
    setSelectCity(null)
    setError({})
  }

  return (
    <Modal
      open={addressModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent="end"><IconButton onClick={(e) => onClose()}><CloseIcon color='projDark' /></IconButton>
        </Box>
        <Typography variant='h5' component="div" fontWeight={500} mt="-20px" ml={2.5}>Address</Typography>
        <Grid container rowGap={2} mt={1}>
          <Grid md={6} sm={12} xs={12} display="flex" justifyContent="center" >
            <TextField
              id="outlined-basic1"
              label="Address"
              variant="outlined"
              error={error?.address || false}
              helperText={error?.address ? "Address is required." : " "}
              value={address}
              color="projDark"
              sx={{ width: "90%" }}
              onChange={handleAddress}
              required
            />
          </Grid>
          <Grid md={6} sm={12} xs={12} display="flex" justifyContent="center" >
            <FormControl sx={{ width: "90%" }} error={error?.city || false}>
              <InputLabel id="demo-simple-select-helper-label" color="projDark">City</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectCity || ""}
                label="City"
                onChange={handleCity}
                color="projDark"
              >
                <MenuItem value="">
                  {cityList && cityList.length ? <em>None</em> : <em>Enter Pincode First.</em>}
                </MenuItem>
                {cityList?.length ? cityList.map((list, idx) => (<MenuItem value={idx + 1}>{`${(list?.city ? list.city + ", " : null) || ""}${list?.province || ""}`}</MenuItem>)) : ""}
              </Select>
              <FormHelperText id="demo-simple-select-helper" >{error?.city ? "City is required." : " "}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid md={6} sm={12} xs={12} display="flex" justifyContent="center" >
            <TextField
              id="outlined-basic1"
              label="State"
              variant="outlined"
              error={false}
              helperText={" "}
              value={state}
              disabled={state ? false : true}
              color="projDark"
              sx={{ width: "90%" }}
              required
            />
          </Grid>
          <Grid md={6} sm={12} xs={12} display="flex" justifyContent="center" >
            <TextField
              id="outlined-basic1"
              label="Pincode"
              variant="outlined"
              error={error?.pincode || false}
              helperText={error?.pincode ? "Pincode is required." : " "}
              color="projDark"
              sx={{ width: "90%" }}
              onChange={handleZipcode}
              value={pincode}
              required
            />
          </Grid>
          <Grid md={12} sm={12} xs={12} display="flex" justifyContent="center" alignItems="center" >
            <MapComp Addlat={lat} Addlng={lng} setData={setData} />
          </Grid>
          <Grid md={12} sm={12} xs={12} display="flex" justifyContent="center" alignItems="center" >
            <Button variant="contained" color='success' onClick={onUpdate} >Update</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal >
  )
}

export default AddressModal