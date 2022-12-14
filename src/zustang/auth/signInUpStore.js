import create from 'zustand';
// import { persist } from 'zustand/middleware'
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';
import { getToken, getUserData } from '../../utils';

const signInUpStore = (set) => {
  let userData = getUserData()
  let token = getToken()

  console.log({ userData, token })
  return {
    modelOpen: false,
    signUpModelOpen: false,
    userData: userData ? userData : {},
    token: token ? token : "",

    handleModel: (isOpen = false) => set(state => ({ ...state, modelOpen: isOpen })),
    signUpHandleModel: (isOpen = false) => set(state => ({ ...state, signUpModelOpen: isOpen })),
    signUp: ({ data, cb }) => {
      apiCall({
        url: apiUrls.signup,
        method: 'post',
        data,
        cb: (res) => {
          cb(res.data);
        }
      })
    },
    signIn: ({ data, cb }) => {
      apiCall({
        url: apiUrls.signin,
        method: 'post',
        data,
        cb: (res) => {
          if (!res?.data?.error)
            set(state => ({ ...state, userData: res?.data?.data || {}, token: res?.data?.token || "" }))
          cb(res.data);
        }
      })
    },
    signOut: ({ cb }) => {
      apiCall({
        url: apiUrls.signout,
        method: 'get',
        cb: (res) => {
          if (!res?.data?.error)
            set(state => ({ ...state, userData: {}, token: "" }))
          cb(res.data);
        }
      })
    }
  }
};

export default create(signInUpStore);