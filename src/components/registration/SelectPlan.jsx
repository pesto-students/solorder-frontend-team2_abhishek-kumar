import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import signInUpStore from '../../zustang/auth/signInUpStore';
import commonStore from '../../zustang/common/commonStore';
import OpenRazorPay from '../../common/RazorPay';
import useRazorpay from "react-razorpay";
import { useParams } from 'react-router-dom';


let planList = [{ id: 1, amount: 0, days: 15 }, { id: 2, amount: 60, days: 30 }, { id: 2, amount: 600, days: 365 }];

const SelectPlan = ({ goNext, isDasboard, getSetRegistrationData }) => {

  const Razorpay = useRazorpay();
  const { userData } = signInUpStore(s => s)
  const { getPaymentOrderId, saveTransaction, saveRestaurant, restDetails } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  const [plan, setPlan] = React.useState(null)
  let { restaurant_id } = useParams();

  const payPlanAmount = () => {
    isLoader(true)
    let date = new Date()
    let data = { amount: (plan?.amount || 0) * 100, receipt: `plan_${plan?.id || ""}_${userData?.user_id || ""}_${userData?.restaurant_id || ""}_${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` }

    if (plan?.id === 1) {
      isLoader(true)
      let paymentData = { recipt_id: (data?.receipt || ""), daysToExpire: restDetails?.daysToExpire ? (restDetails.daysToExpire + plan.days) : plan.days, purchaseDate: String(date), plan_id: plan?.id }
      saveRestaurant({
        restaurant_id, data: paymentData, cb: (response) => {
          if (response.error) {
            notify(response.msg, "error")
            isLoader(false)
          } else {
            alert(`Transaction Details:\nRecipt ID: ${paymentData?.recipt_id || ""}`)
            if (isDasboard) { getSetRegistrationData() }
            else { goNext() }
            isLoader(false)
          }
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
                    "plan_id": plan?.id || "",
                  }
                  isLoader(true)
                  saveTransaction({
                    data: paymentData,
                    cb: (res) => {
                      if (res.error) {
                        notify(res.msg, "error")
                      } else {
                        alert(`Transaction Details:\nRecipt ID: ${res?.data?.recipt_id || ""}\nOrder ID: ${res?.data?.order_id || ""}\nPayment ID: ${res?.data?.payment_id || ""}`)
                        notify(res.msg, "success")
                        if (isDasboard) { getSetRegistrationData() }
                        else { goNext() }
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
    <Stack minHeight="60vh" direction="column" alignItems="center" width="100%">
      <Stack spacing={2} width="100%" justifyContent="space-around" alignItems={{ xl: "flex-start", lg: "flex-start", md: "flex-start", sm: "flex-start", xs: "center" }} direction={{ xl: "row", lg: "row", md: "row", sm: "row", xs: "column" }} mt={2} mb={8}>
        <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5", display: isDasboard ? "none" : "" }}>
          <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Free Plan</Typography>
          <Box>
            <ul style={{ margin: "30px" }} >
              <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
              <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
              <li><Typography variant="span" component="span">Valid for 15 days</Typography></li>
              <li><Typography variant="span" component="span">Cost ₹0</Typography></li>
            </ul>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" onClick={() => { setPlan(planList[0]) }}>Select</Button></Box>
        </Paper>
        <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5" }}>
          <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Monthly plan</Typography>
          <Box>
            <ul style={{ margin: "30px" }} >
              <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
              <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
              <li><Typography variant="span" component="span">Valid for 30 days</Typography></li>
              <li><Typography variant="span" component="span">Cost ₹60</Typography></li>
            </ul>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" onClick={() => { setPlan(planList[1]) }}>Select</Button></Box>
        </Paper>
        <Paper variant="outlined" sx={{ justifyContent: "center", alignItems: "center", direction: "row", border: "2px solid #605A5A", bgcolor: "#F5F5F5" }}>
          <Typography variant="h6" borderBottom="2px solid #605A5A" textAlign="center">Yearly Plan</Typography>
          <Box>
            <ul style={{ margin: "30px" }} >
              <li><Typography variant="span" component="span" >This is a one time plan.</Typography></li>
              <li><Typography variant="span" component="span">Get Unlimited online order.</Typography></li>
              <li><Typography variant="span" component="span">Valid for 365 days</Typography></li>
              <li><Typography variant="span" component="span">Cost ₹600</Typography></li>
            </ul>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}><Button variant="contained" color="projPrimary" onClick={() => { setPlan(planList[2]) }}>Select</Button></Box>
        </Paper>
      </Stack >
      <Button variant="contained" color="success" sx={{ display: (plan ? "block" : "none"), m: "auto", mb: 2, }} size="large" onClick={payPlanAmount} >Pay ₹{plan?.amount || 0}</Button>
    </Stack>
  )
}

export default SelectPlan;