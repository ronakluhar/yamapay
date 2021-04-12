import { LocationMarker, Star } from '../common/icons'
import itemImg from '../../images/item1.webp'

const RestaurantInfo = () => {
  return (
    <div className="flex px-6 rest-info mb-5">
      <img className="product-img w-20 h-20 mr-4" src={itemImg} alt="" />
      <div>
        <h3 className="text-xl font-bold leading-4">Zamazam Restaurant</h3>
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
  )
}

export default RestaurantInfo
