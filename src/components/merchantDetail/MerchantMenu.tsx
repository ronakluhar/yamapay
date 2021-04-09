import { Link } from 'react-router-dom'
import { CategoryWiseProducts, RecommendedProducts } from '.'
import { Tags } from '../merchantList'

const MerchantMenu = () => {
  return (
    <div className="merchant-menu bg-white p-0 my-0 relative max-w-6xl mx-auto">
      <main>
        <div className="merchant-banner w-full">
          <img
            className="w-full"
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            alt="restaurant banner"
          />
        </div>
        <div className="merchant-detail absolute top-48 bg-white py-4 w-full">
          <div className="flex mb-8">
            <div className="merchant-detail-wrapper px-5 flex-1">
              <div className="flex justify-between items-center">
                <h1 className="merchant-name">Zamazam</h1>
                <p className="merchant-rating">4.5</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lightgray text-xs">
                  Restaurant, American Food, Chinese
                </p>
                <div className="est-delivery-time rounded-lg p-1 text-blue bg-skyblue flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 142.447 142.447"
                    className="fill-current text-blue mr-1"
                    width="13px"
                    height="13px"
                  >
                    <g>
                      <path
                        d="M71.224,0C31.951,0,0,31.951,0,71.224s31.951,71.224,71.224,71.224s71.224-31.951,71.224-71.224
		S110.496,0,71.224,0z M71.224,127.447C40.222,127.447,15,102.226,15,71.224S40.222,15,71.224,15s56.224,25.222,56.224,56.224
		S102.226,127.447,71.224,127.447z"
                      />
                      <path
                        d="M100.923,72.016H71.724V46.724c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v32.792
		c0,4.143,3.357,7.5,7.5,7.5h36.699c4.143,0,7.5-3.357,7.5-7.5S105.065,72.016,100.923,72.016z"
                      />
                    </g>
                  </svg>
                  30min
                </div>
              </div>
            </div>
          </div>
          <div className="flex rounded-2xl tabs mx-5 mb-8">
            <Link
              to="#"
              className="rounded-2xl text-darkgray hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 flex items-center justify-center"
            >
              Dine-In
            </Link>
            <Link
              to="#"
              className="rounded-2xl text-darkgray hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 flex items-center justify-center"
            >
              Takeaway
            </Link>
          </div>
          <div className="mx-5">
            <Tags />
          </div>
          <div className="mx-5">
            <RecommendedProducts />
          </div>
          <div className="mx-5">
            <CategoryWiseProducts />
          </div>
        </div>
      </main>
    </div>
  )
}

export default MerchantMenu
