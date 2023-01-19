import * as React from "react";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import { Button, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Details from "./Details";
import UploadImage from "./UploadImage";
import SetupMenu from "./SetupMenu";
import SelectPlan from "./SelectPlan";
import restaurantStore from "../../zustang/restaurant/restaurantStore";
import registrationStore from "../../zustang/restaurant/registrationStore";
import commonStore from "../../zustang/common/commonStore";
import { useParams } from "react-router-dom";
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from "react-router-dom";

const StepDetails = ({ getSetRegistrationData }) => {
  const [error, setError] = React.useState({});
  var { restDetails, saveRestaurant, getRestaurantDetails, menuList } = restaurantStore(s => s)
  var { registrationData, setRestaurantData } = registrationStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  let { restaurant_id } = useParams();
  let navigate = useNavigate();

  const goNext = () => {
    var data = {}
    var error = {}

    var {
      name, address, state, city, pincode, latitude, longitude, deliveryRange, deliveryTime, costForTwo, cuisines,
    } = registrationData

    let step = restDetails?.stepCompleted || 0;

    if (restDetails?.stepCompleted === 0) {
      var cuisinesArr = []
      if (cuisines) cuisines.trim().split(",").forEach((cui) => { if (cui.trim()) cuisinesArr.push(cui.trim()) });
      data = {
        name: name,
        address: address,
        state: state,
        city: city,
        pincode: Number(pincode),
        latitude: Number(latitude),
        longitude: Number(longitude),
        deliveryRange: Number(deliveryRange),
        deliveryTime: Number(deliveryTime),
        costForTwo: Number(costForTwo),
        cuisines: cuisinesArr,
        stepCompleted: 1,
      }

      if (!name)
        error['name'] = true

      if (!address)
        error['address'] = true

      if (!state)
        error['address'] = true

      if (!city)
        error['address'] = true

      if (!pincode)
        error['address'] = true

      if (!latitude)
        error['address'] = true

      if (!longitude)
        error['address'] = true

      if (!deliveryRange)
        error['deliveryRange'] = true

      if (!deliveryTime)
        error['deliveryTime'] = true

      if (!costForTwo)
        error['costForTwo'] = true

      if (!cuisines)
        error['cuisines'] = true
    } else if ((restDetails?.stepCompleted === 1) && restDetails?.galaryImgs?.length) {
      data = {
        stepCompleted: restDetails?.stepCompleted ? (restDetails.stepCompleted + 1) : 0
      }
    } else if ((restDetails?.stepCompleted === 2) && menuList?.length) {
      data = {
        stepCompleted: restDetails?.stepCompleted ? (restDetails.stepCompleted + 1) : 0
      }
    } else if ((restDetails?.stepCompleted === 3) && menuList?.length) {
      data = {
        stepCompleted: restDetails?.stepCompleted ? (restDetails.stepCompleted + 1) : 0
      }
    }

    if (Object.keys(error).length) {
      setError(error)
    } else {
      isLoader(true)
      saveRestaurant({
        restaurant_id, data, cb: (response) => {
          if (response.error) {
            notify(response.msg, 'error')
            isLoader(false)
          } else {
            notify(response.msg, 'success')
            if (step === 3) {
              navigate("/restaurant/dashboard/" + (restaurant_id || ""))
            } else {
              getSetRegistrationData()
            }
          }
        }
      })
    }
  }

  const goPrev = () => {
    let data = {
      stepCompleted: restDetails?.stepCompleted ? (restDetails.stepCompleted - 1) : 0
    }
    isLoader(true)
    saveRestaurant({
      restaurant_id, data, cb: (response) => {
        if (response.error)
          notify(response.msg, 'error')
        else {
          // notify(response.msg, 'success')
          getSetRegistrationData()
        }
      }
    })
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "projPrimary.main", mt: 1, p: 2 }}>
      <Stack spacing={2}>
        <Typography gutterBottom variant="h6" component="span" fontWeight={800} display={"flex"} alignItems={'center'}>
          <>
            {restDetails?.stepCompleted === 0 ? <><RestaurantIcon sx={{ mr: 1.5 }} />Restaurant Details</>
              : restDetails?.stepCompleted === 1 ? <><ImageIcon sx={{ mr: 1.5 }} />Upload Photos</>
                : restDetails?.stepCompleted === 2 ? <><MenuBookIcon sx={{ mr: 1.5 }} />Setup Menu</>
                  : restDetails?.stepCompleted === 3 ? <><LocalMallIcon sx={{ mr: 1.5 }} />Buy Plan</>
                    : ""}
          </>
        </Typography>
        {restDetails?.stepCompleted === 0 ? <Box minHeight="62vh"><Details error={error} setError={setError} /></Box> :
          restDetails?.stepCompleted === 1 ? <Box minHeight="62vh"><UploadImage error={error} getSetRegistrationData={getSetRegistrationData} /></Box> :
            restDetails?.stepCompleted === 2 ? <Box minHeight="62vh"><SetupMenu error={error} /></Box> :
              restDetails?.stepCompleted === 3 ? <Box minHeight="62vh"><SelectPlan error={error} goNext={goNext} /></Box> :
                <Box minHeight="62vh"></Box>}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" startIcon={<ArrowBackIosNewIcon />} sx={{ visibility: restDetails?.stepCompleted ? "visible" : "hidden" }} onClick={goPrev}>
            Previous
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIosIcon />} sx={{ visibility: restDetails?.stepCompleted === 3 ? "hidden" : "visible" }} onClick={goNext}>
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default StepDetails