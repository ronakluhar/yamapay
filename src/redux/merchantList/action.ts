import * as actionTypes from './actionType'
import api from '../../utils/API'

export const getMerChantList = () => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_MERCHANT_LIST_PENDING })

  api
    .get('/store/view')
    .then((res) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_SUCCESS, payload: res })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_ERROR, payload: err })
    })
}

export const getShopsList = () => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_SHOPS_LIST_PENDING })
  api
    .get('/store/view')
    .then((res) => {
      dispatch({
        type: actionTypes.GET_SHOPS_LIST_SUCCESS,
        payload: res.data.payload.data,
      })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_SHOPS_LIST_ERROR, payload: err })
    })
}

export const getCategoryList = (restaurantId: any) => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_CATEGORY_LIST_PENDING })
  api
    .post(`/store/category/products`, { storeId: restaurantId })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CATEGORY_LIST_SUCCESS,
        payload: res.data.payload.data,
      })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_CATEGORY_LIST_ERROR, payload: err })
    })
}

export const getProductsList = (restaurantId: any) => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_SHOP_PRODUCT_LIST_PENDING })
  api
    .post(`/store/product/view`, { shopId: restaurantId })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_SHOP_PRODUCT_LIST_SUCCESS,
        payload: res.data.payload.data,
      })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_SHOP_PRODUCT_LIST_ERROR, payload: err })
    })
}

export const getAddonList = (restaurantId: any, productId: any) => (
  dispatch: any,
) => {
  dispatch({ type: actionTypes.GET_ADDON_LIST_PENDING })
  api
    .post(`/store/product/checkaddon`, {
      store_id: restaurantId,
      product_id: productId,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ADDON_LIST_SUCCESS,
        payload: res.data.payload.data,
      })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_ADDON_LIST_ERROR, payload: err })
    })
}

export const placeOrder = (cartDetails: any, history: any, tip: any) => (
  dispatch: any,
) => {
  dispatch({ type: actionTypes.PLACE_ORDER_PENDING })
  api
    .post(`/web/store/create/order`, cartDetails)
    .then((res) => {
      console.log('res', res.data.success)
      if (res.data.success) {
        const orderDetails = res.data.payload
        cartDetails.tip_percentage = tip.tip_percentage
        cartDetails.tip_value = tip.tip_value
        localStorage.setItem('lastCartDetails', JSON.stringify(cartDetails))
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
        localStorage.removeItem('CartProducts')
        localStorage.removeItem('personalInfoName')
        localStorage.removeItem('personalInfoComment')
        localStorage.removeItem('personalInfoPhone')
        localStorage.removeItem('orderComment')
        localStorage.removeItem('tip')
        history.push('/payment-success', { orderDetails })
      }
      // dispatch({
      //   type: actionTypes.PLACE_ORDER_SUCCESS,
      //   payload: res.data.payload.data,
      // })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.PLACE_ORDER_ERROR, payload: err })
    })
}

export const getTax = (zipcode: string) => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_TAX_PENDING })
  api
    .get(`http://gateway.yamapay.com/reporting/mobile/tax/${zipcode}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_TAX_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_TAX_ERROR, payload: err })
    })
}

export const setLocalStorageForCart = (products: any) => (dispatch: any) => {
  let a: any = []
  a = localStorage.getItem('CartProducts')
  console.log('a', a)
  a.push(products)
  localStorage.setItem('CartProducts', JSON.stringify(a))
  dispatch({ type: actionTypes.SET_LOCAL_STORAGE })
}
export const setProducts = (products: any) => (dispatch: any) => {
  dispatch({
    type: actionTypes.SET_PRODUCT,
    payload: JSON.parse(products || []),
  })
}
