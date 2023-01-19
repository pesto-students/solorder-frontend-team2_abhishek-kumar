import React, { useEffect } from 'react'
import MenuHead from '../../components/menu/MenuHead';
import MenuCard from '../../components/menuCard';
import { useParams } from 'react-router-dom';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  var { getRestaurantDetails, getMenuItems } = restaurantStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var navigate = useNavigate()
  let { restaurant_id } = useParams();

  useEffect(() => { getRestaurantData() }, [])

  const getRestaurantData = (noLoder=false) => {
    isLoader(!noLoder)
    getRestaurantDetails({
      restaurant_id, cb: (res) => {
        if (res.error) {
          notify(res.msg, 'error')
          isLoader(false)
          navigate(-1)
        } else {
          getMenuItems({
            restaurant_id, cb: (res) => {
              isLoader(false)
              if (res.error)
                notify(res.msg, 'error')
            }
          })
        }
      }
    })
  }

  return (
    <>
      <MenuHead getRestaurantData={getRestaurantData} restaurant_id={restaurant_id} />
      <MenuCard parent="menu" getRestaurantData={getRestaurantData} restaurant_id={restaurant_id} />
    </>
  )
}

export default Menu;