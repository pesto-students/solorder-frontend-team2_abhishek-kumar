import { Button, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

let paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: 1,
  maxWidth: "max-content",
  borderRadius: 2
}

let addAddressStyle = {
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 3,
  width: "100%",
  borderRadius: 2
}

const AddressAndDelivery = (props) => {
  let { viewOnly, delivery, AddAddress, onEdit, onAdd, addressData, onDelete, deliveryData, AddDeliveryPerson } = props
  return (
    <>
      {delivery ?
        <Paper variant="outlined" sx={paperStyle}>
          <Typography gutterBottom variant="h6" component="span" fontWeight={800}>{deliveryData?.name || ""}</Typography>
          <Typography gutterBottom variant="p" color="projDark.darker">Vehicle: {deliveryData?.vehicalName || ""} {deliveryData?.vehicalNumber || ""}</Typography>
          <Typography gutterBottom variant="p" color="projDark.darker">Phone No: {deliveryData?.phoneNo || ""}</Typography>
          {/* <Button variant="contained" color="success" sx={{ width: "min-content", alignSelf:"flex-end" }} >Edit</Button> */}
          <Button variant="contained" color="error" sx={{ display: viewOnly ? "none" : "block", width: "min-content", margin: "5px 0px 2px 0px" }} onClick={(e) => { onDelete ? onDelete(deliveryData?.person_id) : e.preventDefault() }}>Delete</Button>
        </Paper>
        : AddDeliveryPerson ?
        <Paper variant="outlined" sx={addAddressStyle}>
          <Typography gutterBottom variant="h6" component="span" fontWeight={800}>Add new Delivery Person</Typography>
          <Button variant="contained" color="success" sx={{ display: viewOnly ? "none" : "block", width: "min-content", margin: "5px 0px 2px 0px" }} onClick={(e) => { onAdd ? onAdd() : e.preventDefault() }}>Add</Button>
        </Paper> 
        : AddAddress ?
          <Paper variant="outlined" sx={addAddressStyle}>
            <Typography gutterBottom variant="h6" component="span" fontWeight={800}>Add new address</Typography>
            <Button variant="contained" color="success" sx={{ display: viewOnly ? "none" : "block", width: "min-content", margin: "5px 0px 2px 0px" }} onClick={(e) => { onAdd ? onAdd() : e.preventDefault() }}>Add</Button>
          </Paper>
          : <Paper variant="outlined" sx={paperStyle}>
            <Typography gutterBottom variant="h6" component="span" fontWeight={800}>{addressData?.idx || addressData?.idx === 0 ? `Address ${addressData.idx + 1}` : "Address"}</Typography>
            <Typography gutterBottom variant="p" color="projDark.darker">{`${addressData?.address + ", " || ""}${addressData?.city + ", " || ""}${addressData?.state + " " || ""}${addressData?.pincode || ""}`}</Typography>
            {/* <Button variant="contained" color="success" sx={{ width: "min-content", alignSelf:"flex-end" }} >Edit</Button> */}
            <Stack direction="row">
              <Button variant="contained" color="success" sx={{ display: viewOnly ? "none" : "block", width: "min-content", margin: "5px 0px 2px 0px" }} onClick={(e) => { onEdit ? onEdit() : e.preventDefault() }}>Edit</Button>
              <Button variant="contained" color="error" sx={{ display: viewOnly ? "none" : "block", width: "min-content", margin: "5px 0px 2px 10px" }} onClick={(e) => { onDelete ? onDelete() : e.preventDefault() }}>Delete</Button>
            </Stack>
          </Paper>}
    </>
  )
}

export default AddressAndDelivery;