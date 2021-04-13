import Tags from './Tags'
import img1 from '../../images/hotel1.jpg'
import img2 from '../../images/hotel2.jpg'
import img3 from '../../images/hotel3.jpg'
import rest1 from '../../images/rest1.jpg'
import rest2 from '../../images/rest2.webp'
import { Navigation } from '../navigation'

const popularShops = [img1, img2, img3, img1, img2, img3]
const allShops = [rest1, rest2, rest1, rest2]
const MerchantListing = () => {
  return (
    <div className="m-4 max-w-6xl lg:mx-auto">
      <Navigation />
      <main>
        <div className="mb-7">
          <Tags />
        </div>
        <div className="promo-offers mb-3">
          <h5>PROMOS FOR YOU</h5>
          <img
            className="w-full"
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            alt="promo offer"
          />
        </div>
        <div className="popular-merchants-carousal mb-8">
          <h5 className="my-3 text-base">Popular Shops</h5>
          <div className="popular-merchants flex flex-row flex-nowrap overflow-auto">
            {popularShops.map((shopImg, index) => (
              <div className="relative merchant" key={index}>
                <img className="merchant-img mr-5" src={shopImg} alt="" />
                <div className="opacity-50 bg-black rounded-xl absolute bottom-1"></div>
                <div className="merchant-info absolute text-white">
                  <p className="merchant-name px-2 break-words">Store Name</p>
                  <p className="merchant-desc px-2 break-words">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    quis..
                  </p>
                </div>
                <div className="merchant-status absolute bottom-0 bg-blue text-white rounded-tr-xl rounded-bl-xl py-1 px-4">
                  <p>Open</p>
                </div>
                <div className="merchant-rating absolute bottom-0 right-4 text-white py-1 px-4">
                  <p>4.5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-merchants">
          <h5 className="mt-3 text-base">All restaurants & services</h5>
          <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start">
            {allShops.map((shop, index) => (
              <div className="merchant rounded-10 mt-4 mr-4" key={index}>
                <div className="merchant-img w-full">
                  <img
                    className="w-full h-full object-cover"
                    src={shop}
                    alt=""
                  />
                </div>
                <div className="merchant-info px-4 flex justify-start items-center">
                  <div>
                    <div className="merchant-name-wrapper flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-bold mb-1">
                          American Steak House
                        </h6>
                      </div>
                      <p className="merchant-rating">4.6 (29)</p>
                    </div>
                    <p className="merchant-desc">
                      American steak house is a leading American franchise...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MerchantListing
