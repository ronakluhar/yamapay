import * as actionTypes from './actionType'
import api from '../../utils/API'

export const getMerChantList = () => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_MERCHANT_LIST_PENDING })

  api
    .get('/initialize')
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

export const getTax = (textId: string) => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_TAX_PENDING })
  api
    .get(`/tax/${textId}`)
    .then((res) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_SUCCESS, payload: res })
    })
    .catch((err: any) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_ERROR, payload: err })
    })
}
