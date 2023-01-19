import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const restaurantStore = (set) => ({
  restDetails: {},
  menuList: [],
  getRestaurantDetails: ({ restaurant_id, cb }) => {
    apiCall({
      url: apiUrls.restaurantDetails + (restaurant_id || ""),
      method: 'get',
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, restDetails: res?.data?.data || {} }))
        cb(res.data);
      }
    })
  },
  saveRestaurant: ({ restaurant_id, data, cb }) => {
    apiCall({
      url: apiUrls.updateRestaurantDetails + (restaurant_id || ""),
      method: 'post',
      data,
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  updateActiveRestaurant: ({ restaurant_id, isActive, cb }) => {
    apiCall({
      url: apiUrls.updateRestaurantDetails + (restaurant_id || ""),
      method: 'post',
      data: { isActive: isActive ? true : false },
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  uploadImg: ({ restaurant_id, data, cb }) => {
    apiCall({
      url: apiUrls.uploadImg + (restaurant_id || ""),
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  setDefaultImg: ({ restaurant_id, data, cb }) => {
    apiCall({
      url: apiUrls.defaultImage + (restaurant_id || ""),
      method: 'put',
      data,
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  deleteImage: ({ restaurant_id, imgId, cb }) => {
    apiCall({
      url: apiUrls.deleteImage + (restaurant_id || "") + "/" + (imgId || ""),
      method: 'delete',
      cb: (res) => {
        cb(res.data);
      }
    })
  },
  getMenuItems: ({ cb, restaurant_id }) => {
    apiCall({
      url: apiUrls.getMenu + restaurant_id,
      method: 'get',
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, menuList: res?.data?.data || [] }));
        cb && cb(res.data);
      }
    })
  },
  addUpdateCategory: ({ restaurant_id, category_id, isNew, data, cb }) => {
    apiCall({
      url: `${apiUrls.category}${restaurant_id || ""}/?category_id=${category_id || ""}&isNew=${isNew || 0}`,
      method: 'put',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  deleteCategory: ({ restaurant_id, category_id, cb }) => {
    apiCall({
      url: `${apiUrls.category}${restaurant_id || ""}/?category_id=${category_id || ""}`,
      method: 'delete',
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  addUpdateItem: ({ restaurant_id, category_id, item_id, isNew, data, cb }) => {
    apiCall({
      url: `${apiUrls.item}${restaurant_id || ""}/${category_id || ""}/?item_id=${item_id || ""}&isNew=${isNew || 0}`,
      method: 'put',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  deleteItem: ({ restaurant_id, category_id, item_id, cb }) => {
    apiCall({
      url: `${apiUrls.item}${restaurant_id || ""}/${category_id || ""}?item_id=${item_id || ""}`,
      method: 'delete',
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  getPaymentOrderId: ({ data, cb }) => {
    apiCall({
      url: apiUrls.getOrderId,
      method: 'post',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  saveTransaction: ({ data, cb }) => {
    apiCall({
      url: apiUrls.saveTransaction,
      method: 'post',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  restaurantList: [],
  getRestaurantList: ({ data, cb }) => {
    apiCall({
      url: apiUrls.restaurantList,
      method: 'post',
      data,
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, restaurantList: res?.data?.data || [] }));
        cb && cb(res.data);
      }
    })
  },
  filterType: 0,
  setFilterType: (filterType) => (set(state => ({ ...state, filterType: filterType || 0 }))),
  searchValue: "",
  setSearchValue: (searchValue) => (set(state => ({ ...state, searchValue: searchValue || "" }))),
  
  delieveryPersonList: [],
  getDelieveryPersonList: ({ cb }) => {
    apiCall({
      url: apiUrls.deliveryperson,
      method: 'get',
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, delieveryPersonList: res?.data?.data || [] }));
        cb && cb(res.data);
      }
    })
  },
  addDelieveryPerson: ({ cb, data }) => {
    apiCall({
      url: apiUrls.deliveryperson,
      method: 'post',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  deleteDelieveryPerson: ({ cb, person_id }) => {
    apiCall({
      url: apiUrls.deliveryperson + `/${person_id}`,
      method: 'delete',
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
})

export default create(restaurantStore);