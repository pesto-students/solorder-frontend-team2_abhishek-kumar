import React, { useEffect, useState } from 'react'
import AddressAndDelivery from '../addressAndDelivery';
import Grid from '@mui/material/Grid';
import settingStore from '../../zustang/setting/settingStore';
import commonStore from '../../zustang/common/commonStore';
import locationStore from '../../zustang/location/locationStore';
var timerVar = null;

const Addresses = (props) => {
  const { addressList, getAddresseData, saveAddresseData, updateAddress, deleteAddress } = settingStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { resetData, recentAddress, handleAddressModel, addressModel } = locationStore(s => s)
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
    if (recentAddress && Object.keys(recentAddress).length && !timerVar) {

      timerVar = setTimeout(()=>{
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
              timerVar=null
              resetData()
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
              timerVar=null
              isLoader(false)
              resetData()
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
      },1)

    }
  }, [recentAddress])

  const onAddressDelete = (address_id) => {
    console.log("address_id:",address_id)
    if (address_id) {
      isLoader(true)
      deleteAddress({
        address_id, cb: (res) => {
          isLoader(false)
          if (res.error) {
            notify(res.msg, "error")
          } else {
            getData()
            notify(res.msg, "success")
          }
        }
      })
    }
  }

  return (
    <Grid container spacing={2} p={2}>
      {addressList?.length && addressList.map((address, idx) => (
        <Grid item md={4} sm={6} xs={12} display="flex" justifyContent="center" alignItems="center">
          <AddressAndDelivery addressData={{ ...address, idx: idx }} onEdit={() => { setEditAddressId(address?.address_id); handleAddressModel(true); }} onDelete={(address_id)=>{onAddressDelete(address_id)}}/>
        </Grid>
      ))}
      <Grid item md={4} sm={6} xs={12} display="flex" justifyContent="center" alignItems="center">
        <AddressAndDelivery AddAddress onAdd={() => { resetData(); handleAddressModel(true); }} />
      </Grid>
    </Grid>
  )
}

export default Addresses;