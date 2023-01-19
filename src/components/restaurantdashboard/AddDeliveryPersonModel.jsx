import { Button, IconButton, Modal, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import dashboardStore from '../../zustang/restaurant/dashboardStore';
import { convertOnlyNumber } from '../../utils';
import commonStore from '../../zustang/common/commonStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "max-content",
  bgcolor: 'projPrimary.main',
  maxHeight: "95vh",
  maxWidth: "95vw",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  alignItems: "center",
};

const AddDeliveryPersonModel = () => {
  const { addDelieveryPerson, getDelieveryPersonList, deliveryPerModel, handleDeliveryPerModel } = dashboardStore(s => s)
  const { isLoader, notify } = commonStore(s => s)
  const [data, setData] = useState({
    "name": "",
    "phoneNo": "",
    "vehicalName": "",
    "vehicalNumber": "",
    "error": {},
  })

  useEffect(() => {
    if (!deliveryPerModel)
      setData({
        "name": "",
        "phoneNo": "",
        "vehicalName": "",
        "vehicalNumber": "",
        "error": {},
      })
  }, [deliveryPerModel])

  const {
    name,
    phoneNo,
    vehicalName,
    vehicalNumber,
    error,
  } = data

  const handleInput = (name) => (e) => {
    let value = e.target.value
    if (name === "phoneNo" && value) {
      value = convertOnlyNumber(value)
      if (String(value).length > 10)
        return
    }
    setData({ ...data, [name]: value, error: {} })
  }

  const getDelPersonList = () => {
    isLoader(true)
    getDelieveryPersonList({
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }

  const onAddDelivery = () => {
    let error = {}
    if (!name)
      error["name"] = "Name is required."
    if (!phoneNo)
      error["phoneNo"] = "Phone No is required."
    if (!vehicalName)
      error["vehicalName"] = "Vehical Name is required."
    if (!vehicalNumber)
      error["vehicalNumber"] = "Vehical Number is required."
    if (Object.keys(error).length) {
      setData({ ...data, error: error })
    } else {
      let data = {
        "name": name || "",
        "phoneNo": phoneNo || "",
        "vehicalName": vehicalName || "",
        "vehicalNumber": vehicalNumber || "",
      }
      isLoader(true)
      addDelieveryPerson({
        data,
        cb: (res) => {
          isLoader(false)
          if (res.error)
            notify(res.msg, "error")
          else {
            notify(res.msg, "success")
            getDelPersonList()
            handleDeliveryPerModel(false)
          }
        }
      })
    }
  }

  return (
    <Modal
      open={deliveryPerModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Box display={"flex"} flexDirection="row" justifyContent="flex-end" width={"100%"}>
          <IconButton onClick={() => { handleDeliveryPerModel(false) }}>
            <CloseIcon color='projDark' />
          </IconButton>
        </Box>
        <Stack direction="column" p={1.5}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            error={error?.name ? true : false}
            helperText={error?.name ? error.name : " "}
            color="projDark"
            required
            value={name}
            onChange={handleInput('name')}
          />
          <TextField
            id="phoneNo"
            label="Phone No."
            variant="outlined"
            type="number"
            fullWidth
            error={error?.phoneNo ? true : false}
            helperText={error?.phoneNo ? error.name : " "}
            color="projDark"
            required
            value={phoneNo}
            onChange={handleInput('phoneNo')}
          />
          <TextField
            id="vehicalName"
            label="Vehical Name"
            variant="outlined"
            fullWidth
            error={error?.vehicalName ? true : false}
            helperText={error?.vehicalName ? error.vehicalName : " "}
            color="projDark"
            required
            value={vehicalName}
            onChange={handleInput('vehicalName')}
          />
          <TextField
            id="vehicalNumber"
            label="Vehical Number"
            variant="outlined"
            fullWidth
            error={error?.vehicalNumber ? true : false}
            helperText={error?.vehicalNumber ? error.vehicalNumber : " "}
            color="projDark"
            required
            value={vehicalNumber}
            onChange={handleInput('vehicalNumber')}
          />
          <Button variant="contained" color="success" sx={{ width: "min-content", m: "auto" }} onClick={onAddDelivery}>Update</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default AddDeliveryPersonModel