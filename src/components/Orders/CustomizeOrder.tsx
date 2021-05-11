import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import itemImg from '../../images/item1.webp'
import { Radio, Checkbox, Input } from '../common/Form'
import { Minus, Plus } from '../common/icons'
import { useHistory } from 'react-router'
import { ButtonTabs } from '../common/Tabs'
import {
  getAddonList,
  // setProducts,
  // setLocalStorageForCart,
} from '../../redux/merchantList/action'
import { filter, findIndex, sum } from 'lodash'
import { Menu } from '../navigation'

const IMG_URL = 'http://127.0.0.1:8000/'
const tabOptions = [
  { id: 1, tabName: 'Close' },
  { id: 2, tabName: 'Save change' },
]
const CustomizeOrder = (props: any) => {
  const extra: any = props.location.state.extra
    ? props.location.state.extra
    : []
  console.log('extra', extra)
  const [comment, setCommments] = useState('')
  let shop: any = []
  shop = JSON.parse(localStorage.getItem('shop') || '[]')
  let productId: any = 0
  let storeId: any = 0
  storeId = shop.id
  productId = props.location.state ? props.location.state.productId : 0

  if (props.location.state && props.location.state[0]) {
    productId = props.location.state[0].id
  }

  const history = useHistory()
  let customizeProduct = []
  customizeProduct = props.location.state[0] || props.location.state
  customizeProduct = {
    ...customizeProduct,
    quantity: props.location.state.quantity ? props.location.state.quantity : 1,
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAddonList(storeId, productId))
  }, [dispatch])
  const { addonList } = useSelector((state: any) => ({
    addonList: state.merchantListReducer.addonList,
  }))
  // eslint-disable-next-line no-unused-vars
  const [addon, setAddon] = useState('')
  const [product, setProduct] = useState(customizeProduct)
  const [openTab, setOpenTab] = useState()
  const [addonTotal, setAaddonTotal] = useState(0)
  // const checkboxAddon = false
  const addonExit = (addonId: any) => {
    return extra.some(function (el: any) {
      return el.addon_id === addonId
    })
  }
  let total: any = sum(
    extra
      ? extra.map((value: any) => {
          return value.addon_price
        })
      : 0,
  )
  useEffect(() => {
    setAaddonTotal(total || 0)
  })
  console.log('total', total)
  const setAddonValue = (value: any) => {
    console.log('value', value)
    const checkArray = value.split(',')
    const existingAddon = findIndex(extra, function (o: any) {
      return o.addon_id === parseInt(checkArray[2])
    })
    console.log('existingAddon', existingAddon)
    if (existingAddon > -1) {
      extra.splice(existingAddon, 1)
      total = sum(
        extra
          ? extra.map((value: any) => {
              return value.addon_price
            })
          : null,
      )
      setAaddonTotal(total)
    } else {
      const arrayToPush = {
        addon_name: checkArray[0],
        addonprice: parseInt(checkArray[1]),
        addon_price:
          parseInt(checkArray[1]) *
          (product.quantity || props.location.state.quantity),
        count: product.quantity || props.location.state.quantity,
        addon_id: parseInt(checkArray[2]),
      }
      extra.push(arrayToPush)
      total = sum(
        extra
          ? extra.map((value: any) => {
              return value.addon_price
            })
          : null,
      )
    }
    setAaddonTotal(total)
  }
  if (openTab === 1) {
    history.push('/restaurant')
  }
  if (openTab === 2) {
    history.push('/cart')
  }
  const price = product.price * product.quantity
  // console.log('addonTotal', addonTotal)
  const setLocalStorage = (addon: any, product: any) => {
    const addonValue = addon
    const array = addonValue.split(',')
    // console.log('product', product)
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    const product1 = {
      _id: product._id || new Date().getTime(),
      storeId: shop.id,
      itemId: productId,
      count: product.quantity || props.location.state.quantity,
      addon: parseFloat(array[2])
        ? parseFloat(array[2])
        : props.location.state.addonId || '',
      extra: extra,
      productId: productId,
      addonId: parseFloat(array[2])
        ? parseFloat(array[2])
        : props.location.state.addonId,
      addonName: array[0] ? array[0] : props.location.state.addonName,
      addonPrice: parseFloat(array[1])
        ? parseFloat(array[1])
        : props.location.state.addonPrice,
      product_name: product.name || props.location.state.product_name,
      price: product.price || props.location.state.price,
      product_comments: props.location.state.product_comments || comment,
      total_price:
        price + (parseFloat(array[1]) * product.quantity || 0) + addonTotal ||
        props.location.state.total_price + addonTotal,
      // total_price: price,
      quantity: product.quantity || props.location.state.quantity,
    }
    console.log('product1', product1)
    const existingProduct = filter(a, function (o: any) {
      return o._id !== product1._id
    })
    existingProduct.splice(existingProduct.length, 0, product1)
    console.log('existingProduct', existingProduct)
    // a.splice(a.length, 0, product1)
    // a.push(product1)
    localStorage.setItem('CartProducts', JSON.stringify(existingProduct))
    // dispatch(setProducts(existingProduct))
    // dispatch(setLocalStorageForCart(product1))
  }
  return (
    <div className="bg-offWhite p-5 min-h-screen order-item">
      <div className="mx-auto max-w-xl">
        <div>
          <h2 className="font-bold text-2xl mb-2.5">Add New Item</h2>
        </div>
        <div className="bg-white customize-order py-5 mb-5">
          <div className="flex items-center p-5">
            <div className="mr-4">
              <img
                className="w-12 h-12 order-item-img"
                src={product.image_url ? IMG_URL + product.image_url : itemImg}
                alt=""
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">
                {product.name || product.product_name}
              </h3>
              <p className="text-xs">${price}</p>
            </div>
            <div className="flex items-center justify-around order-item-quantity">
              <button
                className="px-2 my-1 border-r focus:outline-none"
                type="button"
                onClick={() => {
                  product.quantity > 1 &&
                    setProduct({ ...product, quantity: product.quantity - 1 })
                }}
              >
                <Minus className="w-5 h-5" />
              </button>
              <div>
                <span className="px-2">{product.quantity}</span>
              </div>
              <button
                className="px-2 my-1 border-l focus:outline-none"
                type="button"
                onClick={() => {
                  setProduct({ ...product, quantity: product.quantity + 1 })
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 border border-dashed item-desc-header px-5 py-1">
              <div>
                <p className="text-xs">OPTIONS</p>
              </div>
              <div className="text-xs text-right">
                <p>PRICE</p>
              </div>
            </div>
            <div className="px-5 pt-6 pb-4">
              <Formik initialValues={{}} onSubmit={(values) => {}}>
                {() => (
                  // <Form>
                  <>
                    <div className="my-3">
                      <Input
                        type="text"
                        name="comment"
                        value={comment || props.location.state.product_comments}
                        placeholder="Comment*"
                        onChange={(event) => {
                          setCommments(event.target.value)
                        }}
                      />
                    </div>

                    {addonList
                      ? addonList.map((data: any, index: number) => (
                          <div className="grid grid-cols-2" key={data.id}>
                            {data.type === 'SNG' ? (
                              <Radio
                                name="addon"
                                label={data.addon_name}
                                checked={
                                  data.id === props.location.state.addonId
                                }
                                value={
                                  data.addon_name +
                                  ',' +
                                  data.price +
                                  ',' +
                                  data.id
                                }
                                onChange={(e: any) => setAddon(e.target.value)}
                              />
                            ) : (
                              <Checkbox
                                name={'addon_' + data.id}
                                value={
                                  data.addon_name +
                                  ',' +
                                  data.price +
                                  ',' +
                                  data.id
                                }
                                checked={addonExit(data.id)}
                                // defaultChecked={true}
                                label={data.addon_name}
                                onChange={(e: any) =>
                                  e.target.checked
                                    ? setAddonValue(e.target.value)
                                    : setAddonValue(e.target.value)
                                }
                              />
                            )}
                            <p className="text-right py-2" key={index}>
                              ${data.price}
                            </p>
                          </div>
                        ))
                      : null}
                  </>
                  // {' '}
                  // </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <ButtonTabs
          tabs={tabOptions}
          openTab={openTab || 1}
          setOpenTab={setOpenTab}
          setLocalStorage={() => setLocalStorage(addon, product)}
        />
      </div>
      <div className="mx-5 sticky bottom-7 flex justify-center">
        <Menu />
      </div>
    </div>
  )
}

export default CustomizeOrder
