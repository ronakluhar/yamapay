import { useEffect, Fragment, useRef, useState } from 'react'
import Tags from './Tags'
import img1 from '../../images/hotel1.jpg'
import img2 from '../../images/hotel2.jpg'
import img3 from '../../images/hotel3.jpg'
import { Menu, Navigation } from '../navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getShopsList } from '../../redux/merchantList/action'
import { useHistory } from 'react-router'
import { Dialog, Transition } from '@headlessui/react'
const IMG_URL = 'http://127.0.0.1:8000/'
const MAX_LENGTH = 20
const popularShops = [img1, img2, img3, img1, img2, img3]
let shopid: any
const MerchantListing = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  useEffect(() => {
    // dispatch(getMerChantList())
    dispatch(getShopsList())
  }, [dispatch])
  const { shopsList } = useSelector((state: any) => ({
    shopsList: state.merchantListReducer.shopsList,
  }))
  let shopId: any = ''
  shopId = JSON.parse(localStorage.getItem('shop') || '[]')
  const handleClick = (shop: any) => {
    if (shop.id !== shopId.id) {
      shopid = shop
      setOpen(true)
    } else {
      localStorage.setItem('shop', JSON.stringify(shop))
      history.push('restaurant', shop)
    }
  }
  const getProduct = (shop: any) => {
    if (shop.id !== shopId.id) {
      setOpen(false)
      localStorage.removeItem('tip')
      localStorage.removeItem('CartProducts')
      localStorage.removeItem('orderDetails')
    }
    localStorage.setItem('shop', JSON.stringify(shop))
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
          {/* <button
            className="tag bg-lightgreen text-green mr-4 mb-2 p-2"
            // onClick={() => getTax('75206')}
          >
            get Tax
          </button> */}
        </div>
        <div className="popular-merchants-carousal mb-8">
          <h5 className="my-3 text-base">Popular Shops</h5>
          <div className="popular-merchants flex flex-row flex-nowrap overflow-auto">
            {popularShops.map((shopImg, index) => (
              <div
                className="relative merchant"
                key={index}
                onClick={() => alert(index)}
              >
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
                onClick={() => handleClick(value)}
              >
                <div className="merchant-img w-full">
                  <img
                    className="merchant-img mr-5"
                    style={{ height: '200px', width: '335px' }}
                    src={value.logo_url ? IMG_URL + value.logo_url : img1}
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
        {open ? (
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              open={open}
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-red"
                          >
                            Warning !
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to clear your cart? All of
                              your cart data will be removed. This action cannot
                              be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => getProduct(shopid)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        ) : null}
      </main>
    </div>
  )
}

export default MerchantListing
