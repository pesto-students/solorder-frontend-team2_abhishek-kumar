import React from 'react'
import CustomTab from '../../components/customtab';
import ActiveOrders from '../../components/restaurantdashboard/ActiveOrders';
import DeliveryPerson from '../../components/restaurantdashboard/DeliveryPerson';
import DetailsEdit from '../../components/restaurantdashboard/DetailsEdit';
import EditMenu from '../../components/restaurantdashboard/EditMenu';
import Orders from '../../components/restaurantdashboard/Orders';

const RestaurantDashboard = (props) => {
  return (
    <CustomTab TabList={["Active Orders", "Orders", "History", "Addresses", "Menu"]} TabCompList={[
      // <Profile {...props} />, <Orders {...props} />, <History {...props} />, <Addresses {...props} />
      <ActiveOrders {...props} />,<Orders {...props} />, <DeliveryPerson {...props} />, <DetailsEdit {...props} />, <EditMenu {...props} />
    ]} />
  )
}

export default RestaurantDashboard; 