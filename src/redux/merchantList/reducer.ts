import * as actionTypes from './actionType'
const reducer = (
  state = {
    merchantList: [],
    shopsList: [],
    productList: [],
    categoryList: [],
    addonList: [],
    orderDetails: [],
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
    case actionTypes.GET_SHOPS_LIST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_SHOPS_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.GET_SHOPS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        shopsList: action.payload,
      }
    case actionTypes.GET_SHOP_PRODUCT_LIST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_SHOP_PRODUCT_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.GET_SHOP_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload,
      }
    case actionTypes.GET_CATEGORY_LIST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
      }
    case actionTypes.GET_ADDON_LIST_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_ADDON_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.GET_ADDON_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        addonList: action.payload,
      }
    case actionTypes.PLACE_ORDER_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.PLACE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      }
  }
  return state
}

export default reducer
