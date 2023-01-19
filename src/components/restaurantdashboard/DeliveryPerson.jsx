import React from 'react'
import AddressAndDelivery from '../addressAndDelivery';
import Grid from '@mui/material/Grid';
import commonStore from '../../zustang/common/commonStore';
import dashboardStore from '../../zustang/restaurant/dashboardStore';


const DeliveryPerson = (props) => {
  const { delieveryPersonList, deleteDelieveryPerson, handleDeliveryPerModel, getDelieveryPersonList } = dashboardStore(s => s)
  const { isLoader, notify } = commonStore(s => s)
  React.useEffect(() => {
    getDelPersonList()
  }, [])

  const getDelPersonList = () => {
    isLoader(true)
    getDelieveryPersonList({
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }

  const onDelete = (person_id) => {
    if (person_id) {
      isLoader(true)
      deleteDelieveryPerson({
        person_id,
        cb: (res) => {
          isLoader(false)
          if (res.error)
            notify(res.msg, "error")
          else {
            notify(res.msg, "success")
            getDelPersonList()
          }
        }
      })
    }
  }

  return (
    <Grid container spacing={2} p={2}>
      {delieveryPersonList && delieveryPersonList.length ?
        delieveryPersonList.map((deliveryData) => (
          <Grid item md={4} sm={6} xs={12}>
            <AddressAndDelivery delivery deliveryData={deliveryData} onDelete={onDelete} />
          </Grid>
        ))
        : ""}
      <Grid item md={4} sm={6} xs={12}>
        <AddressAndDelivery AddDeliveryPerson onAdd={()=>{handleDeliveryPerModel(true)}} />
      </Grid>
    </Grid>
  )
}

export default DeliveryPerson;