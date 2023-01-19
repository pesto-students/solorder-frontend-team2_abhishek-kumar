import React, { useEffect, useState } from 'react'
import AddressAndDelivery from '../addressAndDelivery';
import Grid from '@mui/material/Grid';
import settingStore from '../../zustang/setting/settingStore';
import commonStore from '../../zustang/common/commonStore';
import locationStore from '../../zustang/location/locationStore';


const Addresses = (props) => {
  const { addressList, getAddresseData, saveAddresseData, updateAddress } = settingStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { resetData, recentAddress, handleAddressModel } = locationStore(s => s)
  const [editAddressId, setEditAddressId] = useState(null)

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    isLoader(true)
    getAddresseData({
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
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
      if (editAddressId) {
        isLoader(true)
        updateAddress({
          data: {
            address,
            city,
            state,
            pincode: pincode,
            latitude: lat,
            longitude: lng
          },
          address_id: editAddressId,
          cb: (res) => {
            isLoader(false)
            if (res.error)
              notify(res.msg, "error")
            else {
              getData()
              notify(res.msg, "success")
              setEditAddressId(null)
              handleAddressModel(false)
            }
          }
        })
      } else {
        isLoader(true)
        saveAddresseData({
          data: {
            address,
            city,
            state,
            pincode: pincode,
            latitude: lat,
            longitude: lng
          },
          // address_id: editAddressId,
          cb: (res) => {
            isLoader(false)
            if (res.error)
              notify(res.msg, "error")
            else {
              getData()
              notify(res.msg, "success")
              setEditAddressId(null)
              handleAddressModel(false)
            }
          }
        })
      }
      resetData()
    }
  }, [recentAddress])

  return (
    <Grid container spacing={2} p={2}>
      {addressList?.length && addressList.map((address, idx) => (
        <Grid item md={4} sm={6} xs={12} display="flex" justifyContent="center" alignItems="center">
          <AddressAndDelivery addressData={{ ...address, idx: idx }} onEdit={() => { setEditAddressId(address?.address_id); handleAddressModel(true); }} />
        </Grid>
      ))}
      <Grid item md={4} sm={6} xs={12} display="flex" justifyContent="center" alignItems="center">
        <AddressAndDelivery AddAddress onAdd={() => { resetData(); handleAddressModel(true); }} />
      </Grid>
    </Grid>
  )
}

export default Addresses;