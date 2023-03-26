import create from 'zustand';
import apiCall from '../../common/apiCall';
import apiUrls from '../../common/apiUrls';

const dashboardStore = (set) => ({
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

  deliveryPerModel: false,
  handleDeliveryPerModel: (deliveryPerModel = false) => {set(state => ({ ...state, deliveryPerModel: deliveryPerModel }))},

  activeOrdersList: [],
  getActiveOrders: ({ cb }) => {
    apiCall({
      url: apiUrls.activeorders,
      method: 'get',
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, activeOrdersList: res?.data?.data || [] }));
        cb && cb(res.data);
      }
    })
  },

  pastOrdersList: [],
  getPastOrders: ({ cb }) => {
    apiCall({
      url: apiUrls.pastorders,
      method: 'get',
      cb: (res) => {
        if (!res?.data?.error)
          set(state => ({ ...state, pastOrdersList: res?.data?.data || [] }));
        cb && cb(res.data);
      }
    })
  },

  createOrder: ({ data, cb }) => {
    apiCall({
      url: apiUrls.createorder,
      method: 'post',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },
  updateOrder: ({ data, cb }) => {
    apiCall({
      url: apiUrls.updateorder,
      method: 'put',
      data,
      cb: (res) => {
        cb && cb(res.data);
      }
    })
  },

  activeOrderId: null,
  openActiveModel: false,
  viewOnlyModel : false,
  isPastOrder: false,
  handleActiveModel: (openActiveModel = false, activeOrderId = null, viewOnlyModel=false, isPastOrder=false) => {
    set(state => ({
      ...state,
      openActiveModel: openActiveModel,
      activeOrderId: activeOrderId,
      viewOnlyModel: viewOnlyModel ? true : false,
      isPastOrder: isPastOrder ? true : false
    }));
  }
})

export default create(dashboardStore);