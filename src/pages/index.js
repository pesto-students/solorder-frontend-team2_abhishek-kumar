import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeadFoot from "../components/headfoot";
import RestaurantList from "./user/restaurant";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInModel from "../components/auth/SignInModel";
import SignUpModel from "../components/auth/SignUpModel";
import SoloSnackbar from "../components/snackbar";
import Loader from "../components/loader";
import Registration from "./registration";
import "./style.css"
import Menu from "./menu";
import Setting from "./setting";
import RestaurantDashboard from "./restaurantdashboard";
import Checkout from "./checkout";
import AddressModal from "../components/addressModal";
import PageNotFound from "./pageNotFound";
import signInUpStore from "../zustang/auth/signInUpStore";
import ImageCrop from "../components/imageCrop/ImageCrop";
import MenuEditModel from "../components/menuCard/MenuEditModel";
import GalleryModel from "../components/menu/GalleryModel";
import settingStore from "../zustang/setting/settingStore";
import commonStore from "../zustang/common/commonStore";
import { setUserData } from "../utils";
import cartStore from "../zustang/menucheckout/cartStore";
import AddDeliveryPersonModel from "../components/restaurantdashboard/AddDeliveryPersonModel";
import ActiveOrderModel from "../components/restaurantdashboard/ActiveOrderModel";


const theme = createTheme({
  palette: {
    projPrimary: {
      main: "#FFFFFF",
      darker: "#E9ECEE",
    },
    projSecondary: {
      main: "#ED6A6A",
      darker: "#F53C3C",
    },
    projDark: {
      main: "#000000",
      darker: "#605A5A",
    },
    projBg: {
      main: "#E9ECEE",
      darker: "#BFB8B8",
    }
  },
});


function PageRoutes() {
  var { userData } = signInUpStore(s => s)
  var [isOwner, setIsOwner] = React.useState(false)
  let { getProfileData, getAddresseData, addressList } = settingStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  var { cartAddressData, setAddressData } = cartStore(s => s)

  React.useEffect(() => {
    getSetProfileData()
  }, [])

  function getSetProfileData() {
    if (userData && Object.keys(userData).length) {
      isLoader(true)
      getProfileData({
        cb: (res) => {
          isLoader(false)
          if (res.error) {
            notify(res.msg, "error")
          } else {
            let userData = res?.data || {};
            setUserData({ ...userData })
            setDefaultAddress()
          }
        }
      })
    } else {
      setAddressData({
        "address_id": 3,
        "address": "28AD Ram Colony",
        "state": "Odisha",
        "city": "Balasore H.O, Baleswar",
        "pincode": 756001,
        "latitude": "21.13410000",
        "longitude": "85.63650000"
      })
    }
  }

  const setDefaultAddress = () => {
    isLoader(true)
    getAddresseData({
      cb: (res) => {
        isLoader(false)
        let addressList = res?.data || [];
        if (!res.error && userData && Object.keys(userData).length && addressList && addressList.length && cartAddressData && Object.keys(cartAddressData).length === 0) {
          addressList.forEach((address, idx) => {
            if (userData?.defaultAddressId === address?.address_id) {
              setAddressData({ ...address })
            }
          })
        }
      }
    })
  }

  React.useEffect(() => {
    if ((userData?.role_id === 2) && userData?.restaurant_id)
      setIsOwner(true)
    else
      setIsOwner(false)
  }, [userData])

  var userRouter = createBrowserRouter([
    {
      path: "/",
      element: <HeadFoot><RestaurantList /></HeadFoot>
    },
    {
      path: "/menu/:restaurant_id",
      element: <HeadFoot><Menu /></HeadFoot>
    },
    {
      path: "/setting",
      element: <HeadFoot><Setting /></HeadFoot>
    },
    {
      path: "/checkout",
      element: <HeadFoot><Checkout /></HeadFoot>
    },
    {
      path: "/404",
      element: <HeadFoot><PageNotFound /></HeadFoot>
    },
    {
      path: "*",
      element: <HeadFoot><PageNotFound /></HeadFoot>
    },
  ]);

  var ownerRouter = createBrowserRouter([
    {
      path: "/registration/:restaurant_id",
      element: <HeadFoot><Registration /></HeadFoot>
    },
    {
      path: "/restaurant/dashboard/:restaurant_id",
      element: <HeadFoot><RestaurantDashboard /></HeadFoot>
    },
    {
      path: "/setting",
      element: <HeadFoot><Setting /></HeadFoot>
    },
    {
      path: "/404",
      element: <HeadFoot><PageNotFound /></HeadFoot>
    },
    {
      path: "*",
      element: <HeadFoot><PageNotFound /></HeadFoot>
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Loader />
      {isOwner ? <RouterProvider router={ownerRouter} /> : <RouterProvider router={userRouter} />}
      <MenuEditModel />
      <ImageCrop />
      <AddressModal />
      <SignInModel />
      <SignUpModel />
      <GalleryModel />
      <AddDeliveryPersonModel />
      <ActiveOrderModel />
      <SoloSnackbar />
    </ThemeProvider>
  );
}

export default PageRoutes;