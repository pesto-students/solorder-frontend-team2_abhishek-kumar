import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import { numToAmount } from '../../utils';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurantData }) {

  const {
    restaurant_id,
    name,
    deliveryTime,
    galaryImgs,
    costForTwo,
    avgRating,
    cuisines,
  } = restaurantData

  const [imgDefaultUrl, setImgDefaultUrl] = useState("")
  let navigate = useNavigate();

  useEffect(() => {
    if (galaryImgs && galaryImgs.length > 0) {
      galaryImgs.forEach(imgData => {
        if (imgData.isDefaultImg)
          setImgDefaultUrl(imgData.url)
      });
    }
  }, [galaryImgs]);

  const MenuButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.projSecondary.main),
    margin: 'auto',
    width: "100%",
    borderRadius: "5px",
    backgroundColor: theme.palette.projSecondary.main,
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.projSecondary.darker),
      margin: 'auto',
      width: "100%",
      borderRadius: "5px",
      backgroundColor: theme.palette.projSecondary.darker
    },
  }));

  const MenuCard = styled(Card)(({ theme }) => ({
    boxShadow: "0px 3px 50px -20px rgba(0,0,0,0)",
    '&:hover': {
      boxShadow: "0px 3px 50px -20px rgba(0,0,0,1)",
    }
  }))

  const ratingColor = (rating = 0) => {
    if (rating < 3)
      return "#F53C3C"
    else if (rating >= 3 && rating < 4)
      return "#E9CB2F"
    else
      return "#7DC247"
  }

  return (
    <MenuCard sx={{ padding: 1 }}>
      <CardActionArea sx={{ marginBottom: 1 }}>
        <CardMedia
          component="img"
          height="40%"
          image={imgDefaultUrl || "/image/blank.png"}
          alt="green iguana"
          sx={{background: "url('/image/blank.png') no-repeat"}}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" fontWeight={800} fontSize={"1.5em"}>
            {name || ""}
          </Typography>
          <Typography variant="p" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            {cuisines && cuisines.length > 0 && cuisines.join(", ") || ""}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", pl: 1, pr: 1, pb: 0, pt: 0 }} >
          <Typography variant="p" component="span" width={50} fontWeight={600} fontSize={"1em"} display="flex" alignItems="center" justifyContent="center" color={"projPrimary.main"} bgcolor={ratingColor(avgRating)} p={"2px 4px"}>
            <StarIcon fontSize="small" sx={{ marginRight: "2px" }} />{avgRating || 0}
          </Typography>
          <Typography variant="p" component="span" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            {deliveryTime || "0"} Mins
          </Typography>
          <Typography variant="p" component="span" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            {costForTwo && numToAmount(costForTwo) || "₹0"} For Two
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MenuButton onClick={() => { navigate(`/menu/${restaurant_id}`) }}>
          View Menu
        </MenuButton>
      </CardActions>
    </MenuCard>
  );
}

export default RestaurantCard;