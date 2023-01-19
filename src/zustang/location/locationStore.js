import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const locationStore = (set) => ({
  recentAddress: {},
  address: "",
  city: "",
  state: "",
  pincode: "",
  lat: "",
  lng: "",
  addressModel: false,
  resetData: () => set(state => ({
    ...state,
    address: "",
    city: "",
    state: "",
    pincode: "",
    lat: "",
    lng: "",
    addressModel: false,
  })),
  setData: (obj) => set(state => ({ ...state, ...obj })),
  getPinCodeList: ({ pincode, cb }) => {
    apiCall({
      url: apiUrls.zipcode + pincode,
      method: 'get',
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  handleAddressModel: (addressModel = false) => set(state => ({ ...state, addressModel })),
  setRecentAddress: (obj) => set(state => ({ ...state, recentAddress: { ...obj } }))
})

export default create(locationStore);