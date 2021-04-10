import { LeftArrow, Star } from '../common/icons'
import itemImg from '../../images/item1.webp'
import LocationMarker from '../common/icons/LocationMarker'
import { Link } from 'react-router-dom'

const ReviewOrder = () => {
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div className="relative text-center mb-12">
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Review Order</h2>
        </div>
        <div className="bg-white py-8 mb-5 order-review">
          <div className="flex px-6 rest-info mb-5">
            <img className="product-img w-20 h-20 mr-4" src={itemImg} alt="" />
            <div>
              <h3 className="text-xl font-bold leading-4">
                Zamazam Restaurant
              </h3>
              <p className="product-desc font-normal">
                Restaurant, American Food, Chinese
              </p>
              <div className="flex items-center mb-4">
                <LocationMarker className="h-3 w-3 mr-1 text-blue" />
                <p className="text-border product-desc">
                  opp. MLA Hostel, University of Kerala Senate House
                </p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-blue" />
                <p>4.0 (29)</p>
              </div>
            </div>
          </div>
          <div className="border border-dashed order-total flex px-6 py-5 justify-between items-center">
            <h4 className="text-sm font-bold">Order Total</h4>
            <p className="text-base">$125.56</p>
          </div>
          <div className="px-6 py-7">
            <h4 className="text-sm font-bold">Order Total</h4>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold">**** **** **** 2635</p>
              <button className="bg-blue text-white change-card-btn text-sm px-4 py-1">
                CHANGE
              </button>
            </div>
          </div>
        </div>
        <div className="flex rounded-2xl tabs bg-white">
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            Cancel
          </Link>
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            Pay
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReviewOrder
