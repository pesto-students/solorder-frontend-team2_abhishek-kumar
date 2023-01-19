import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import settingStore from '../../zustang/setting/settingStore';
import signInUpStore from '../../zustang/auth/signInUpStore';
import cartStore from '../../zustang/menucheckout/cartStore';

export default function AddressAutoComplete() {
  let { addressList } = settingStore(s => s);
  var { cartAddressData, setAddressData } = cartStore(s => s)

  const formatAddress = (adres) => {
    return adres && `${adres?.address || ""}, ${adres?.city || ""}, ${adres?.state || ""} ${adres?.pincode || ""}` || ""
  }

  function onselect(e) {
    if (e?.target?.value || e?.target?.value == 0) {
      let adres = addressList.find((v) => (v?.address_id === Number(e.target.value)))
      setAddressData({ ...adres })
    }
  }

  return React.useMemo(()=>(
    <>
      <FormControl sx={{ width: "48%" }} size="small" color="projDark">
        <InputLabel id="demo-simple-select-label">Your Delivery Address</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cartAddressData?.address_id || 0}
          label="Your Delivery Address"
          onChange={onselect}
        >
          {addressList && addressList.length ? addressList.map((adres) => <MenuItem value={adres?.address_id || ""}>{formatAddress(adres)}</MenuItem>) : <></>}
        </Select>
      </FormControl>
    </>
  ));
}
