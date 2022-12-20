import React from 'react'
import CustomTab from '../../components/customtab';
import History from '../../components/setting/History';
import Orders from '../../components/setting/Orders';
import Profile from '../../components/setting/Profile';
import Addresses from '../../components/setting/Addresses';

const Setting = (props) => {
  return (
    <CustomTab TabList={["Profile", "Orders", "History", "Addresses"]} TabCompList={[<Profile {...props} />, <Orders {...props} />, <History {...props} />, <Addresses {...props} />]} />
  )
}

export default Setting;