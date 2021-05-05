import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import itemImg from '../../images/item1.webp'
import { Radio } from '../common/Form'
import { Minus, Plus } from '../common/icons'
// import { useHistory } from 'react-router'
import { ButtonTabs } from '../common/Tabs'
import { getAddonList } from '../../redux/merchantList/action'
import { filter } from 'lodash'
const IMG_URL = 'http://127.0.0.1:8000/'

const tabOptions = [
  { id: 1, tabName: 'Close' },
  { id: 2, tabName: 'Save change' },
]
const CustomizeOrder = (props: any) => {
  let shop: any = []
  shop = JSON.parse(localStorage.getItem('shop') || '[]')
  let productId: any = 0
  let storeId: any = 0
  storeId = shop.id
  productId = props.location.state.productId

  if (props.location.state[0]) {
    productId = props.location.state[0].id
  }
  const setLocalStorage = (addon: any, product: any) => {
    // console.log(product.id)
    // if (openTab === 1) {
    //   console.log(openTab)
    // } else {
    //   console.log(openTab)
    // }
    const str = addon
    const array = str.split(',')
    let a: any = []
    a = JSON.parse(localStorage.getItem('CartProducts') || '[]')
    const product1 = {
      productId: productId,
      addonId: array[2] || '',
      addonName: array[0] || '',
      addonPrice: parseInt(array[1]) || '',
      product_name: product.name || props.location.state.product_name,
      price: product.price || props.location.state.price,
      total_price:
        price + (parseInt(array[1]) || 0) || props.location.state.total_price,
      // total_price: price,
      quantity: product.quantity || props.location.state.quantity,
    }
    const existingProduct = filter(a, function (o: any) {
      return o.productId !== productId
    })
    existingProduct.splice(existingProduct.length, 0, product1)
    localStorage.setItem('CartProducts', JSON.stringify(existingProduct))
  }

  // const history = useHistory()
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
  const [openTab, setOpenTab] = useState(2)
  const price = product.price * product.quantity
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
                    {addonList
                      ? addonList.map((data: any, index: number) => (
                          <div className="grid grid-cols-2" key={index}>
                            <Radio
                              name="addon"
                              label={data.addon_name}
                              value={
                                data.addon_name +
                                ',' +
                                data.price +
                                ',' +
                                data.id
                              }
                              onChange={(e: any) => setAddon(e.target.value)}
                            />
                            <p className="text-right py-2" key={index}>
                              ${data.price}
                            </p>
                          </div>
                        ))
                      : null}
                  </>
                  // </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <ButtonTabs
          tabs={tabOptions}
          openTab={openTab}
          setOpenTab={setOpenTab}
          setLocalStorage={() => setLocalStorage(addon, product)}
        />
      </div>
    </div>
  )
}

export default CustomizeOrder
