import * as actionTypes from './actionType'
import api from '../../utils/API'
import { useHistory } from 'react-router'

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
      // console.log(res.data.payload.data)
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
  // console.log(restaurantId)
  dispatch({ type: actionTypes.GET_SHOP_PRODUCT_LIST_PENDING })
  api
    .post(`/store/product/view`, { shopId: restaurantId })
    .then((res) => {
      // console.log(res.data.payload)
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

export const placeOrder = (cartDetails: any) => (dispatch: any) => {
  dispatch({ type: actionTypes.PLACE_ORDER_PENDING })
  api
    .post(`/web/store/create/order`, cartDetails)
    .then((res) => {
      const history = useHistory()
      if (res.data.payload.data) {
        const orderDetails = res.data.payload.data
        console.log('orderDetails', orderDetails)
        localStorage.setItem('lastOrderProducts', JSON.stringify(cartDetails))
        localStorage.removeItem('CartProducts')
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
  // console.log('products', products)
  // products = localStorage.getItem('CartProducts')
  dispatch({
    type: actionTypes.SET_PRODUCT,
    payload: JSON.parse(products || []),
  })
}
