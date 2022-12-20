import { Box } from '@mui/material';
import React from 'react'
import Category from './Category';

const MenuCard = (props) => {
  return (
    <Box minHeight={props.parent === 'menu' ? "64vh" : "55.3vh"} marginTop={props.parent === 'menu' ? "10px" : "0px"} width="100%">
      <Category {...props} />
      <Category {...props} />
      <Category {...props} />
      <Category {...props} />
    </Box>
  )
}

export default MenuCard;