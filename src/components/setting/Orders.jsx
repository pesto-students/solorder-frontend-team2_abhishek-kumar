import { Box } from '@mui/system'
import React from 'react'
import commonStore from '../../zustang/common/commonStore'
import dashboardStore from '../../zustang/restaurant/dashboardStore'
import OrderTable from '../orderTable'

const Orders = () => {
  const { getPastOrders, pastOrdersList, handleActiveModel } = dashboardStore(s => s)
  const { isLoader, notify } = commonStore(s => s)
  React.useEffect(() => {
    isLoader(true)
    getPastOrders({
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }, [])
  return (
    <Box p={2} ><OrderTable pastOrdersList={pastOrdersList} handleActiveModel={handleActiveModel} /></Box>
  )
}

export default Orders