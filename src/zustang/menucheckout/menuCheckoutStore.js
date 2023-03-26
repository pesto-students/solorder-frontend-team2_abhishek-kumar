import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const menuCheckoutStore = (set) => ({
  itemType: 1,
  handleItemType: (itemType = 1) => set(state => ({ ...state, itemType: itemType })),
  galaryView:false,
  handleGalaryView: (galaryView = false) => set(state => ({ ...state, galaryView: galaryView })),
  updateRating: ({ restaurant_id, data, cb }) => {
    apiCall({
      url: apiUrls.updateRating + (restaurant_id || ""),
      method: 'put',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
})

export default create(menuCheckoutStore);