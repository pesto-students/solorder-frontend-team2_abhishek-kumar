import React, { useEffect, useState } from 'react'
import CustomTab from '../../components/customtab';
import ActiveOrders from '../../components/restaurantdashboard/ActiveOrders';
import DeliveryPerson from '../../components/restaurantdashboard/DeliveryPerson';
// import DetailsEdit from '../../components/restaurantdashboard/DetailsEdit';
import EditPlan from '../../components/restaurantdashboard/EditPlan';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import { useParams } from 'react-router-dom';
import commonStore from '../../zustang/common/commonStore';
import registrationStore from '../../zustang/restaurant/registrationStore';
import { useNavigate, useLocation } from "react-router-dom";
import Details from '../../components/registration/Details';
import UploadImage from '../../components/registration/UploadImage';
import SetupMenu from '../../components/registration/SetupMenu';
import Orders from '../../components/setting/Orders';
import signInUpStore from '../../zustang/auth/signInUpStore';


const RestaurantDashboard = (props) => {
  var { restDetails, getRestaurantDetails } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { setRestaurantData } = registrationStore(s => s)
  const { userData } = signInUpStore(state => state)
  let { restaurant_id } = useParams();
  var navigate = useNavigate()
  const [error, setError] = useState({});

  const getSetRegistrationData = () => {
    getRestaurantDetails({
      restaurant_id, cb: (res) => {
        isLoader(false)
        if (res.error){
          notify(res.msg, 'error')
          navigate("/404")
        } else {
          let resData = res?.data || {}
          if (resData?.stepCompleted < 4)
            navigate("/restaurant/dashboard/" + (restaurant_id || ""))
          let cuisineStr = null
          if (resData?.cuisines?.length) cuisineStr = resData.cuisines.join(", ");
          setRestaurantData({ ...resData, cuisines: cuisineStr })
        }
      }
    })
  }

  useEffect(() => {
    if(userData?.restaurant_id && Number(userData?.restaurant_id) === Number(restaurant_id)){
      isLoader(true)
      getSetRegistrationData()
    } else {
      navigate("/404")
    }
  }, [])

  const compProps = {
    ...props,
    getSetRegistrationData,
    isDasboard: true,
    restaurant_id,
    error,
    setError,
    restDetails
  }

  return (
    <CustomTab TabList={[<>Active&nbsp;Orders</>, "Orders", "Delivery Persons", "Details", "Images", "Menu", "Plan"]} TabCompList={[
      // <Profile {...props} />, <Orders {...props} />, <History {...props} />, <Addresses {...props} />
      <ActiveOrders {...compProps} viewOnly={false} />, <Orders {...compProps} />, <DeliveryPerson {...compProps} />, <Details {...compProps} />, <UploadImage {...compProps} />, <SetupMenu {...compProps} />, <EditPlan {...compProps} />
    ]} />
  )
}

export default RestaurantDashboard; 