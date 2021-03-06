import { useEffect } from 'react'
import { RestaurantInfo } from '.'
import { LeftArrow } from '../common/icons'
import { useHistory } from 'react-router'
import { getAllOrder, getOrderDetails } from '../../redux/merchantList/action'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '../navigation'

const OrderList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const phone = localStorage.getItem('personalInfoPhone') || 0
  const shop = JSON.parse(localStorage.getItem('shop') || '[]')
  useEffect(() => {
    if (shop.length !== 0) {
      dispatch(getAllOrder(phone, shop.id))
    }
  }, [])
  const { allOrderDetails } = useSelector((state: any) => ({
    allOrderDetails: state.merchantListReducer.allOrderDetails,
  }))
  const handleGetOrderDetails = (value: any) => {
    dispatch(getOrderDetails(value, history))
  }
  return (
    <div className="bg-offWhite p-5 min-h-screen order-status">
      <div className="mx-auto max-w-xl">
        <div
          className="relative text-center mb-10"
          onClick={() => history.goBack()}
        >
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Thank You</h2>
        </div>
        <div className="bg-white py-8 rounded-30 mb-5 order-review">
          <div className="mb-5 px-5">
            <RestaurantInfo />
          </div>

          <div className="order-details">
            <div className="border border-dashed border-border order-status-subheader px-5 py-2">
              {allOrderDetails.length ? 'Your Orders' : 'No Details Available'}
            </div>
            <div>
              <div className="px-4 bg-white mt-2.5 cart-items">
                {allOrderDetails.length
                  ? allOrderDetails.map((value: any, index: any) => (
                      <div
                        className="border-b last:border-0 border-border border-dashed py-8"
                        key={value.id}
                      >
                        <div className="py-2 flex justify-between items-center">
                          <h4 className="text-base">
                            Order Id: #
                            <b>{value ? value.order_unique_id : ''}</b>
                          </h4>
                          <button
                            className="bg-blue text-white change-card-btn text-sm px-3 py-1"
                            onClick={() => location.reload(false)}
                          >
                            {value.status
                              ? value.status === 1
                                ? 'ORDER PLACED'
                                : '' || value.status === 2
                                ? 'PROCESSING'
                                : '' || value.status === 3
                                ? 'REJECTED'
                                : '' || value.status === 4
                                ? 'ORDER COMPLETED'
                                : '' || value.status === 5
                                ? 'READY'
                                : ''
                              : ''}
                          </button>
                          <button
                            className="bg-blue text-white change-card-btn text-sm px-3 py-1"
                            onClick={() => handleGetOrderDetails(value.id)}
                          >
                            View
                          </button>
                          <div>
                            <p className="text-base ">
                              <b>${value.total}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 sticky bottom-7 flex justify-center">
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default OrderList
