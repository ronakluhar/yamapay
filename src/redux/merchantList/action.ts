import * as actionTypes from './actionType'
import api from '../../utils/API'

export const getMerChantList = () => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_MERCHANT_LIST_PENDING })

  api
    .get('/initialize')
    .then((res) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_SUCCESS, payload: res })
    })
    ['catch']((err: any) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_ERROR, payload: err })
    })
}

export const getTax = (textId: string) => (dispatch: any) => {
  dispatch({ type: actionTypes.GET_TAX_PENDING })
  api
    .get(`/tax/${textId}`)
    .then((res) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_SUCCESS, payload: res })
    })
    ['catch']((err: any) => {
      dispatch({ type: actionTypes.GET_MERCHANT_LIST_ERROR, payload: err })
    })
}
