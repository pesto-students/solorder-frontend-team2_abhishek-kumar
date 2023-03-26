import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuCard from '../menuCard';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import registrationStore from '../../zustang/restaurant/registrationStore';
import signInUpStore from '../../zustang/auth/signInUpStore';

const SetupMenu = ({ isDasboard }) => {
  const { handleModel } = registrationStore(s => s)
  const { getMenuItems } = restaurantStore(s => s)
  const { userData } = signInUpStore(s => s)
  useEffect(() => {
    getMenuItems({restaurant_id:userData?.restaurant_id})
  }, [])

  return (
    <Stack spacing={2} alignItems="center" p={isDasboard ? 2 : ""}>
      <Button variant="outlined" endIcon={<AddCircleOutlineIcon />} sx={{
        width: "180px", color: "projDark.darker", borderColor: "projDark.darker", '&:hover': {
          color: "projDark.darker", borderColor: "projDark.darker"
        }
      }} onClick={() => { handleModel({ addEditModel: true, addCategory: true }) }}>
        Add Category
      </Button>
      <MenuCard />
    </Stack>
  )
}

export default SetupMenu;