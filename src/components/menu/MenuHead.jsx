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

function MenuHead(props) {
  return (
    <Card sx={cardStyle}>
      <Box sx={{ width: { xl: "33%", lg: "33%", md: "33%", sm: '100%', xs: '100%' }, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%" }} >
          <CardMedia
            sx={CardMediaStyle}
            component="img"
            image="https://shorturl.at/guzDP"
            alt="green iguana"
          />
          <CollectionsIcon sx={{ position: "absolute", bottom: 8, right: 0, bgcolor: "#7a7676", padding: "2px", borderRadius: 1, width: 30, height: 30 }} />
        </div>
      </Box>
      <CardContent sx={{ margin: "0px 3%", width: { xl: "33%", lg: "33%", md: "33%", sm: '100%', xs: '100%' } }}>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" component="div" color="projPrimary.darker">
          Chinese, Thai, Asian
        </Typography>
        <Typography variant="body2" component="div" color="projPrimary.darker">
          Jyoti Nivas College Road, Kpramangala
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" margin={"5px 0"}>
          <Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <StarRateIcon fontSize="small" sx={{ marginRight: "2px" }} />
              <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.7px">
                4.5
              </Typography>
            </Box>
            <Typography variant="body2" component="div" color="projPrimary.darker" fontSize={"0.7em"}>
              100 Rating
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.5px">
              31 Mins
            </Typography>
            <Typography variant="body2" component="div" color="projPrimary.darker" fontSize={"0.7em"}>
              Delivery Time
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" component="div" fontWeight={600} fontSize={"1em"} color="projPrimary.darker" paddingTop="1.5px">
              ₹2000
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
            >
              <FormControlLabel value="female" control={<Radio sx={{ color: "#E9CB2F", '&.Mui-checked': { color: "#E9CB2F" } }} />} label="All" />
              <FormControlLabel value="male" control={<Radio sx={{ color: "#74B71F", '&.Mui-checked': { color: "#74B71F" } }} />} label="Veg" />
              <FormControlLabel value="other" control={<Radio sx={{ color: "#F53C3C", '&.Mui-checked': { color: "#F53C3C" } }} />} label="Non-Veg" />
            </RadioGroup>
          </FormControl>
          <Box display={"flex"} flexDirection={"column"} alignItems="center" >
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} bgcolor="white" />
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