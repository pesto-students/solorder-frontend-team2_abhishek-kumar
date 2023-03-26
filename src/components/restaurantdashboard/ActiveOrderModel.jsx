import React, { useEffect } from 'react'
import { Button, Divider, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import config from '../../common/config';
import Item from '../menuCard/Item';
import "./style.css"
import { numToAmount } from '../../utils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import commonStore from '../../zustang/common/commonStore';
import dashboardStore from '../../zustang/restaurant/dashboardStore';

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


const ActiveOrderModel = () => {
  const {
    delieveryPersonList,
    getDelieveryPersonList,
    activeOrderId,
    openActiveModel,
    handleActiveModel,
    activeOrdersList,
    updateOrder,
    getActiveOrders,
    viewOnlyModel,
    pastOrdersList,
    isPastOrder,
  } = dashboardStore(s => s)
  const [orderData, setOrderData] = React.useState({})
  const [inputData, setInputData] = React.useState({
    estimateDeliveryTime: 0,
    deliveryPerson: {},
    error: {}
  })
  const { isLoader, notify } = commonStore(s => s)
  React.useEffect(() => {
    if (openActiveModel) {
      if (!viewOnlyModel) getDelPersonList()
      if (activeOrdersList && activeOrdersList.length && !isPastOrder) {
        let x = activeOrdersList.find((order) => (order.order_id === activeOrderId))
        if (x) {
          setOrderData((x ? x : {}))
          setInputData({ estimateDeliveryTime: x?.estimateDeliveryTime || 0, deliveryPerson: x?.deliveryPerson || {}, error: {} })
        } else {
          handleActiveModel(false)
        }
      } else if (pastOrdersList && pastOrdersList.length) {
        let x = pastOrdersList.find((order) => (order.order_id === activeOrderId))
        if (x) {
          setOrderData((x ? x : {}))
          setInputData({ estimateDeliveryTime: x?.estimateDeliveryTime || 0, deliveryPerson: x?.deliveryPerson || {}, error: {} })
        } else {
          handleActiveModel(false)
        }
      }
    } else {
      setInputData({
        estimateDeliveryTime: 0,
        deliveryPerson: {},
        error: {}
      })
    }
  }, [openActiveModel, activeOrdersList])

  const handleChange = (name) => (event) => {
    let value = event.target.value
    if (name === "estimateDeliveryTime")
      setInputData({ ...inputData, estimateDeliveryTime: Number(value), error: {} })
    else if (name === "deliveryPerson") {
      let x = delieveryPersonList.find((person) => (person.person_id === Number(value)))
      setInputData({ ...inputData, deliveryPerson: (x ? x : {}), error: {} })
    }
  };

  let orderList = config.ORDER_STATUS_LIST ? JSON.parse(String(config.ORDER_STATUS_LIST)) : [];

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

  let { order_id, user, orderAddress, items, deliveryPerson, orderStatus_Id, totalCost, estimateDeliveryTime } = orderData;

  const UpdateOrder = () => {
    let error = {}
    let data = { order_id }
    let orderStatusId = (orderStatus_Id + 1)

    data["orderStatus_Id"] = orderStatusId

    if (!inputData?.estimateDeliveryTime)
      error['estimateDeliveryTime'] = true
    else
      data["estimateDeliveryTime"] = inputData.estimateDeliveryTime

    if ((orderStatusId >= 4)) {
      if (!(Object.keys(inputData?.deliveryPerson).length)) {
        error['deliveryPerson'] = true
      } else
        data["deliveryPerson"] = inputData.deliveryPerson
    }
    if (Object.keys(error).length) {
      setInputData({ ...inputData, error })
    } else {
      isLoader(true)
      updateOrder({
        data: data,
        cb: (res) => {
          if (res.error) {
            isLoader(false)
            notify(res.msg, "error")
          } else {
            getActiveOrders({
              cb: (response) => {
                isLoader(false)
                if (response.error)
                  notify(response.msg, "error")
                else {
                  notify(res.msg, "success")
                  if (orderStatusId >= 5) handleActiveModel(false)
                }
              }
            })
          }
        }
      })
    }
  }

  return (
    <Modal
      open={openActiveModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Box display={"flex"} flexDirection="row" justifyContent="space-between" width={"100%"}>
          <div>&nbsp;</div>
          <Stack direction="row" mt={1}><Typography fontWeight={500} pr={1}>Ticket</Typography><Typography fontWeight={500}>{order_id || ""}</Typography></Stack>
          <IconButton onClick={(e) => { handleActiveModel(false) }}>
            <CloseIcon color='projDark' />
          </IconButton>
        </Box>
        <Box width={"100%"}><Divider /></Box>
        <Stack mr={2} ml={2} mb={2}>
          <Stack direction="row" mt={1}><Typography fontWeight={500} pr={1}>Order Id:</Typography><Typography>{order_id || ""}</Typography></Stack>
          <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Name:</Typography><Typography>{user?.name || ""}</Typography></Stack>
          <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Address:</Typography><Typography>{`${orderAddress?.address || ""}, ${orderAddress?.city || ""}, ${orderAddress?.state || ""} ${orderAddress?.pincode || ""}`}</Typography></Stack>
          <Stack direction="column" mt={0.5}>
            <Typography fontWeight={500} pr={1}>Items&nbsp;Details:</Typography>
            <Stack direction="column" className="MenuCard" sx={{ maxHeight: "20vh", overflowY: "auto", mt: 0.5, mb: 1 }}>
              {items && items.length ? items.map((data) => (<Item parent="activeOrder" itemDetails={data?.itemData || {}} itemCount={data?.itemCount || 0} />)) : ""}
            </Stack>
          </Stack>
          <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Total&nbsp;Cost&nbsp;(Including all charges):</Typography><Typography>{totalCost && numToAmount(totalCost) || ""}</Typography></Stack>
          {viewOnlyModel ?
            <>
              <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Delivery&nbsp;Person:</Typography><Typography color="red">{deliveryPerson ? `${deliveryPerson?.name || ""} (${deliveryPerson?.phoneNo || ""})` : "Not Assigned"}</Typography></Stack>
              <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Estimate&nbsp;Delivery&nbsp;Person:</Typography><Typography fontWeight={500} color="red">{estimateDeliveryTime ? estimateDeliveryTime + " Mins" : "Not Assigned"}</Typography></Stack>
            </>
            :
            <>
              <Stack direction="column" mt={0.5} mb={0.5}>
                <Typography fontWeight={500} >Delivery&nbsp;Person</Typography>
                <FormControl variant="standard" fullWidth size='small' color="projDark">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputData?.deliveryPerson?.person_id || 0}
                    onChange={handleChange("deliveryPerson")}
                    error={inputData?.error?.deliveryPerson ? true : false}
                    helperText={inputData?.error?.deliveryPerson ? "Select Delivery Person is required." : " "}
                  >
                    {delieveryPersonList && Array.isArray(delieveryPersonList) && delieveryPersonList.length ? delieveryPersonList.map((person) => (<MenuItem value={person?.person_id || null}>{`${person?.name || null} (${person?.phoneNo || null})`}</MenuItem>)) : []}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="column" mt={0.5} mb={0.5}>
                <Typography fontWeight={500} >Estimate&nbsp;Delivery&nbsp;Time</Typography>
                <TextField
                  id="standard-number"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Mins</InputAdornment>,
                  }}
                  value={inputData?.estimateDeliveryTime || ""}
                  onChange={handleChange("estimateDeliveryTime")}
                  error={inputData?.error?.estimateDeliveryTime ? true : false}
                  helperText={inputData?.error?.estimateDeliveryTime ? "Estimate Delivery Time Time is required." : " "}
                  color="projDark"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  size='small'
                />
              </Stack>
            </>
          }
          {/* <Stack direction="row" mt={0.5}><Typography fontWeight={500} pr={1}>Status:</Typography><Typography fontWeight={500} color="red">{orderStatus_Id && orderList[Number(orderStatus_Id) - 1] ? orderList[Number(orderStatus_Id) - 1].value : ""}</Typography></Stack> */}
          <Box sx={{ width: "100%", bgcolor: "projPrimary.main", pt: 3, pb: 2, mb: 1 }}>
            <Stepper activeStep={orderStatus_Id ? (orderStatus_Id - (viewOnlyModel ? 2 : 1)) : null} alternativeLabel >
              {orderList.map((status) => (
                status.id !== 6 && status.id !== 1 ? <Step key={status.id}>
                  <StepLabel>{status.value}</StepLabel>
                </Step> : []
              ))}
            </Stepper>
          </Box>
          {viewOnlyModel ?
            <Button variant="contained" color='success' sx={{ width: "max-content", m: "auto" }} size="small" onClick={(e) => { handleActiveModel(false) }}>Close</Button>
            :
            <Button variant="contained" color='success' sx={{ width: "max-content", m: "auto" }} size="small" onClick={UpdateOrder}>{orderStatus_Id >= 4 ? "Complete Order" : "Move Next"}</Button>
          }
        </Stack>
      </Stack>
    </Modal>
  )
}

export default ActiveOrderModel;