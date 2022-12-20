import React from 'react'
import Paper from '@mui/material/Paper';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { numToAmount } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const paperSx = {
  padding: 2,
  margin: 0.5,
  display: "flex",
  alignItems: 'center',
  justifyContent: 'space-between',
}

const Item = (props) => {

  const [count, setCount] = React.useState(0)

  function AddBtn(props) {
    return (
      <>
        {count ? <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", bgcolor: "#2e7d32", width: "min-content", boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)", borderRadius: 1, alignSelf: "flex-end" }}>
          <IconButton bgcolor="#2e7d32" aria-label="add an alarm" onClick={() => setCount(count - 1)}>
            <RemoveIcon color="projPrimary" fontSize='small' />
          </IconButton>
          <Typography color="white" bgcolor="#2e7d32" >{count}</Typography>
          <IconButton bgcolor="#2e7d32" aria-label="add an alarm" onClick={() => setCount(count + 1)}>
            <AddIcon color="projPrimary" fontSize='small' />
          </IconButton>
        </Box>
          :
          <Button variant="contained" color="success" {...props} onClick={() => setCount(count + 1)}>
            Add
          </Button>}
      </>
    )
  }

  return (
    <Paper elevation={3} sx={paperSx} >
      <Stack direction={"column"} flexBasis="90%">
        <Stack direction={{ xl: "row", lg: "row", md: "row", sm: "row", xs: "column" }} alignItems={{ xl: "center", lg: "center", md: "center", sm: "center", xs: "flex-start" }} justifyContent="start">
          <Box marginRight={2} ><img src="/image/veg-icon.svg" alt="veg-icon" height={"25px"} /></Box>
          <Typography flex={2}>Arabian Grape Juice</Typography>
          <Typography flex={2}>{numToAmount(75)}</Typography>
        </Stack>
        <Typography marginLeft={{ xl: "4%", lg: "4%", md: "4%", sm: "4%", xs: "0px" }} color="projDark.darker" fontSize="0.7rem">sdgfndjl kgjldjkfgl ;dfjklgh jkl;dfghjkl dfhg jkldf gh jkldfhgjkd hklgbdfdfh jhdf ghd dfjg</Typography>
      </Stack>
      <Box>
        {props.parent === 'menu' ?
          <AddBtn />
          :
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>}
      </Box>
    </Paper>
  )
}

export default Item;