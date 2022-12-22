import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

let paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: 1,
  minWidth: '200px',
  borderRadius: 2
}

const AddressAndDelivery = (props) => {
  return (
    <>
      {props.delivery ?
        <Paper variant="outlined" sx={paperStyle}>
          <Typography gutterBottom variant="h6" component="span" fontWeight={800}>Ran Naidi</Typography>
          <Typography gutterBottom variant="p" color="projDark.darker">Vehicle: Hero Mestro OR 01D 1123</Typography>
          {/* <Button variant="contained" color="success" sx={{ width: "min-content", alignSelf:"flex-end" }} >Edit</Button> */}
          <Button variant="contained" color="success" sx={{ width: "min-content", margin: "5px 0px 2px 0px" }} >Edit</Button>
        </Paper>
        :
        <Paper variant="outlined" sx={paperStyle}>
          <Typography gutterBottom variant="h6" component="span" fontWeight={800}>Address 1</Typography>
          <Typography gutterBottom variant="p" color="projDark.darker">hg hg hvhj vhjvb ghvjhv jhvhvbmbghkv kvj k jhhj</Typography>
          {/* <Button variant="contained" color="success" sx={{ width: "min-content", alignSelf:"flex-end" }} >Edit</Button> */}
          <Button variant="contained" color="success" sx={{ width: "min-content", margin: "5px 0px 2px 0px" }} >Edit</Button>
        </Paper>}
    </>
  )
}

export default AddressAndDelivery;