import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import itemImg from '../../images/item1.webp'
import { getCategoryList } from '../../redux/merchantList/action'
// import * as actionTypes from '../../redux/merchantList/actionType'
// import api from '../../utils/API'
import { Plus } from '../common/icons'
const IMG_URL = 'http://127.0.0.1:8000/'

const CategoryWiseProducts = (props: any) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedproduct, setSelectedproduct] = useState({
    name: '',
    price: '',
  })
  const history = useHistory()
  // const storeId = props.store.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoryList(props.store.id))
  }, [dispatch])
  const { categoryList } = useSelector((state: any) => ({
    categoryList: state.merchantListReducer.categoryList,
  }))
  // const setLocalstorage = (res: any, product: any) => {
  //   const response = res.data.payload.data
  //   if (response.length === 0) {
  //     // console.log('in []')
  //     let a: any = []
  //     a = JSON.parse(localStorage.getItem('Products') || '[]')
  //     const product1 = {
  //       product_name: selectedproduct.name,
  //       price: selectedproduct.price,
  //       total_price: selectedproduct.price,
  //       quantity: 1,
  //     }
  //     a.push(product1)
  //     localStorage.setItem('Products', JSON.stringify(a))
  //   } else {
  //     history.push('/customize-order', [product])
  //   }
  // }
  // function getAddon(product: any, storeId: any) {
  //   setSelectedproduct(product)
  //   api
  //     .post(`/store/product/checkaddon`, {
  //       store_id: storeId,
  //       product_id: product.id,
  //     })
  //     .then((res) => {
  //       setLocalstorage(res, product)
  //     })
  //     .catch((err: any) => {
  //       dispatch({ type: actionTypes.GET_ADDON_LIST_ERROR, payload: err })
  //     })
  // }

  return (
    <div className="product-category">
      {categoryList.categories
        ? categoryList.categories.map((categories: any, index: any) => (
            <>
              <h5 className="text-base my-1.5">{categories.name}</h5>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                key={index}
              >
                {categories?.productinfos?.map((product: any, index: any) => (
                  <div
                    className="flex items-center bg-white product"
                    key={index}
                  >
                    <div>
                      <img
                        className="product-img"
                        style={{ height: '130px', width: '130px' }}
                        src={
                          product.image_url
                            ? IMG_URL + product.image_url
                            : itemImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center pr-2 pl-5">
                      <div>
                        <h6 className="product-name">{product.name}</h6>
                        <p className="product-desc text-gray">
                          {product.description}
                        </p>
                        <span className="text-blue text-sm">
                          USD {product.price}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex-1 flex justify-end pr-2"
                      // onClick={() => getAddon(product, storeId)}
                      onClick={() =>
                        history.push('/customize-order', [product])
                      }
                    >
                      <Plus className="text-white w-6 h-6 bg-blue rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))
        : null}
      {/* {ShowAddonModal ? (
        <Transition.Root show={ShowAddonModal} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            // initialFocus={cancelButtonRef}
            open={ShowAddonModal}
            onClose={setShowAddonModal}
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
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Addon
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="flex flex-wrap">
                            {AddonList
                              ? AddonList.map((row: any) => {
                                  return (
                                    <div
                                      className="recommended-product mr-3 mb-4 rounded-lg"
                                      key={row.id}
                                    >
                                      <img
                                        className="product-img"
                                        style={{
                                          height: '130px',
                                          width: '130px',
                                        }}
                                        src={itemImg}
                                        alt="dish"
                                      />
                                      <h6 className="text-violet text-base product-name break-words">
                                        {row.addon_name}
                                      </h6>
                                      <div className="flex justify-between px-2">
                                        <div>
                                          <span className="text-green product-price">
                                            USD {row.price}
                                          </span>
                                        </div>
                                        <div className="product-quantity flex items-center">
                                          <>
                                            <div
                                              className="decrease-quantity w-3 h-3 leading-none border border-lightgray flex justify-center items-center cursor-pointer"
                                              // onClick={() =>
                                              //   manageQuantity(
                                              //     index,
                                              //     'decrement',
                                              //   )
                                              // }
                                            >
                                              <Minus className="h-4 w-4 text-lightgray" />
                                            </div>
                                            <span className="text-xs text-black1 mx-1">
                                              {row.quantity}
                                            </span>
                                            <div
                                              className="increase-quantity w-3 h-3 leading-none bg-blue text-white flex justify-center items-center cursor-pointer"
                                              // onClick={() =>
                                              //   manageQuantity(
                                              //     index,
                                              //     'increment',
                                              //   )
                                              // }
                                            >
                                              <Plus className="h-4 w-4 text-white" />
                                            </div>
                                          </>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowAddonModal(false)}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowAddonModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null} */}
    </div>
  )
}

export default CategoryWiseProducts
