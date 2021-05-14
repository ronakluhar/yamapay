import { OrderDetails, PaymentDetails, RestaurantInfo } from '.'
import { LeftArrow } from '../common/icons'
import { useHistory } from 'react-router'

const OrderStatus = (props: any) => {
  const orderDetails = props.location.state.orderDetails || []
  // console.log('orderDetails', orderDetails.data[0])
  const history = useHistory()
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
          <div className="flex items-center justify-between mb-4 px-5">
            <p className="text-sm">
              Order Id: #
              {orderDetails.data ? orderDetails.data[0].order_unique_id : ''}
            </p>
            <p className="text-sm">
              Payment Status:{' '}
              <button className="bg-blue text-white change-card-btn text-sm px-3 py-1">
                Paid
              </button>
            </p>
          </div>
          <div className="order-details">
            <div className="border border-dashed border-border order-status-subheader px-5 py-2">
              Order Details
            </div>
            <div>
              <OrderDetails orderDetails={orderDetails.data[0] || []} />
            </div>
            <div className="px-5 mb-4">
              <p className="text-sm">
                Order Status:{' '}
                <button className="bg-blue text-white change-card-btn text-sm px-3 py-1">
                  Completed
                </button>
              </p>
            </div>
            ,
          </div>
          <div className="payment-details">
            <div className="border border-dashed border-border order-status-subheader px-5 py-2">
              Payment Details
            </div>
            <div className="">
              <PaymentDetails
                orderDetails={orderDetails.data ? orderDetails.data[0] : []}
              />
            </div>
          </div>
        </div>
        <button
          className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none py-5 px-16"
          onClick={() => history.push('/')}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  )
}

export default OrderStatus
