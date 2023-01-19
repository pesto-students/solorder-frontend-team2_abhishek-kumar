import create from 'zustand'
import { persist } from 'zustand/middleware'

const cartStore = create(
  persist(
    (set, get) => ({
      cartItems: {},
      cartRestaurantId: null,
      cartUserId: null,
      addItemToCart: (itemObj, itemCount = 0, restaurant_id, user_id = null) => {
        let cartRestaurantId = get().cartRestaurantId
        if (Number(cartRestaurantId) !== Number(restaurant_id)) {
          set({
            cartItems: {},
            cartRestaurantId: null,
            cartUserId: null
          })
        }
        let tempCartItems = get().cartItems
        if (itemCount)
          tempCartItems[String(itemObj?.item_id)] = { itemData: itemObj, itemCount }
        else
          delete tempCartItems[String(itemObj?.item_id)]
        let itemsCount = Object.keys(tempCartItems).length
        return set({ cartItems: { ...tempCartItems }, cartRestaurantId: itemsCount ? restaurant_id : null, cartUserId: itemsCount ? user_id : null })
      },
      resetItemToCart: () => set({
        cartItems: {},
        cartRestaurantId: null,
        cartUserId: null
      }),
      cartAddressData: {},
      setAddressData: (data) => set({
        ...get(), cartAddressData: data
      }),
      setCartUserId: (user_id = null) => set({ cartUserId: user_id })
    }),
    {
      name: 'cart-store', // name of the item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
)

export default cartStore;