import { Email, LeftArrow } from '../common/icons'
import paymentSuccess from '../../images/payment-success.png'
import { useState } from 'react'
import { ButtonTabs } from '../common/Tabs'
import { useHistory } from 'react-router'

const tabOptions = [
  { id: 1, tabName: 'ORDER STATUS' },
  { id: 2, tabName: 'BACK TO HOME' },
]
const InvalidCard = (props: any) => {
  if (props.location.state) {
    localStorage.setItem(
      'orderDetails',
      JSON.stringify(props.location.state.orderDetails),
    )
  }
  const history = useHistory()
  const [openTab, setOpenTab] = useState()
  if (openTab === 2) {
    history.push('/')
  }
  if (openTab === 1) {
    history.push('/order-status')
  }
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div
          className="relative text-center mb-12"
          onClick={() => history.push('cart')}
        >
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Thank You</h2>
        </div>
        <div className="bg-white p-6 rounded-30 mb-5 text-center">
          <div>
            <img className="mx-auto" src={paymentSuccess} alt="" />
          </div>
          <div className="mb-7">
            <p className="font-bold text-2xl text-blue">Payment Success !!</p>
            <p className="text-lg text-lightblack ">
              You just paid Zamzam Restaurant ${' '}
              {props.location.state
                ? props.location.state.orderDetails.total_price
                : 0}
            </p>
          </div>
          <div className="bg-lightblue border border-dashed border-blue rounded-full py-3 px-6 mb-5">
            <p className="text-blue text-sm">
              Food will be ready for pickup in 30 minutes{' '}
            </p>
          </div>
          <button
            className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none 
          py-5 px-16 flex justify-center items-center"
          >
            <Email className="h-5 w-5 mr-2 text-white" />{' '}
            <span>Email Receipt</span>
          </button>
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

export default InvalidCard
