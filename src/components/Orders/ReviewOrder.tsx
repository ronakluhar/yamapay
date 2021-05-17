import { LeftArrow } from '../common/icons'
import { RestaurantInfo } from '.'
import { useState } from 'react'
import { ButtonTabs } from '../common/Tabs'
import { useHistory } from 'react-router'
import { placeOrder } from '../../redux/merchantList/action'
import { useDispatch } from 'react-redux'
const tabOptions = [
  { id: 1, tabName: 'Cancel' },
  { id: 2, tabName: 'Pay' },
]
const ReviewOrder = (props: any) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const tip = props.location.state ? props.location.state[1] : []
  const [openTab, setOpenTab] = useState()
  if (openTab === 1) {
    history.push('/cart')
  }
  if (openTab === 2) {
    if (props.location.state) {
      dispatch(placeOrder(props.location.state[0] || [], history, tip))
    }
  }
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div
          className="relative text-center mb-12"
          onClick={() => history.goBack()}
        >
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Review Order</h2>
        </div>
        <div className="bg-white py-8 mb-5 order-review">
          <RestaurantInfo />
          <div className="border border-dashed order-total flex px-6 py-5 justify-between items-center">
            <h4 className="text-sm font-bold">Order Total</h4>
            <p className="text-base">
              $
              {props.location.state
                ? props.location.state[0].total.toFixed(2)
                : 0}
            </p>
          </div>
          <div className="px-6 py-7">
            <h4 className="text-sm font-bold">Payment Method</h4>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold">**** **** **** 2635</p>
              <button className="bg-blue text-white change-card-btn text-sm px-4 py-1">
                CHANGE
              </button>
            </div>
          </div>
        </div>
        <ButtonTabs
          tabs={tabOptions}
          openTab={openTab || 1}
          setOpenTab={setOpenTab}
        />
      </div>
    </div>
  )
}

export default ReviewOrder
