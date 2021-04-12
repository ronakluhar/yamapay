import { LeftArrow } from '../common/icons'
import invalidCard from '../../images/invalid-card.png'
const InvalidCard = () => {
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div className="relative text-center mb-12">
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Thank You</h2>
        </div>
        <div className="bg-white px-6 py-24 rounded-30 mb-5">
          <div>
            <img className="mx-auto" src={invalidCard} alt="" />
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl">Invalid Card Number</p>
          </div>
        </div>
        <button className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none py-5 px-16">
          BACK TO CART
        </button>
      </div>
    </div>
  )
}

export default InvalidCard
