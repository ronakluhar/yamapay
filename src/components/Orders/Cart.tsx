import { Form, Formik } from 'formik'
import { filter, find, findIndex, sum } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { OrderSummary, PersonalDetails, Tips } from '.'
import {
  getTax,
  // placeOrder,
  // setProducts,
} from '../../redux/merchantList/action'
import { Input } from '../common/Form'
import { ChevronRight, Minus, Pencil, Plus, Trash } from '../common/icons'
import { ButtonTabs } from '../common/Tabs'
// import api from '../../utils/API'
import { Menu } from '../navigation'

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
const Cart = () => {
  const shopId = JSON.parse(localStorage.getItem('shop') || '')
  // let cartDetails: any = []
  // cartDetails = JSON.parse(localStorage.getItem('Cart') || '[]')
  // console.log('cartDetails', cartDetails)
  const [orderComment, setOrderComment] = useState('')
  const zipcode: any = '75206'
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getTax(zipcode))
  }, [dispatch])
  const { taxDetails } = useSelector((state: any) => ({
    taxDetails: state.merchantListReducer.taxDetails,
    // products: state.merchantListReducer.products || [],
  }))
  let demoProducts: any = []
  demoProducts = localStorage.getItem('CartProducts')
  demoProducts = demoProducts ? JSON.parse(demoProducts) : []
  useEffect(() => {
    localStorage.setItem('subTotal', subtotal.toString())
  }, [])
  // useEffect(() => {
  //   dispatch(setProducts(products))
  // }, [products])
  // const { products } = useSelector((state: any) => ({
  //   products: state.merchantListReducer.products || [],
  // }))
  const [products, setProducts] = useState(demoProducts)
  const [openTab, setOpenTab] = useState(1)
  const [cart, setCart] = useState({})
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    comment: '',
    selected_table: '',
  })
  const tipsOption = () => {
    return [
      {
        percentage: '10%',
        value: (
          (parseFloat(localStorage.getItem('subTotal') || '0') * 10) /
          100
        ).toFixed(2),
      },
      {
        percentage: '20%',
        value: (
          (parseFloat(localStorage.getItem('subTotal') || '0') * 20) /
          100
        ).toFixed(2),
      },
      {
        percentage: '25%',
        value: (
          (parseFloat(localStorage.getItem('subTotal') || '0') * 25) /
          100
        ).toFixed(2),
      },
      {
        percentage: '30%',
        value: (
          (parseFloat(localStorage.getItem('subTotal') || '0') * 30) /
          100
        ).toFixed(2),
      },
      {
        percentage: '35%',
        value: (
          (parseFloat(localStorage.getItem('subTotal') || '0') * 35) /
          100
        ).toFixed(2),
      },
    ]
  }
  const [tipOptions, setTipOptions] = useState(tipsOption())
  const [tip, setTip] = useState({ tip_value: 0 })
  const [customtip, setCustomtip] = useState(Number)
  const [subtotal, setSubtotal] = useState(
    sum(
      products
        ? products.map((product: any) => {
            return parseFloat(product.total_price)
          })
        : null,
    ),
  )
  useEffect(() => {
    setSubtotal(
      sum(
        products
          ? products.map((product: any) => {
              return parseFloat(product.total_price)
            })
          : null,
      ),
    )
    localStorage.setItem('subTotal', subtotal.toString())
    setTipOptions(tipsOption())
  }, [products.length])

  const manageQuantity = (index: number, action: string) => {
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    setProducts(a)
    setProducts((product: any) =>
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
    setProducts((product: any) =>
      product.map((el: any, i: any) =>
        i === index
          ? {
              ...el,
              total_price:
                el.price * el.quantity +
                (el.addonPrice * el.quantity ||
                  0 +
                    (el.extra
                      ? sum(
                          el.extra.map((data: any) => {
                            return data.addonprice * el.quantity
                          }),
                        )
                      : 0)),
            }
          : el,
      ),
    )
    tipsOption()
    updateSubTotal()
    // console.log('products', products)
  }
  const updateSubTotal = () => {
    // localStorage.setItem('CartProducts', JSON.stringify(products))
    // dispatch(setProducts(products))
    const subTotal = sum(
      products.map((product: any) => {
        let a: any = []
        a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
        const product1 = {
          _id: product._id,
          storeId: shopId.id,
          itemId: product.productId,
          count: product.quantity,
          addon: product.addonId,
          extra: product.extra || null,
          productId: product.productId,
          addonId: product.addonId,
          addonName: product.addonName,
          addonPrice: product.addonPrice,
          product_name: product.product_name,
          product_comments: product.product_comments,
          price: product.price,
          total_price: product.total_price,
          // total_price: price,
          quantity: product.quantity,
        }
        const existingProduct = filter(a, function (o: any) {
          return o._id !== product1._id
        })
        existingProduct.splice(existingProduct.length, 0, product1)
        localStorage.setItem('CartProducts', JSON.stringify(existingProduct))
        let addonTotal: any = 0
        if (product.extra) {
          addonTotal = sum(
            product.extra.map((value: any) => {
              return value.addon_price
            }),
          )
        }
        console.log('addontotal', addonTotal)
        return (
          parseFloat(product.total_price) +
          parseFloat('0') +
          parseFloat(product.addonPrice || '0')
        )
      }),
    )
    localStorage.setItem('subTotal', subTotal.toString())
    setSubtotal(subTotal)
    setTipOptions(tipsOption())
  }
  // console.log('subtotal', subtotal)

  const setCartDetails = () => {
    const eatingMethod = find(tabOptions, { id: openTab })?.tabName
    setCart({
      store_id: shopId.id,
      table_no: null,
      customer_name: personalInfo.name || '',
      customer_phone: personalInfo.phone || '',
      comment: personalInfo.comment || '',
      total: subtotal - parseFloat(tip.tip_value.toString() || '0'),
      cart: products,
      store_charge: 0,
      tax: taxDetails.stateRate || 0,
      sub_total: subtotal,
      tip: parseFloat(tip.tip_value.toString()).toFixed(2),
      service_fee: 0,
      eating_method: eatingMethod,
      comments: orderComment,
    })
    // dispatch(placeOrder(cart))
    // console.log('cart', cart)
    history.push('/review-order', [cart, subtotal])
  }

  const editProduct = (product: any) => {
    history.push('customize-order', product)
  }
  const deleteProduct = (product: any) => {
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    const existingProduct = findIndex(a, function (o: any) {
      return o._id === product._id
    })
    a.splice(existingProduct, 1)
    localStorage.setItem('CartProducts', JSON.stringify(a))
    // dispatch(setProducts(a))
    setProducts(a)
    tipsOption()
  }
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
                      {product.product_name} <b>{'$' + product.price}</b>{' '}
                      <p className="text-sm">{product.product_comments}</p>
                      {/* <br /> */}
                      {product.addonName ? (
                        <p className="text-base">
                          {product.addonName} <b>{'$' + product.addonPrice}</b>
                        </p>
                      ) : null}
                      {product.extra != null
                        ? product.extra.map((value: any) => (
                            <p
                              className="product-desc font-normal leading-none mb-1"
                              key={value.addon_id}
                            >
                              {value.addon_name}{' '}
                              <b>{'  $' + value.addonprice}</b>
                              {/* <br /> */}
                            </p>
                          ))
                        : null}
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
            <Formik initialValues={{}} onSubmit={(values) => {}}>
              {({ values }) => (
                <Form>
                  <div className="my-3">
                    <Input
                      type="text"
                      name="order_comments"
                      value={orderComment}
                      placeholder={
                        'Please write any other info we should share with the chef...*'
                      }
                      onChange={(event) => {
                        setOrderComment(event.target.value)
                      }}
                    />
                  </div>
                </Form>
              )}
            </Formik>
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
      <div className="mx-5 sticky bottom-7 flex justify-center">
        <Menu />
      </div>
    </div>
  )
}

export default Cart
