const apiUrls = {
  signin: "/auth/signin",
  signup: "/auth/signup",
  signout: "/auth/signout",
  zipcode: "/location/zipcode/",
  restaurantDetails: "/restaurant/details/",
  updateRestaurantDetails: "/restaurant/updateDetails/",
  uploadImg: "/restaurant/image/",
  defaultImage: "/restaurant/defaultImage/",
  deleteImage: "/restaurant/deleteImage/",
  getMenu: "/restaurant/menu/",
  category: "/restaurant/category/",
  item: "/restaurant/item/",
  getOrderId: "/payment/order",
  saveTransaction: "/payment/saveTransaction",
  getProfile: "/dashboard/profile",
  updateProfile: "/dashboard/updateProfile",
  getAddressList: "/dashboard/addresses",
  addAddress: "/dashboard/addAddress",
  updateAddress: "/dashboard/updateAddress/",
  updateRating: "/restaurant/updateRating/",
  restaurantList: "/restaurant/restaurantList",
  deliveryperson: "/dashboard/deliveryperson",
  activeorders: "/restaurant/activeorders",
  pastorders: "/restaurant/pastorders",
  createorder: "/restaurant/createorder",
  updateorder: "/restaurant/updateorder",
  deleteAddress: "/dashboard/deleteAddress/",
  sendotp: "/auth/sendotp",
  validateotp: "/auth/validateotp",
  updatePasswordViaOtp: "/auth/updatePasswordViaOtp",
};

export default apiUrls;