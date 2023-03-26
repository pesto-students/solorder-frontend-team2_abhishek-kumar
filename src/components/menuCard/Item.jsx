import React,{ useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import { numToAmount } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import registrationStore from '../../zustang/restaurant/registrationStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';
import signInUpStore from '../../zustang/auth/signInUpStore';
import menuCheckoutStore from '../../zustang/menucheckout/menuCheckoutStore';
import cartStore from '../../zustang/menucheckout/cartStore';

const paperSx = (props) => ({
  padding: "10px 5px 5px 10px",
  margin: 0.5,
  display: props?.display || "flex",
  alignItems: 'center',
  justifyContent: 'space-between',
  height: { lg: 65 },
})

const Item = (props) => {
  const { itemType } = menuCheckoutStore(s => s)

  const {
    cartItems,
    cartRestaurantId,
    cartUserId,
    addItemToCart,
    resetItemToCart
  } = cartStore(s => s)

  const {
    handleModel
  } = registrationStore(s => s)

  const {
    getMenuItems,
    deleteItem
  } = restaurantStore(s => s)

  const { notify, isLoader } = commonStore(state => state)
  const { userData } = signInUpStore(s => s)
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    let cartItemDetail = cartItems[String(props?.itemDetails?.item_id)] ? cartItems[String(props?.itemDetails?.item_id)] : null;
    if (cartItemDetail && (Number(props?.restaurant_id) === Number(cartRestaurantId))) {
      setCount(cartItemDetail?.itemCount)
    } else {
      setCount(0)
    }
  }, [])

  // useEffect(() => {
  //   if (props?.parent !== "checkout")
  //     addItemToCart((props?.itemDetails || {}), count, (props?.restaurant_id || cartRestaurantId || null), (userData?.user_id || null))
  // }, [count])

  const handleCountChange = (c) => {
    addItemToCart((props?.itemDetails || {}), c, (props?.restaurant_id || null), (userData?.user_id || null))
    setCount(c)
  }

  function AddBtn(props) {
    return (
      <>
        {count ? <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", bgcolor: "#2e7d32", width: "min-content", boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)", borderRadius: 1, alignSelf: "flex-end", height: 30, mr: 1 }}>
          <IconButton bgcolor="#2e7d32" aria-label="add an alarm" onClick={() => handleCountChange(count - 1)}>
            <RemoveIcon color="projPrimary" fontSize='small' />
          </IconButton>
          <Typography color="white" bgcolor="#2e7d32" fontWeight={500}>{count}</Typography>
          <IconButton bgcolor="#2e7d32" aria-label="add an alarm" onClick={() => handleCountChange(count + 1)}>
            <AddIcon color="projPrimary" fontSize='small' />
          </IconButton>
        </Box>
          :
          <Button variant="contained" color="success" size='small' sx={{ mr: 1 }} {...props} onClick={() => handleCountChange(count + 1)}>
            Add
          </Button>}
      </>
    )
  }

  const onDeleteItem = (e) => {
    e && e.stopPropagation();
    isLoader(true)
    deleteItem({
      category_id: (props?.itemDetails?.category_id || ""),
      item_id: (props?.itemDetails?.item_id || ""),
      restaurant_id: (userData?.restaurant_id || ""),
      cb: (res) => {
        isLoader(false)
        if (res.error) {
          notify(res.msg, "error")
        } else {
          getMenuItems({ restaurant_id: userData?.restaurant_id })
          notify(res.msg, "success")
        }
      }
    })
  }

  return (
    <Paper elevation={3} sx={paperSx({ display: props?.itemDetails?.isVeg && itemType === 3 ? "none" : !props?.itemDetails?.isVeg && itemType === 2 ? "none" : null })} >
      <Stack direction={"column"} flexBasis="90%">
        <Stack direction={{ xl: "row", lg: "row", md: "row", sm: (props.parent === "checkout" ? "row" : "row"), xs: (props.parent === "checkout" ? "row" : "column") }} alignItems={{ xl: "center", lg: "center", md: "center", sm: (props.parent === "checkout" ? "flex-start" : "center"), xs: "flex-start" }} justifyContent="start">
          <Box marginRight={2} ><img src={"/image/" + (props?.itemDetails?.isVeg ? "veg-icon.svg" : "non-veg-icon.svg")} alt={(props?.itemDetails?.isVeg ? "veg-icon" : "non-veg-icon")} height={"25px"} /></Box>
          <Typography flex={2} fontSize={props.parent === "checkout" ? "0.7rem" : ""}>{props?.itemDetails?.name || ""}</Typography>
          <Typography flex={2} fontSize={props.parent === "checkout" ? "0.8rem" : ""}>{props?.itemDetails?.price && numToAmount(props.itemDetails.price) || ""}</Typography>
        </Stack>
        {["checkout","activeOrder"].includes(props.parent) ? "" : <Typography marginLeft={{ xl: "4%", lg: "4%", md: "4%", sm: "4%", xs: "0px" }} color="projDark.darker" fontSize="0.7rem">{props?.itemDetails?.description || ""}</Typography>}
      </Stack>
      <Box>
        {['menu', 'checkout'].includes(props.parent) ?
          <AddBtn />
          : ["activeOrder"].includes(props.parent) ?
            <Stack direction="row">
              <Typography mr={1}>Qt.{props?.itemCount || ""}</Typography>
            </Stack>
          :
          <Stack direction="row">
            <Tooltip title="Delete Menu item" onClick={onDeleteItem}>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Menu item" onClick={(e) => { e.stopPropagation(); handleModel({ addEditModel: true, itemData: (props?.itemDetails && Object.keys(props.itemDetails).length && { ...props.itemDetails } || {}) }) }}>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      </Box>
    </Paper>
  )
}

export default Item;