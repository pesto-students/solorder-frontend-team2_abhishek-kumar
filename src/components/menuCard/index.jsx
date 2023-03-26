import { Box } from '@mui/material';
import React from 'react'
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import Category from './Category';

const MenuCard = (props) => {
  const { menuList } = restaurantStore(s => s)
  return (
    <Box minHeight={props.parent === 'menu' ? "64vh" : "55.3vh"} marginTop={props.parent === 'menu' ? "10px" : "0px"} width="100%">
      {menuList && menuList.length ? menuList.map((category) => (<Category {...props} categoryDetail={category} />)) : ""}
    </Box>
  )
}

export default MenuCard;