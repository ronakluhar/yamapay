import { useEffect, useRef, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import itemImg from '../../images/item1.webp'
import { getCategoryList } from '../../redux/merchantList/action'
import { Dialog, Transition } from '@headlessui/react'
// import api from '../../utils/API'
import { Plus } from '../common/icons'
let productForAddon: any = []
const MAX_LENGTH = 20
const CategoryWiseProducts = (props: any) => {
  // const shop = props.store
  let shop: any = []
  shop = localStorage.getItem('shop')
  shop = shop ? JSON.parse(shop) : []
  // console.log(shop.id)
  // eslint-disable-next-line no-unused-vars
  const [selectedproduct, setSelectedproduct] = useState({
    name: '',
    price: '',
  })
  const history = useHistory()
  // const storeId = props.store.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoryList(shop.id))
  }, [dispatch])
  const { categoryList } = useSelector((state: any) => ({
    categoryList: state.merchantListReducer.categoryList,
  }))
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  let shopId: any = ''
  let prevShopId: any = ''
  shopId = JSON.parse(localStorage.getItem('shop') || '[]')
  prevShopId = JSON.parse(localStorage.getItem('prevShop') || '[]')

  let CartProducts: any = []
  CartProducts = JSON.parse(localStorage.getItem('CartProducts') || '[]')
  const handleClick = (product: any) => {
    if (prevShopId.id !== product.store_id) {
      // localStorage.setItem('shop', JSON.stringify(shopId))
      if (CartProducts.length !== 0) {
        setOpen(true)
        productForAddon = product
      } else if (CartProducts.length === 0) {
        getAddons(product)
      }
    } else {
      localStorage.setItem('shop', JSON.stringify(shopId))
      history.push('/customize-order', [product])
    }
  }
  const getAddons = (product: any) => {
    localStorage.removeItem('tip')
    localStorage.removeItem('CartProducts')
    localStorage.removeItem('orderDetails')
    setOpen(false)
    history.push('/customize-order', [product])
  }
  const haldleClose = () => {
    setOpen(false)
    localStorage.setItem('shop', JSON.stringify(prevShopId))
  }
  return (
    <div className="product-category">
      {categoryList.categories
        ? categoryList.categories.map((categories: any, index: any) => (
            <>
              <h5 className="text-base my-1.5">{categories.name}</h5>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                key={categories.id}
              >
                {categories?.productinfos?.map((product: any, index: any) => (
                  <div
                    className="flex items-center bg-white product"
                    key={product.id}
                  >
                    <div>
                      <img
                        className="product-img"
                        style={{ height: '130px', width: '130px' }}
                        src={
                          product.image_url
                            ? process.env.REACT_APP_IMG_URL + product.image_url
                            : itemImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center pr-2 pl-5">
                      <div>
                        <h6 className="product-name">{product.name}</h6>
                        <p className="product-desc text-gray">
                          {product.description ? (
                            product.description.length > MAX_LENGTH ? (
                              <div>{`${product.description.substring(
                                0,
                                MAX_LENGTH,
                              )}...`}</div>
                            ) : (
                              <p>{product.description}</p>
                            )
                          ) : null}
                        </p>
                        <span className="text-blue text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex-1 flex justify-end pr-2"
                      onClick={() => handleClick(product)}
                    >
                      <Plus className="text-white w-6 h-6 bg-blue rounded-lg cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))
        : null}
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
                      onClick={() => getAddons(productForAddon)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={haldleClose}
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
    </div>
  )
}

export default CategoryWiseProducts
