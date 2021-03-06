import { useEffect } from 'react'
import Tags from './Tags'
import img1 from '../../images/hotel1.jpg'
import img2 from '../../images/hotel2.jpg'
import img3 from '../../images/hotel3.jpg'
import { Menu, Navigation } from '../navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getShopsList } from '../../redux/merchantList/action'
import { useHistory } from 'react-router'
const MAX_LENGTH = 20
const popularShops = [img1, img2, img3, img1, img2, img3]
const MerchantListing = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getShopsList())
  }, [dispatch])
  const { shopsList } = useSelector((state: any) => ({
    shopsList: state.merchantListReducer.shopsList,
  }))
  let shopId: any = ''
  shopId = JSON.parse(localStorage.getItem('shop') || '[]')
  const getProduct = (shop: any) => {
    if (shop.id !== shopId.id) {
      localStorage.setItem('shop', JSON.stringify(shop))
    }
    history.push('restaurant', shop)
  }
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
        <div className="all-merchants mb-12">
          <h5 className="mt-3 text-base">All restaurants & services</h5>
          <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start">
            {shopsList.map((value: any, index: any) => (
              <div
                className="merchant rounded-10 mt-4 mr-4"
                key={index}
                onClick={() => getProduct(value)}
              >
                <div className="merchant-img w-full">
                  <img
                    className="merchant-img mr-5"
                    style={{ height: '200px', width: '335px' }}
                    src={
                      value.logo_url
                        ? process.env.REACT_APP_IMG_URL + value.logo_url
                        : img1
                    }
                    alt=""
                  />
                </div>
                <div className="merchant-info px-4 flex justify-start items-center">
                  <div>
                    <div className="merchant-name-wrapper flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-bold mb-1">
                          {value ? <span>{value.store_name}</span> : null}
                        </h6>
                      </div>
                      <p className="merchant-rating">4.6 (29)</p>
                    </div>
                    <p className="merchant-desc">
                      {value.description ? (
                        value.description.length > MAX_LENGTH ? (
                          <div>
                            {`${value.description.substring(0, MAX_LENGTH)}...`}
                          </div>
                        ) : (
                          <p>{value.description}</p>
                        )
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-7 flex justify-center">
          <Menu />
        </div>
      </main>
    </div>
  )
}

export default MerchantListing
