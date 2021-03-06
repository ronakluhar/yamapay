import { LocationMarker, Star } from '../common/icons'
import itemImg from '../../images/item1.webp'
const MAX_LENGTH = 20

const RestaurantInfo = () => {
  let shop: any = []
  shop = JSON.parse(localStorage.getItem('shop') || '[]')

  return (
    <>
      {Object.values(shop).length ? (
        <div className="flex px-6 rest-info mb-5">
          <img
            className="product-img w-20 h-20 mr-4"
            src={
              shop.logo_url
                ? process.env.REACT_APP_IMG_URL + shop.logo_url
                : itemImg
            }
            alt=""
          />
          <div>
            <h3 className="text-base md:text-xl font-bold">
              {shop.store_name}
            </h3>
            <p className="product-desc font-normal">
              {shop.description ? (
                shop.description.length > MAX_LENGTH ? (
                  <div>{`${shop.description.substring(0, MAX_LENGTH)}...`}</div>
                ) : (
                  <p>{shop.description}</p>
                )
              ) : null}
            </p>
            <div className="flex items-center mb-1">
              <div className="h-4 w-4 mr-2">
                <LocationMarker className="h-4 w-4 text-blue" />
              </div>
              <p className="text-border product-desc">
                {shop.address ? (
                  shop.address.length > MAX_LENGTH ? (
                    <div>{`${shop.address.substring(0, MAX_LENGTH)}...`}</div>
                  ) : (
                    <p>{shop.address}</p>
                  )
                ) : null}
                {/* {shop.address ||
              'opp. MLA Hostel, University of Kerala Senate House'} */}
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
      ) : (
        <div className="border border-dashed border-border order-status-subheader px-5 py-2">
          No Restaurant Visited
        </div>
      )}
    </>
  )
}

export default RestaurantInfo
