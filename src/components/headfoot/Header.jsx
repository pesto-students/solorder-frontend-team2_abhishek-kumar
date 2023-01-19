import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Badge, Divider, FormControl, FormHelperText, ListItemIcon, Switch } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import HistoryToggleOffSharpIcon from '@mui/icons-material/HistoryToggleOffSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MenuIcon from '@mui/icons-material/Menu';
import signInUpStore from '../../zustang/auth/signInUpStore';
import commonStore from '../../zustang/common/commonStore';
import { setToken, setUserData } from '../../utils';
import cartStore from '../../zustang/menucheckout/cartStore';
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddressAutoComplete from './AddressAutoComplete';
import { Stack } from '@mui/system';
import SearchRest from './SearchRest';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import { useParams } from 'react-router-dom';


function Header() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartCount, setCartCount] = React.useState(0);
  const { handleModel, userData, signOut } = signInUpStore(state => state)
  const { notify, isLoader } = commonStore(state => state)
  var { restDetails, updateActiveRestaurant, getRestaurantDetails } = restaurantStore(s => s)
  const location = useLocation();
  let { restaurant_id } = useParams();
  let navigate = useNavigate();
  const {
    cartItems,
    resetItemToCart
  } = cartStore(s => s)

  React.useEffect(() => {
    setCartCount(Object.keys(cartItems).length || 0)
  }, [cartItems])
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogOut = (e) => {
    e?.preventDefault();
    isLoader(true)
    signOut({
      cb: (res) => {
        let { error, msg } = res
        if (!error) {
          notify(msg, 'success')
          setUserData({})
          setToken("")
          resetItemToCart()
          handleCloseUserMenu()
          navigate("/")
          if (window?.location?.reload)
            window.location.reload(false)
          isLoader(false)
        } else {
          notify(msg, 'error')
          isLoader(false)
        }
      }
    })
  }

  const handleActiveChange = (event) => {
    isLoader(true)
    updateActiveRestaurant({
      restaurant_id,
      isActive: event.target.checked,
      cb: (res) => {
        if (res.error) {
          notify(res.msg, "error")
          isLoader(false)
        } else {
          getRestaurantDetails({
            restaurant_id, cb: (response) => {
              isLoader(false)
              if (response.error) {
                notify(response.msg, "error")
              } else {
                notify(res.msg, "success")
              }
            }
          })
        }
      }
    })
  };

  return (
    <AppBar id="HeaderEle" position="fixed" color='projPrimary' sx={{ filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1))", top: 0, bottom: 'auto' }}>
      <Container maxWidth="lg" >
        <Toolbar disableGutters sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tooltip title="Solorder">
            <img
              src="/image/solorder-logo.svg"
              alt="Solorder Logo"
              loading="lazy"
              width="64"
            />
          </Tooltip>
          <Stack direction="row" width={{ xs: "73%", sm: "60%" }} mr={{ xs: 1, sm: 0 }} justifyContent='space-between'>
            {location.pathname === "/" && (userData?.role_id === 1) ? <AddressAutoComplete /> : ""}
            {location.pathname === "/" ? <SearchRest /> : ""}
          </Stack>
          <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: { sm: "min-content", md: userData && Object.keys(userData).length && userData?.role_id === 1 ? "6rem" : userData?.role_id === 2 ? "9rem" : "11rem" } }}>
            <Box display={{ xs: "none", sm: "flex" }} flexDirection="row" alignItems={"center"} justifyContent="space-around" width="50%">
              {userData?.role_id === 2 ?
                <>
                  <FormControl component="fieldset" variant="standard" >
                    <Switch inputProps={{ 'aria-label': 'controlled' }} checked={restDetails?.isActive || false} onChange={handleActiveChange} color="success" />
                    <FormHelperText>Store Active</FormHelperText>
                  </FormControl>
                </>
                :
                <Tooltip title={cartCount ? "Go to cart." : "No Item in cart."}>
                  <Link to={cartCount ? '/checkout' : ""}>
                    <IconButton sx={{ p: 1 }}>
                      <Badge badgeContent={cartCount} color="projSecondary" sx={{ color: "#F5F5F5" }}>
                        <ShoppingCartIcon color="projDark" fontSize="large" />
                      </Badge>
                    </IconButton>
                  </Link>
                </Tooltip>}
            </Box>
            {userData && Object.keys(userData).length ? <Box display={{ xs: "none", sm: "block" }}>
              <Tooltip title="Open settings" >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData?.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box> : ""}
            <Box display={{ xs: "block", sm: "none" }}>
              <Tooltip title="Open settings" >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MenuIcon color="projDark" fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
            {userData && !Object.keys(userData).length ? <Box display={{ xs: "none", sm: "flex" }} flexDirection="row" alignItems={"center"} justifyContent="space-around" width="50%" onClick={(e) => handleModel(true)}>
              <Tooltip title="Sign In">
                <IconButton sx={{ p: 0 }}>
                  <PersonIcon color="projDark" fontSize="large" />
                </IconButton>
              </Tooltip>
              <Typography color="projDark">Sign In</Typography>
            </Box> : ""}
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
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
              {userData?.role_id === 2 ?
                <MenuItem sx={{ display: { xs: "block", sm: "none" } }} >
                  <FormControl component="fieldset" variant="standard" sx={{ pl: 3 }}>
                    <Switch inputProps={{ 'aria-label': 'controlled' }} checked={restDetails?.isActive || false} onChange={handleActiveChange} color="success" />
                    <FormHelperText>Store Active</FormHelperText>
                  </FormControl>
                </MenuItem>
                :
                <MenuItem sx={{ display: { xs: "block", sm: "none" } }} >
                  <Link to={cartCount ? '/checkout' : ""}>
                    <ListItemIcon>
                      <Badge badgeContent={cartCount} color="projSecondary" sx={{ color: "#F5F5F5", fontSize: "2px" }}>
                        <ShoppingCartIcon fontSize="small" sx={{ color: "#666565" }} />
                      </Badge>
                    </ListItemIcon>
                    Cart
                  </Link>
                </MenuItem>}
              <Divider sx={{ display: { xs: "block", sm: "none" } }} />
              {!userData || !Object.keys(userData).length ? [
                <MenuItem sx={{ display: { xs: "block", sm: "none" } }} onClick={(e) => handleModel(true)}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Sign In
                </MenuItem>] : ""}
              {userData?.role_id === 1 ?
                [
                  <MenuItem onClick={() => { navigate("/setting") }}>
                    <ListItemIcon>
                      <MenuBookSharpIcon fontSize="small" />
                    </ListItemIcon>
                    Orders
                  </MenuItem>,
                  <Divider />
                ] :
                userData?.role_id === 2 ?
                  [<MenuItem onClick={() => { navigate("/restaurant/dashboard/" + (userData?.restaurant_id || "")) }}>
                    <ListItemIcon>
                      <HistoryToggleOffSharpIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>,
                  <Divider />]
                  : ""}
              {userData && Object.keys(userData).length ? [
                <MenuItem onClick={() => { navigate("/setting") }}>
                  <ListItemIcon>
                    <AccountCircleSharpIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>,
                <Divider />,
                <MenuItem onClick={onLogOut}>
                  <ListItemIcon>
                    <LogoutSharpIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              ] : ""}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
