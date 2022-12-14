import create from 'zustand';

const commonStore = (set) => ({
  isOpen: false,
  vertical: 'top',
  horizontal: 'center',
  msg: "",
  type: "success",
  duration: 3000,

  notify: (msg = "", type = "success", duration = 3000, vertical = "top", horizontal = "center") => set(state => ({ ...state, isOpen: true, msg, type, duration, vertical, horizontal })),
  closeNotify: (msg = "", type = "success", duration = 3000, vertical = "top", horizontal = "center") => set(state => ({ ...state, isOpen: false, msg, type, duration, vertical, horizontal })),

  loader: false,
  isLoader: (loader = false) => set(state => ({ ...state, loader }))
})

export default create(commonStore);