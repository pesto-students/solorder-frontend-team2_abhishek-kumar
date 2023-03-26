import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import StarRateIcon from '@mui/icons-material/StarRate';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Rating } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import { numToAmount } from '../../utils';
import menuCheckoutStore from '../../zustang/menucheckout/menuCheckoutStore';
import commonStore from '../../zustang/common/commonStore';
import signInUpStore from '../../zustang/auth/signInUpStore';
import cartStore from '../../zustang/menucheckout/cartStore';

let cardStyle = {
  display: 'flex',
  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
  alignItems: 'center',
  justifyContent: "space-between",
  bgcolor: 'projDark.main',
  color: 'projPrimary.main',
}

let CardMediaStyle = {
  height: 170,
  margin: { xl: 1, lg: 1, md: 1, sm: 'auto', xs: 'auto' },
  borderRadius: 1,
  width: "100%"
}

function MenuHead({ restaurant_id, getRestaurantData }) {
  const { restDetails } = restaurantStore(s => s)
  const { itemType, handleItemType, handleGalaryView, updateRating } = menuCheckoutStore(s => s)
  const { notify, isLoader } = commonStore(state => state)
  const { userData } = signInUpStore(s=>s)
  const { bears, addABear } = cartStore(s=>s)
  const [defaultUrl, setDefaultUrl] = React.useState("")

  const { galaryImgs, name, cuisines, address, city, state, pincode, deliveryTime, costForTwo } = restDetails
  React.useEffect(() => {
    if (galaryImgs?.length) {
      galaryImgs.forEach((img) => {
        if (img?.isDefaultImg) setDefaultUrl(img?.url)
      })
    }
  }, [galaryImgs])

  React.useEffect(() => {
    handleItemType(1)
  }, [])

  const handleNonVeg = (e) => {
    handleItemType(Number(e.target.value));
  }

  const handleRating = (e, value) => {
    if (value) updateRating({
      restaurant_id,
      data: { ratingValue: value },
      cb: (res) => {
        if (res.error)
          notify(res.msg, "error")
        else
          getRestaurantData(true)
      }
    })
  }

  let ratingSx= {
    ".MuiRating-iconEmpty": {
      "display": "flex",
      "WebkitTransition": "-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "transition": "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "pointerEvents": "none",
      "color": "#faaf00ad"
    },
    ".MuiRating-labelEmptyValueActive": {
      "display": "flex",
      "WebkitTransition": "-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "transition": "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "pointerEvents": "none",
      "color": "#faaf00ad"
    }
  }

  return (
    <Card sx={cardStyle}>
      <Box sx={{ width: { xl: "33%", lg: "33%", md: "33%", sm: '100%', xs: '100%' }, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%" }} >
          <CardMedia
            sx={CardMediaStyle}
            component="img"
            image={defaultUrl}
            alt="green iguana"
          />
          <CollectionsIcon sx={{ position: "absolute", bottom: 8, right: -2, bgcolor: "#7a7676", padding: "2px", borderRadius: 1, width: 30, height: 30, cursor: "pointer" }} onClick={() => { handleGalaryView(true) }} />
        </div>
      </Box>
      <CardContent sx={{ margin: "0px 3%", width: { xl: "33%", lg: "33%", md: "33%", sm: '100%', xs: '100%' } }}>
        <Typography gutterBottom variant="h5" component="div">
          {name || ""}
        </Typography>
        <Typography variant="body2" component="div" color="projPrimary.darker">
          {cuisines?.length && cuisines.join(", ") || ""}
        </Typography>
        <Typography variant="body2" component="div" color="projPrimary.darker">
          {`${address || ""}, ${city || ""}, ${state || ""}, ${pincode || ""}`}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" margin={"5px 0"}>
          <Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <StarRateIcon fontSize="small" sx={{ marginRight: "2px" }} />
              <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.7px">
                {restDetails?.avgRating || 0}
              </Typography>
            </Box>
            <Typography variant="body2" component="div" color="projPrimary.darker" fontSize={"0.7em"}>
              {restDetails?.ratingList && Object.keys(restDetails.ratingList).length || 0} Rating
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.5px">
              {deliveryTime && deliveryTime + " Mins" || ""}
            </Typography>
            <Typography variant="body2" component="div" color="projPrimary.darker" fontSize={"0.7em"}>
              Delivery Time
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.5px">
              {costForTwo && numToAmount(costForTwo) || ""}
            </Typography>
            <Typography variant="body2" component="div" color="projPrimary.darker" fontSize={"0.7em"}>
              Cost for two
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent sx={{ width: { xl: "33%", lg: "33%", md: "33%", sm: '100%', xs: '100%' } }}>
        <Box bgcolor="rgba(255, 255, 255, 0.29)" display={"flex"} flexDirection={"row"} alignItems="center" justifyContent={"space-evenly"} padding={"10px 30px"} borderRadius={"10px"} width="100%">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleNonVeg}
              value={itemType}
            >
              <FormControlLabel value="1" control={<Radio sx={{ color: "#E9CB2F", '&.Mui-checked': { color: "#E9CB2F" } }} />} label="All" />
              <FormControlLabel value="2" control={<Radio sx={{ color: "#74B71F", '&.Mui-checked': { color: "#74B71F" } }} />} label="Veg" />
              <FormControlLabel value="3" control={<Radio sx={{ color: "#F53C3C", '&.Mui-checked': { color: "#F53C3C" } }} />} label="Non-Veg" />
            </RadioGroup>
          </FormControl>
          <Box display={"flex"} flexDirection={"column"} alignItems="center" >
            <Rating name="half-rating" sx={ratingSx} precision={0.5} bgcolor="white" value={userData?.user_id ? (restDetails?.ratingList?.[String(userData.user_id)] || 0) : 0} onChange={handleRating} />
            <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.5px">
              Rate me
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MenuHead;