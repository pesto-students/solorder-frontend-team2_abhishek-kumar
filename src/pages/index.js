
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <ThemeProvider theme={theme}>
      <Loader />
      <HeadFoot>
        <BrowserRouter>
          <Routes>
            <Route path="/registration/:restaurant_id" element={<Registration />} />
            <Route path="/menu/:restaurant_id" element={<Menu />} />
            <Route path="/setting" element={<Setting />} /> 
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} /> 
            <Route path="/" element={<RestaurantList />} />
          </Routes>
        </BrowserRouter>
      </HeadFoot>
      <SignInModel />
      <SignUpModel />
      <SoloSnackbar />
    </ThemeProvider>
  );
}

export default PageRoutes;