import React from 'react'
import CustomTab from '../../components/customtab';
import Orders from '../../components/setting/Orders';
import Profile from '../../components/setting/Profile';
import Addresses from '../../components/setting/Addresses';
import ActiveOrders from '../../components/restaurantdashboard/ActiveOrders';
import signInUpStore from '../../zustang/auth/signInUpStore';

const Setting = (props) => {
  const { userData } = signInUpStore(state => state)
  const [TabList, setTabList] = React.useState([])
  const [TabCompList, setTabCompList] = React.useState([])
  React.useEffect(() => {
    if (userData?.role_id === 1) {
      setTabList([<>Active&nbsp;Orders</>, "Profile", "Orders", "Addresses"])
      setTabCompList([<ActiveOrders viewOnly={true} {...props} />, <Profile {...props} />, <Orders {...props} />, <Addresses {...props} />])
    } else if (userData?.role_id === 2) {
      setTabList(["Profile", "Orders"])
      setTabCompList([<Profile {...props} />, <Orders {...props} />])
    }
  }, [])
  return (
    <CustomTab TabList={TabList} TabCompList={TabCompList} />
  )
}

export default Setting;