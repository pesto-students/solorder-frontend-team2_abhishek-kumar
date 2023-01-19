import React, { useEffect } from 'react'
import StepDetails from '../../components/registration/StepDetails';
import StepperComp from '../../components/registration/StepperComp';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import { useParams } from 'react-router-dom';
import commonStore from '../../zustang/common/commonStore';
import registrationStore from '../../zustang/restaurant/registrationStore';
import { useNavigate } from "react-router-dom";
import signInUpStore from '../../zustang/auth/signInUpStore';

const Registration = () => {
  var { getRestaurantDetails } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { setRestaurantData } = registrationStore(s => s)
  const { userData } = signInUpStore(state => state)
  let { restaurant_id } = useParams();
  var navigate = useNavigate()

  const getSetRegistrationData = () => {
    getRestaurantDetails({
      restaurant_id, cb: (res) => {
        isLoader(false)
        if (res.error) {
          notify(res.msg, 'error')
          navigate("/404")
        } else {
          let resData = res?.data || {}
          if (resData?.stepCompleted === 4)
            navigate("/restaurant/dashboard/" + (restaurant_id || ""))
          let cuisineStr = null
          if (resData?.cuisines?.length) cuisineStr = resData.cuisines.join(", ");
          setRestaurantData({ ...resData, cuisines: cuisineStr })
        }
      }
    })
  }

  useEffect(() => {
    if (userData?.restaurant_id && Number(userData?.restaurant_id) === Number(restaurant_id)) {
      isLoader(true)
      getSetRegistrationData()
    } else {
      navigate("/404")
    }
  }, [])

  return (
    <><StepperComp /><StepDetails getSetRegistrationData={getSetRegistrationData} /></>
  )
}

export default Registration;