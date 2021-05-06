import { Dialog, Transition } from '@headlessui/react'
import { filter, find, findIndex, sum } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { OrderSummary, PersonalDetails, Tips } from '.'
import { getTax, placeOrder } from '../../redux/merchantList/action'
import { Chat, ChevronRight, Minus, Pencil, Plus, Trash } from '../common/icons'
import { ButtonTabs } from '../common/Tabs'

const tabOptions = [
  { id: 1, tabName: 'Dine-In' },
  { id: 2, tabName: 'Takeaway' },
]
// const demoProducts = [
//   {
//     product_name: 'Burger Meal',
//     price: 20,
//     total_price: 20,
//     quantity: 1,
//   },
//   {
//     product_name: 'Burger Meal',
//     price: 20,
//     total_price: 40,
//     quantity: 2,
//   },
//   {
//     product_name: 'Burger Meal',
//     price: 20,
//     total_price: 60,
//     quantity: 3,
//   },
//   {
//     product_name: 'Burger Meal',
//     price: 20,
//     total_price: 80,
//     quantity: 4,
//   },
// ]
const style = { border: '2px solid red', borderRadius: '2%' }
console.log(style)
const Cart = () => {
  const zipcode: any = '75206'
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTax(zipcode))
  }, [dispatch])
  const { taxDetails } = useSelector((state: any) => ({
    taxDetails: state.merchantListReducer.taxDetails,
  }))
  let demoProducts: any = []
  demoProducts = localStorage.getItem('CartProducts')
  demoProducts = demoProducts ? JSON.parse(demoProducts) : []
  useEffect(() => {
    localStorage.setItem('subTotal', subtotal.toString())
  }, [])
  const [products, setProducts] = useState(demoProducts)
  const [selectedProduct, setSelectedProduct] = useState({ product_name: '' })
  const [cart, setCart] = useState({})
  const [openTab, setOpenTab] = useState(1)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    comment: '',
    selected_table: '',
  })
  const [ShowDeleteModal, setShowDeleteModal] = useState(false)
  const [tip, setTip] = useState({ tip_value: 0 })
  const [customtip, setCustomtip] = useState(Number)
  const [subtotal, setSubtotal] = useState(
    sum(
      products
        ? products.map((product: any) => {
            return product.total_price
          })
        : null,
    ),
  )
  const tipOptions = [
    {
      percentage: '10%',
      value: (parseInt(localStorage.getItem('subTotal') || '0') * 10) / 100,
    },
    {
      percentage: '20%',
      value: (parseInt(localStorage.getItem('subTotal') || '0') * 20) / 100,
    },
    {
      percentage: '25%',
      value: (parseInt(localStorage.getItem('subTotal') || '0') * 25) / 100,
    },
    {
      percentage: '30%',
      value: (parseInt(localStorage.getItem('subTotal') || '0') * 30) / 100,
    },
    {
      percentage: '35%',
      value: (parseInt(localStorage.getItem('subTotal') || '0') * 35) / 100,
    },
  ]

  const updateSubTotal = () => {
    const subTotal = sum(
      products.map((product: any) => {
        let a: any = []
        a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
        const product1 = {
          _id: 1620034398738,
          storeId: '1',
          itemId: product.productId,
          count: product.quantity || product.quantity,
          addon: product.addonId,
          extra: null,
          productId: product.productId,
          addonId: product.addonId,
          addonName: product.addonName,
          addonPrice: product.addonPrice,
          product_name: product.product_name,
          price: product.price,
          total_price: product.total_price,
          // total_price: price,
          quantity: product.quantity,
        }
        const existingProduct = filter(a, function (o: any) {
          return o.productId !== product.productId
        })
        existingProduct.splice(existingProduct.length, 0, product1)
        localStorage.setItem('CartProducts', JSON.stringify(existingProduct))
        return product.total_price
      }),
    )
    localStorage.setItem('subTotal', subTotal.toString())
    setSubtotal(subTotal)
  }

  const manageQuantity = async (index: number, action: string) => {
    // const newProduct = products.map((el: any, i: any) => {
    // products.map((el: any, i: any) =>
    // return i === index
    //   ? {
    //       ...el,
    //       quantity:
    //         el.quantity +
    //         parseInt(
    //           `${action === 'increment' ? 1 : el.quantity > 1 ? -1 : 0}`,
    //         ),
    //     }
    //   : el
    // ),
    // })
    // setProducts(newProduct)
    await setProducts((product: any) =>
      product.map((el: any, i: any) =>
        i === index
          ? {
              ...el,
              quantity:
                el.quantity +
                parseInt(
                  `${action === 'increment' ? 1 : el.quantity > 1 ? -1 : 0}`,
                ),
            }
          : el,
      ),
    )
    await setProducts((product: any) =>
      product.map((el: any, i: any) =>
        i === index
          ? {
              ...el,
              total_price: el.price * el.quantity,
            }
          : el,
      ),
    )
    updateSubTotal()
  }
  const setCartDetails = () => {
    let isValidate = 0
    if (!personalInfo.name) {
      console.log('here')
      isValidate = 0
    }
    if (isValidate) {
      const eatingMethod = find(tabOptions, { id: openTab })?.tabName
      setCart({
        store_id: localStorage.getItem('store_id') || 1,
        table_no: null,
        customer_name: personalInfo.name || '',
        customer_phone: personalInfo.phone || '',
        comments: personalInfo.comment || '',
        total: subtotal,
        cart: products,
        store_charge: 0,
        tax: parseFloat(taxDetails.stateRate),
        sub_total: subtotal,
        // tip: parseFloat(tip.tip_value.toString()),
        // service_fee: 0,
        // eating_method: eatingMethod,
      })
      console.log('eatingMethod', eatingMethod)
    }
    console.log('cart', cart)
    console.log('placeOrder', placeOrder)
    // dispatch(placeOrder(cart))
  }

  const history = useHistory()
  const editProduct = (product: any) => {
    history.push('customize-order', product)
  }
  const deleteProduct = (product: any) => {
    // setShowDeleteModal(true)
    setSelectedProduct(product)
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    const existingProduct = findIndex(a, function (o: any) {
      return o.productId === product.productId
    })
    a.splice(existingProduct, 1)
    // console.log('existingProduct', existingProduct)
    // console.log('selected', selectedProduct)
    localStorage.setItem('CartProducts', JSON.stringify(a))
    setProducts(a)
  }
  // const deleteProductFromCart = (product: any) => {
  //   setShowDeleteModal(true)
  //   // deleteProduct(product)
  //   // setShowDeleteModal(false)
  // }
  // console.log(deleteProductFromCart)
  return (
    <div className="bg-offWhite pt-5 min-h-screen cart">
      <div className="mx-auto max-w-xl">
        <div className="mx-5">
          <div>
            <h2 className="font-bold text-2xl mb-5">Cart</h2>
          </div>
          <ButtonTabs
            tabs={tabOptions}
            openTab={openTab}
            setOpenTab={setOpenTab}
          />
          <div className="py-5">
            <h3 className="text-sm font-bold">Items in Cart</h3>
            <div className="px-4 bg-white mt-2.5 cart-items">
              {products.map((product: any, index: any) => (
                <div
                  className="border-b last:border-0 border-border border-dashed py-8"
                  key={index}
                >
                  <div className="py-2 flex justify-between items-center">
                    <h4 className="text-base">
                      {product.product_name} <b>{' $ ' + product.price}</b>
                      <br />
                      {product.addonName ? (
                        <span className="text-base">
                          {product.addonName}{' '}
                          <b>{'  $' + product.addonPrice}</b>
                        </span>
                      ) : null}
                    </h4>
                    <div className="flex">
                      <span onClick={() => editProduct(product)}>
                        <Pencil className="h-4 w-4 mr-2.5" />
                      </span>
                      <span onClick={() => deleteProduct(product)}>
                        <Trash className="h-4 w-4 text-red" />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center justify-around order-item-quantity shadow-none">
                      <button
                        className="px-2 my-1 border-r focus:outline-none"
                        type="button"
                        onClick={() => manageQuantity(index, 'decrement')}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div>
                        <span className="px-2">{product.quantity}</span>
                      </div>

                      <button
                        className="px-2 my-1 border-l focus:outline-none"
                        type="button"
                        onClick={() => manageQuantity(index, 'increment')}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-base">${product.total_price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-5 bg-white border border-blue p-6 other-info flex items-center">
              <Chat className="h-6 w-6 text-blue mr-1.5" />
              <p className="text-xs">
                Please write any other info we should share with the chef...
              </p>
            </div>
            <Tips
              tip={tip}
              tipOptions={tipOptions}
              setTip={setTip}
              customtip={customtip}
              setCustomtip={setCustomtip}
              setSubtotal={setSubtotal}
            />
            <PersonalDetails setPersonalInfo={setPersonalInfo} />
            <OrderSummary subtotal={subtotal} Tax={taxDetails.stateRate} />
          </div>
        </div>
        <div className="md:px-5">
          <button
            className="w-full text-left"
            type="button"
            onClick={setCartDetails}
          >
            <div className="bg-blue px-10 py-4 flex justify-between items-center">
              <div className="">
                <p className="text-lg text-white font-bold">
                  Total Cost: ${subtotal}
                </p>
                <p className="text-xs text-white font-normal">
                  Confirm Your Order
                </p>
              </div>
              <div>
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </button>
        </div>
      </div>
      {ShowDeleteModal ? (
        <Transition.Root show={ShowDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            // initialFocus={cancelButtonRef}
            open={ShowDeleteModal}
            onClose={setShowDeleteModal}
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
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Delete Product
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="flex flex-wrap">
                            {selectedProduct.product_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => deleteProduct('123')}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowDeleteModal(false)}
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

export default Cart
