import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const settingStore = (set) => ({
  getProfileData: ({ cb }) => {
    apiCall({
      url: apiUrls.getProfile,
      method: 'get',
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  updateProfileData: ({ data, cb }) => {
    apiCall({
      url: apiUrls.updateProfile,
      method: 'put',
      data: data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  addressList: [],
  getAddresseData: ({ cb }) => {
    apiCall({
      url: apiUrls.getAddressList,
      method: 'get',
      cb: (res) => {
        set(state => ({ ...state, addressList: res?.data?.data || [] }))
        cb && cb(res.data);
      }
    })
  },
  saveAddresseData: ({ cb, data }) => {
    apiCall({
      url: apiUrls.addAddress,
      method: 'post',
      data: data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  updateAddress: ({ cb, data, address_id }) => {
    apiCall({
      url: apiUrls.addAddress + address_id,
      method: 'post',
      data: data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
})

export default create(settingStore);