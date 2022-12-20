import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuCard from '../menuCard';

const SetupMenu = () => {
  return (
    <Stack spacing={2} alignItems="center" >
      <Button variant="outlined" endIcon={<AddCircleOutlineIcon />} sx={{
        width: "180px", color: "projDark.darker", borderColor: "projDark.darker", '&:hover': {
          color: "projDark.darker", borderColor: "projDark.darker"
        }
      }}>
        Add Category
      </Button>
      <MenuCard />
    </Stack>
  )
}

export default SetupMenu;