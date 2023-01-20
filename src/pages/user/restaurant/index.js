import styled from '@emotion/styled';
import { Badge, Button, Divider, Grid, ListItemIcon, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import RestaurantCard from '../../../components/restaurantCard';
import TuneIcon from '@mui/icons-material/Tune';
import SignInModel from '../../../components/auth/SignInModel';
import restaurantStore from '../../../zustang/restaurant/restaurantStore';
import cartStore from '../../../zustang/menucheckout/cartStore';
import commonStore from '../../../zustang/common/commonStore';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RestaurantList = () => {
  const { isLoader, notify } = commonStore(s => s)
  const { restaurantList, getRestaurantList, filterType, setFilterType, searchValue } = restaurantStore(s => s)
  var { cartAddressData } = cartStore(s => s)

  const handleChange = (event, newValue) => {
    setFilterType(newValue);
  };

  React.useEffect(() => {
    if (Object.keys(cartAddressData).length) {
      fetchRestaurantList()
    }
  }, [cartAddressData, filterType]);

  const fetchRestaurantList = () => {
    let data = {
      "filterType": filterType && (Number(filterType) + 1) || 1,
      "pincode": cartAddressData?.pincode || null,
      "searchKey": searchValue || ""
    }
    isLoader(true)
    getRestaurantList({
      data,
      cb: (res) => {
        isLoader(false)
        if (res.error)
          notify(res.msg, "error")
      }
    })
  }

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
    display: { lg: 'none', md: "none", sm: 'flex', xs: "flex" },
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

let tabsStyle = {
  ".MuiTab-root.Mui-selected": {
    "color": "#121112 !important"
  },
  ".MuiTabs-indicator": {
    "backgroundColor": "#121112 !important"
  },
  "css_1c99szj_MuiRating_icon_css_1c99szj_MuiRating_icon": {
    "display": "flex",
    "WebkitTransition": "-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "transition": "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "pointerEvents": "none",
    "color": "#faaf00ad"
  }
}

  return (
    <>
      <Box container sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
        <CusBox styles={{ justifyContent: "start", "padding": "12px 0px" }}>
          {restaurantList && restaurantList.length || 0} restaurant
        </CusBox>


        <Tabs value={filterType} sx={tabsStyle} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="basic tabs example">
          <Tab label="Relevance" {...a11yProps(0)} />
          <Tab label="Delivery Time" {...a11yProps(1)} />
          <Tab label="Rating" {...a11yProps(2)} />
          <Tab label="Cost: Low To High" {...a11yProps(3)} />
          <Tab label="Cost: High To Low" {...a11yProps(4)} />
        </Tabs>


        <Button
          sx={CusButton}
          onClick={handleOpenUserMenu}>
          Filter <TuneIcon />
        </Button>

      </Box>
      <SignInModel />
      <Grid container rowSpacing={2} columnSpacing={1} minHeight="80vh">
        {restaurantList && restaurantList.length ?
          restaurantList.map((resData) => (<Grid item lg={3} md={4} sm={6} xs={12}>
            <RestaurantCard restaurantData={resData} />
          </Grid>)) : ""}
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
        <Tabs
          value={filterType}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
          orientation="vertical"
          variant="scrollable"
        >
          <Tab label="Relevance" {...a11yProps(0)} />
          <Tab label="Delivery Time" {...a11yProps(1)} />
          <Tab label="Rating" {...a11yProps(2)} />
          <Tab label="Cost: Low To High" {...a11yProps(3)} />
          <Tab label="Cost: High To Low" {...a11yProps(4)} />
        </Tabs>
      </Menu>
    </>
  )
}

export default RestaurantList;