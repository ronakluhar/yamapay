import { LocationMarker, Star } from '../common/icons'
import itemImg from '../../images/item1.webp'

const RestaurantInfo = () => {
  return (
    <div className="flex px-6 rest-info mb-5">
      <img className="product-img w-20 h-20 mr-4" src={itemImg} alt="" />
      <div>
        <h3 className="text-base md:text-xl font-bold">Zamazam Restaurant</h3>
        <p className="product-desc font-normal">
          Restaurant, American Food, Chinese
        </p>
        <div className="flex items-center mb-1">
          <div className="h-4 w-4 mr-2">
            <LocationMarker className="h-4 w-4 text-blue" />
          </div>
          <p className="text-border product-desc">
            opp. MLA Hostel, University of Kerala Senate House
          </p>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 mr-2">
            <Star className="h-4 w-4 text-blue" />
          </div>
          <p className="text-sm">4.0 (29)</p>
        </div>
      </div>
    </div>
  )
}

export default RestaurantInfo
