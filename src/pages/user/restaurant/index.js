import styled from '@emotion/styled';
import { Button, Divider, Grid, ListItemIcon, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import RestaurantCard from '../../../components/restaurantCard';
import TuneIcon from '@mui/icons-material/Tune';
import SignInModel from '../../../components/auth/SignInModel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RestaurantList = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const CusBox = styled(Box)(({ theme, ...props }) => ({
    "display": "flex",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "MsFlexAlign": "center",
    "alignItems": "center",
    "WebkitBoxPack": "center",
    "MsFlexPack": "center",
    "WebkitJustifyContent": "center",
    "justifyContent": "center",
    "position": "relative",
    "boxSizing": "border-box",
    "WebkitTapHighlightColor": "transparent",
    "backgroundColor": "transparent",
    "outline": "0",
    "border": "0",
    "margin": "0",
    "borderRadius": "0",
    "padding": "12px 16px",
    "cursor": "pointer",
    "WebkitUserSelect": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "userSelect": "none",
    "verticalAlign": "middle",
    "MozAppearance": "none",
    "WebkitAppearance": "none",
    "WebkitTextDecoration": "none",
    "textDecoration": "none",
    "color": "#121112",
    "fontFamily": "\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
    "fontWeight": "500",
    "fontSize": "0.875rem",
    "lineHeight": "1.25",
    "letterSpacing": "0.02857em",
    "textTransform": "uppercase",
    "maxWidth": "360px",
    "minWidth": "90px",
    "minHeight": "48px",
    "WebkitFlexShrink": "0",
    "MsFlexNegative": "0",
    "flexShrink": "0",
    "overflow": "hidden",
    "whiteSpace": "normal",
    "textAlign": "center",
    "WebkitFlexDirection": "row",
    "MsFlexDirection": "row",
    "flexDirection": "row",
    "width": props?.width || "",
    ...props?.styles
  }))

  const CusButton = {
    "display": "flex",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "MsFlexAlign": "center",
    "alignItems": "center",
    "WebkitBoxPack": "center",
    "MsFlexPack": "center",
    "WebkitJustifyContent": "center",
    "position": "relative",
    "boxSizing": "border-box",
    "WebkitTapHighlightColor": "transparent",
    "backgroundColor": "transparent",
    "outline": "0",
    "border": "0",
    "margin": "0",
    "borderRadius": "0",
    "cursor": "pointer",
    "WebkitUserSelect": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "userSelect": "none",
    "verticalAlign": "middle",
    "MozAppearance": "none",
    "WebkitAppearance": "none",
    "WebkitTextDecoration": "none",
    "textDecoration": "none",
    "color": "#121112",
    "fontFamily": "\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
    "fontWeight": "500",
    "fontSize": "0.875rem",
    "lineHeight": "1.25",
    "letterSpacing": "0.02857em",
    "textTransform": "uppercase",
    "maxWidth": "360px",
    "minWidth": "90px",
    "minHeight": "48px",
    "WebkitFlexShrink": "0",
    "MsFlexNegative": "0",
    "flexShrink": "0",
    "overflow": "hidden",
    "whiteSpace": "normal",
    "textAlign": "center",
    "WebkitFlexDirection": "row",
    "MsFlexDirection": "row",
    "flexDirection": "row",
    justifyContent: "end",
  }


  return (
    <>
      <Grid container sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <CusBox styles={{ width: "100%", justifyContent: "start", "padding": "12px 0px" }}>
            121 restaurant
          </CusBox>
        </Grid>
        <Grid item lg={7} md={7} sm={0} xs={0} sx={{ display: { lg: 'block', md: "block", sm: 'none', xs: "none" } }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="basic tabs example">
            <Tab label="Relevance" {...a11yProps(0)} />
            <Tab label="Delivery Time" {...a11yProps(1)} />
            <Tab label="Rating" {...a11yProps(2)} />
            <Tab label="Cost: Low To High" {...a11yProps(3)} />
            <Tab label="Cost: High To Low" {...a11yProps(4)} />
          </Tabs>
        </Grid>
        <Grid item display={"grid"} lg={1} md={1} sm={6} xs={6}>
          <Button
            sx={CusButton}
            onClick={handleOpenUserMenu}>
            Filter <TuneIcon />
          </Button>
        </Grid>
      </Grid>
      <SignInModel />
      <Grid container rowSpacing={2} columnSpacing={1}>
        {[...Array(50).fill(0)].map(() => (<Grid item lg={3} md={4} sm={6} xs={12}>
          <RestaurantCard />
        </Grid>))}
      </Grid>
      <Menu
        anchorEl={anchorElUser}
        id="account-menus"
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ display: { xs: "block", sm: "none" } }} >
          <ListItemIcon>
            {/* <Badge badgeContent={4} color="projSecondary" sx={{ color: "#F5F5F5", fontSize: "2px" }}>
                    <ShoppingCartIcon fontSize="small" sx={{ color: "#666565" }} />
                  </Badge> */}
          </ListItemIcon>
          Cart
        </MenuItem>
        <Divider sx={{ display: { xs: "block", sm: "none" } }} />
        <MenuItem sx={{ display: { xs: "block", sm: "none" } }}>
          <ListItemIcon>
            {/* <PersonIcon fontSize="small" /> */}
          </ListItemIcon>
          Sign In
        </MenuItem>
        <Divider sx={{ display: { xs: "block", sm: "none" } }} />
        <MenuItem>
          <ListItemIcon>
            {/* <AccountCircleSharpIcon fontSize="small" /> */}
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            {/* <MenuBookSharpIcon fontSize="small" /> */}
          </ListItemIcon>
          Orders
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            {/* <HistoryToggleOffSharpIcon fontSize="small" /> */}
          </ListItemIcon>
          History
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            {/* <LogoutSharpIcon fontSize="small" /> */}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default RestaurantList;