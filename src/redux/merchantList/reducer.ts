import * as actionTypes from './actionType'
const reducer = (
  state = {
    merchantList: [],
    loading: false,
  },
  action: any,
) => {
  switch (action.type) {
    case actionTypes.GET_MERCHANT_LIST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_MERCHANT_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.GET_MERCHANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        merchantList: [...action.payload.data.merchantAppViewDTOs],
      }
  }
  return state
}

export default reducer
