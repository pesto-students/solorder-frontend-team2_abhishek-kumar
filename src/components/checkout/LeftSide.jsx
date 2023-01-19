import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';
import PlaceIcon from '@mui/icons-material/Place';
import AddressAndDelivery from '../addressAndDelivery';
import PaymentIcon from '@mui/icons-material/Payment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import cartStore from '../../zustang/menucheckout/cartStore';
import { useNavigate } from "react-router-dom";
import signInUpStore from '../../zustang/auth/signInUpStore';
import { numToAmount } from '../../utils';
import useRazorpay from "react-razorpay";
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';
import OpenRazorPay from '../../common/RazorPay';
import dashboardStore from '../../zustang/restaurant/dashboardStore';

let steps = [
  "Account",
  "Delivery",
  "Payment"
]

function LeftSide() {
  const [paymentType, setPaymentType] = React.useState(0);
  const [stepNo, setStepNo] = React.useState(0);
  const [itemTotal, setItemTotal] = React.useState(0)
  let navigate = useNavigate();

  const Razorpay = useRazorpay();
  const { getPaymentOrderId, saveTransaction, saveRestaurant, restDetails } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { createOrder } = dashboardStore(s => s)

  const {
    cartItems,
    cartRestaurantId,
    cartUserId,
    cartAddressData,
    resetItemToCart
  } = cartStore(s => s)
  const { handleModel, userData, signOut, signUpHandleModel } = signInUpStore(state => state)

  React.useEffect(() => {
    if (cartItems && (Object.keys(cartItems).length === 0))
      navigate("/")
    else if (!cartUserId)
      setStepNo(0)
    else
      setStepNo(2)

    if (cartItems && Object.values(cartItems).length) {
      let total = 0
      Object.values(cartItems).forEach((item) => {
        if (item?.itemData?.price && item?.itemCount)
          total = total + (item.itemData.price * item.itemCount)
      })
      setItemTotal(total + 25)
    }
  }, [cartItems, cartUserId])

  const handleChange = (event) => {
    setPaymentType(event.target.value);
    setStepNo(3)
  };

  const savePaymentData = (reciptData, paymentData, paymentType) => {
    let items = cartItems && Object.keys(cartItems).length ? Object.values(cartItems) : []
    let data = {
      "restaurant_id": cartRestaurantId && Number(cartRestaurantId) || null,
      "totalCost": reciptData?.amount && (reciptData?.amount / 100) || 0,
      "items": items || [],
      "recipt_id": reciptData?.receipt || null,
      "orderTime": String(new Date()),
      "orderAddress": cartAddressData && Object.keys(cartAddressData).length && cartAddressData || null,
    }
    isLoader(true)
    createOrder({
      data,
      cb: (res) => {
        isLoader(false)
        if (res.error) {
          notify(res.msg, "error")
        } else {
          if (paymentType === 2)
            alert(`Transaction Details:\nRecipt ID: ${reciptData?.receipt || ""}\nOrder ID: ${paymentData?.order_id || ""}\nPayment ID: ${paymentData?.payment_id || ""}`)
          else
            alert(`Transaction Details:\nRecipt ID: ${reciptData?.receipt || ""}`)
          notify(res.msg, "success")
          resetItemToCart()
          navigate("/setting")
        }
      }
    })
  }

  const payPlanAmount = () => {
    isLoader(true)
    let date = new Date()
    let data = { amount: (itemTotal || 0) * 100, receipt: `order_${paymentType || ""}_${userData?.user_id || ""}_${cartRestaurantId || ""}_${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` }

    if (paymentType == 1) {
      let paymentData = {
        "recipt_id": data?.receipt || "",
        "order_id": null,
        "payment_id": null,
        "user_id": userData?.user_id || "",
        "amount": itemTotal || "",
        "dateTime": String(date) || "",
        "signature": null,
        "plan_id": 1,
      }
      saveTransaction({
        data: paymentData,
        cb: (res) => {
          if (res.error) {
            notify(res.msg, "error")
          } else {
            savePaymentData(data, paymentData, 1)
          }
          isLoader(false)
        }
      })
    } else {
      getPaymentOrderId({
        data: data,
        cb: (OrderRes) => {
          isLoader(false)
          if (OrderRes.error) {
            notify(OrderRes.msg, "error")
          } else {
            OpenRazorPay({
              userDetails: userData,
              orderDetail: OrderRes?.data || {},
              Razorpay,
              cb: (err, res) => {
                if (err) {
                  notify(err?.msg || "Something went Wrong! Payment failed.", "error")
                }
                if (res) {
                  let paymentData = {
                    "recipt_id": data?.receipt || "",
                    "order_id": OrderRes?.data?.id || "",
                    "payment_id": res?.razorpay_payment_id || "",
                    "user_id": userData?.user_id || "",
                    "amount": OrderRes?.data?.amount && (OrderRes.data.amount / 100) || "",
                    "dateTime": String(date) || "",
                    "signature": res?.razorpay_signature || "",
                    "plan_id": 2,
                  }
                  isLoader(true)
                  saveTransaction({
                    data: paymentData,
                    cb: (res) => {
                      if (res.error) {
                        notify(res.msg, "error")
                      } else {
                        savePaymentData(data, paymentData, 2)
                      }
                      isLoader(false)
                    }
                  })
                }
              }
            })
          }
        }
      })
    }

  }

  return (
    <Box sx={{ width: { md: "70%", sm: "100%" } }} >
      <Box mb={1} mt={1}>
        <Accordion expanded={steps[stepNo] === "Account"}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Box sx={{ display: "flex", alignItems: "center" }} ><PersonIcon /><Typography variant='h6' pl={1} fontSize="1rem">Account</Typography></Box>
              <Box sx={{ display: "flex", alignItems: "center" }} >
                {userData && Object.keys(userData).length ?
                  <Stack direction="column">
                    <Typography variant='h6' pl={1} fontSize="1rem">{userData?.name || ""}</Typography>
                    <Typography variant='h6' pl={1} fontSize="0.8rem">{userData?.email || ""}</Typography>
                  </Stack>
                  :
                  <>
                    <Button sx={{ mr: 1, textTransform: "capitalize" }} variant="contained" size="small" color="success" onClick={() => { handleModel(true) }}>Sign In</Button>
                    <Button sx={{ textTransform: "capitalize" }} variant="outlined" size="small" color="success" onClick={() => { signUpHandleModel(true) }} >Sign Up</Button>
                  </>}
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To place your order now, log in to your existing account or sign up.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box mb={1} mt={1}>
        <Accordion expanded={steps[stepNo] === "Delivery"}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack direction="column" width="100%">
              <Stack direction="row" justifyContent="space-between" width="100%" mb={1}>
                <Box sx={{ display: "flex", alignItems: "center" }} ><PlaceIcon /><Typography variant='h6' pl={1} fontSize="1rem">Delivery address</Typography></Box>
              </Stack>
              <AddressAndDelivery viewOnly addressData={cartAddressData} />
            </Stack>
          </AccordionSummary>
          {/* <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AddressAndDelivery />
              </Grid>
            </Grid>
          </AccordionDetails> */}
        </Accordion>
      </Box>
      <Box mb={2} mt={1}>
        <Accordion expanded={steps[stepNo] === "Payment"}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack direction="column" width="100%">
              <Stack direction="row" justifyContent="space-between" width="100%">
                <Box sx={{ display: "flex", alignItems: "center" }} ><PaymentIcon /><Typography variant='h6' pl={1} fontSize="1rem">Account</Typography></Box>
                <Box sx={{ display: "flex", alignItems: "center" }} >
                  <Button sx={{ mr: 1, textTransform: "capitalize", display: paymentType ? "block" : "none" }} variant="contained" size="small" color="success" onClick={payPlanAmount}>Pay</Button>
                  <Button sx={{ display: paymentType ? "block" : "none", textTransform: "capitalize" }} variant="outlined" size="small" color="success" onClick={(e) => (setStepNo(2))}>Change Method</Button>
                </Box>
              </Stack>
              <Typography ml={4}>
                {paymentType === '1' ? `${itemTotal && numToAmount(itemTotal) || ""} COD (Cash On Delivery)` : paymentType === '2' ? `${itemTotal && numToAmount(itemTotal) || ""} Pay Via Razorpay` : ""}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Select Payment Method</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={paymentType}
                onChange={handleChange}
              >
                <FormControlLabel value={1} control={<Radio />} label={`${itemTotal && numToAmount(itemTotal) || ""} COD (Cash On Delivery)`} />
                <FormControlLabel value={2} control={<Radio />} label={`${itemTotal && numToAmount(itemTotal) || ""} Pay Via Razorpay`} />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default LeftSide;