import { Form, Formik } from 'formik'
import { filter, find, findIndex, sum } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { OrderSummary, PersonalDetails, Tips } from '.'
import { getTax } from '../../redux/merchantList/action'
import { Input } from '../common/Form'
import { ChevronRight, Minus, Pencil, Plus, Trash } from '../common/icons'
import { ButtonTabs } from '../common/Tabs'
import { Menu } from '../navigation'

const tabOptions = [
  { id: 1, tabName: 'Dine-In' },
  { id: 2, tabName: 'Takeaway' },
]

const Cart = () => {
  const shopId = JSON.parse(localStorage.getItem('shop') || '[]')
  const [orderComment, setOrderComment] = useState(
    localStorage.getItem('orderComment') || '',
  )
  const zipcode: any = '75206'
  const dispatch = useDispatch()
  const history = useHistory()

  const prevShopId = JSON.parse(localStorage.getItem('prevShop') || '[]')
  const { taxDetails } = useSelector((state: any) => ({
    taxDetails: state.merchantListReducer.taxDetails,
  }))
  let demoProducts: any = []
  demoProducts = localStorage.getItem('CartProducts')
  demoProducts = demoProducts ? JSON.parse(demoProducts) : []
  useEffect(() => {
    localStorage.setItem('shop', JSON.stringify(prevShopId))
  }, [])

  const [products, setProducts] = useState(demoProducts)
  const [openTab, setOpenTab] = useState(1)
  const [cart, setCart] = useState({})
  useEffect(() => {
    if (products.length !== 0) {
      dispatch(getTax(zipcode))
    }
  }, [dispatch])
  const [personalInfo, setPersonalInfo] = useState({
    name: localStorage.getItem('personalInfoName') || '',
    phone: localStorage.getItem('personalInfoPhone') || '',
    comment: localStorage.getItem('personalInfoComment') || '',
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
  const tipSet = JSON.parse(localStorage.getItem('tip') || '[]')
  const [tipOptions, setTipOptions] = useState(tipsOption())
  const [tip, setTip] = useState({
    tip_index: tipSet ? tipSet.tip_index : -1,
    tip_value: tipSet ? tipSet.tip_value : 0,
    tip_percentage: tipSet ? tipSet.tip_percentage : '',
  })
  const [customtip, setCustomtip] = useState(Number)
  const [subtotal, setSubtotal] = useState(
    sum(
      products
        ? products.map((product: any) => {
            return parseFloat(product.total_price)
          })
        : null,
    ) + parseFloat(tip.tip_value || 0),
  )
  useEffect(() => {
    const updatedTipValue = find(tipOptions, (_, i) => {
      return i === tip.tip_index
    })
    setTip((prev) => ({
      ...prev,
      tip_value: updatedTipValue?.value || tip.tip_value,
    }))
  }, [tipOptions])
  useEffect(() => {
    setSubtotal(
      parseFloat(localStorage.getItem('subTotal') || '0') +
        parseFloat(tip.tip_value || 0) +
        parseFloat(taxDetails.stateRate || 0),
    )
  }, [tip])
  useEffect(() => {
    updateSubTotal()
  }, [products])
  useEffect(() => {
    Object.keys(cart).length > 0 && history.push('/review-order', [cart, tip])
  }, [cart])
  const manageQuantity = (index: number, action: string) => {
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
    localStorage.removeItem('tip')
    setTip({
      tip_index: -1,
      tip_value: 0,
      tip_percentage: '',
    })
    tipsOption()
  }
  const updateSubTotal = () => {
    const subTotal = sum(
      products.map((product: any) => {
        let a: any = []
        a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
        const product1 = {
          ...product,
          storeId: shopId.id,
        }
        const existingProduct = filter(a, function (o: any) {
          return o._id !== product1._id
        })
        existingProduct.splice(existingProduct.length, 0, product1)
        localStorage.setItem('CartProducts', JSON.stringify(existingProduct))
        return parseFloat(product.total_price)
      }),
    )
    localStorage.setItem('subTotal', subTotal.toString())
    setSubtotal(subTotal)
    setTipOptions(tipsOption())
  }
  const setCartDetails = () => {
    const finalsubTotal =
      subtotal -
      parseFloat(tip.tip_value ? parseFloat(tip.tip_value).toFixed(2) : '0') +
      parseFloat(
        taxDetails.stateRate
          ? parseFloat(taxDetails.stateRate).toFixed(2)
          : '0',
      )
    const finalTotal =
      subtotal +
      parseFloat(
        taxDetails.stateRate
          ? parseFloat(taxDetails.stateRate).toFixed(2)
          : '0',
      )
    const eatingMethod = find(tabOptions, { id: openTab })?.tabName
    setCart({
      store_id: shopId.view_id,
      merchant_id: shopId.merchantId,
      table_no: null,
      customer_name: personalInfo.name || '',
      customer_phone: personalInfo.phone || '',
      comment: personalInfo.comment || '',
      total: finalTotal.toFixed(2),
      cart: products,
      store_charge: 0,
      tax: taxDetails.stateRate
        ? parseFloat(taxDetails.stateRate).toFixed(2)
        : 0,
      sub_total: finalsubTotal.toFixed(2),
      tip: tip.tip_value ? parseFloat(tip.tip_value).toFixed(2) : 0,
      service_fee: 0,
      eating_method: eatingMethod,
      comments: orderComment,
    })
  }

  const editProduct = (product: any) => {
    history.push('customize-order', product)
  }
  const deleteProduct = (product: any) => {
    localStorage.removeItem('tip')
    setTip({
      tip_index: -1,
      tip_value: 0,
      tip_percentage: '',
    })
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    const existingProduct = findIndex(a, function (o: any) {
      return o._id === product._id
    })
    a.splice(existingProduct, 1)
    localStorage.setItem('CartProducts', JSON.stringify(a))
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
              {products.length !== 0 ? (
                products.map((product: any, index: any) => (
                  <div
                    className="border-b last:border-0 border-border border-dashed py-8"
                    key={index}
                  >
                    <div className="py-2 flex justify-between items-center">
                      <h4 className="text-base">
                        {product.product_name}{' '}
                        <b>{'$' + parseFloat(product.price).toFixed(2)}</b>{' '}
                        {product.addonName ? (
                          <p className="product-desc font-normal leading-none mb-1 text-darkgray">
                            {product.addonName}{' '}
                            <b>{'$' + product.addonPrice}</b>
                          </p>
                        ) : null}
                        {product.extra != null
                          ? product.extra.map((value: any) => (
                              <p
                                className="product-desc font-normal leading-none mb-1 text-darkgray"
                                key={value.addon_id}
                              >
                                {value.addon_name}{' '}
                                <b>{'  $' + value.addonprice}</b>
                              </p>
                            ))
                          : null}
                        <p className="product-desc font-normal leading-none mb-1 text-darkgray">
                          {product.product_comments}
                        </p>
                      </h4>
                      <div className="flex">
                        <span onClick={() => editProduct(product)}>
                          <Pencil className="h-4 w-4 mr-2.5 cursor-pointer" />
                        </span>
                        <span onClick={() => deleteProduct(product)}>
                          <Trash className="h-4 w-4 text-red cursor-pointer" />
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
                        <p className="text-base">
                          ${parseFloat(product.total_price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-2 mt-2 mb-2 text-opacity-50 text-center font-bold">
                  No Item Added
                </div>
              )}
            </div>
            {products.length !== 0 ? (
              <>
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
                            localStorage.setItem(
                              'orderComment',
                              event.target.value,
                            )
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
              </>
            ) : null}
          </div>
          {products.length !== 0 ? (
            <>
              <div className="flex rounded-2xl mb-8 tabs">
                <button
                  className="w-full text-left mb-10"
                  type="button"
                  onClick={() => history.push('/restaurant')}
                >
                  <div
                    className="bg-blue px-10 py-4 flex justify-between items-center rounded-2xl mr-0.5"
                    style={{ height: '100%' }}
                  >
                    <div className="">
                      <p className="text-lg text-white font-bold">Add Items:</p>
                      <p className="text-xs text-white font-normal"></p>
                    </div>
                    <div>
                      <ChevronRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </button>
                <button
                  className="w-full text-left mb-10"
                  type="button"
                  onClick={setCartDetails}
                >
                  <div className="bg-blue px-10 py-4 flex justify-between items-center rounded-2xl">
                    <div className="">
                      <p className="text-lg text-white font-bold">
                        Total Cost: $
                        {(
                          subtotal +
                          parseFloat(
                            taxDetails.stateRate
                              ? parseFloat(taxDetails.stateRate).toFixed(2)
                              : '0',
                          )
                        ).toFixed(2)}
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
            </>
          ) : null}
        </div>
      </div>
      <div className="mx-5 sticky bottom-7 flex justify-center">
        <Menu />
      </div>
    </div>
  )
}

export default Cart
