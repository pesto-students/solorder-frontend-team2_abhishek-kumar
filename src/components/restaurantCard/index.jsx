import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

function RestaurantCard() {

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

  return (
    <MenuCard sx={{ padding: 1 }}>
      <CardActionArea sx={{ marginBottom: 1 }}>
        <CardMedia
          component="img"
          height="40%"
          image="https://shorturl.at/guzDP"
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" fontWeight={800} fontSize={"1.5em"}>
            Ziaka International
          </Typography>
          <Typography variant="p" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            Lizards, lorem, lorem
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", pl: 1, pr: 1, pb: 0, pt: 0 }} >
          <Typography variant="p" component="span" fontWeight={600} fontSize={"1em"} display="flex" alignItems="center" justifyContent="center" color={"projPrimary.main"} bgcolor={"green"} p={"2px 4px"}>
            <StarIcon fontSize="small" sx={{ marginRight: "2px" }} />4.5
          </Typography>
          <Typography variant="p" component="span" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            31 Mins
          </Typography>
          <Typography variant="p" component="span" color="text.secondary" fontWeight={600} fontSize={"1em"}>
            ₹ 200 For Two
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MenuButton>
          View Menu
        </MenuButton>
      </CardActions>
    </MenuCard>
  );
}

export default RestaurantCard;