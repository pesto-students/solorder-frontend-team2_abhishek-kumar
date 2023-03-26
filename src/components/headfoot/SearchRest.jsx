import { TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import commonStore from '../../zustang/common/commonStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import cartStore from '../../zustang/menucheckout/cartStore';

const SearchRest = () => {
  const { isLoader, notify } = commonStore(s => s)
  const { getRestaurantList, filterType, searchValue, setSearchValue } = restaurantStore(s => s)
  var { cartAddressData } = cartStore(s => s)

  const fetchRestaurantList = () => {
    let data = {
      "filterType": filterType && (Number(filterType) + 1) || 1,
      "pincode": cartAddressData?.pincode || null,
      "searchKey": searchValue || ""
    }
    isLoader(true)
    getRestaurantList({
      data,
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }

  const onSearch = (e) => {
    e?.preventDefault();
    fetchRestaurantList()
  }

  return (
    <form onSubmit={onSearch} style={{ width: "48%" }}>
      <TextField
        id="outlined-start-adornment"
        InputProps={{
          endAdornment: <SearchIcon sx={{ cursor: "pointer" }} onClick={onSearch} />
        }}
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        // error={error?.deliveryTime ? true : false}
        // helperText={error?.deliveryTime ? "Delivery Time is required." : " "}
        color="projDark"
        size="small"
        sx={{ width: "100%" }}
      />
    </form>
  )
}

export default SearchRest