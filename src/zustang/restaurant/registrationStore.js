import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const registrationStore = (set) => ({
  registrationData: {},
  setRestaurantData: (obj) => set(state => ({ ...state, registrationData: { ...state.registrationData, ...obj } })),
  imgFile: null,
  setImgFile: (file) => set(state => ({ ...state, imgFile: file })),
  cropModal: false,
  handleCropModal: (flg) => set(state => ({ ...state, cropModal: flg })),

  addEditModel: false,
  addCategory: false,
  categoryData: {},
  addItem: false,
  itemData: {},
  handleModel: ({
    addEditModel,
    addCategory,
    categoryData,
    addItem,
    itemData,
  }) => set(state => ({
    ...state,
    addEditModel: addEditModel || false,
    addCategory: addCategory || false,
    categoryData: categoryData && Object.keys(categoryData).length ? categoryData : {},
    addItem: addItem || false,
    itemData: itemData && Object.keys(itemData).length ? itemData : {}
  }))
})

export default create(registrationStore);