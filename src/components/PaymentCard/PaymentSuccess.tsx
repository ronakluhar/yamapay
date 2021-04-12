import { Email, LeftArrow } from '../common/icons'
import paymentSuccess from '../../images/payment-success.png'
import { Link } from 'react-router-dom'

const InvalidCard = () => {
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div className="relative text-center mb-12">
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
              You just paid Zamzam Restaurant $95.69
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
        <div className="flex rounded-2xl tabs bg-white">
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            ORDER STATUS
          </Link>
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InvalidCard
