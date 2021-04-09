import { Form, Formik } from 'formik'
import { useState } from 'react'
import itemImg from '../../images/item1.webp'
import { Checkbox } from '../common/Form'
import { Minus, Plus } from '../common/icons'

const CustomizeOrder = () => {
  const [quantity, setQuantity] = useState(Number)
  return (
    <div className="bg-offWhite p-5 h-screen order-item">
      <div className="mx-auto max-w-xl">
        <div>
          <h2 className="font-bold text-2xl mb-2.5">Add New Item</h2>
        </div>
        <div className="bg-white customize-order py-5">
          <div className="flex items-center p-5">
            <div className="mr-4">
              <img className="w-12 h-12 order-item-img" src={itemImg} alt="" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Burger Meal</h3>
              <p className="text-xs">$20.45</p>
            </div>
            <div className="flex items-center justify-around order-item-quantity">
              <button
                className="px-2 my-1 border-r"
                type="button"
                onClick={() => {
                  setQuantity(quantity + 1)
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
              <div>
                <span className="px-2">{quantity}</span>
              </div>
              <button
                className="px-2 my-1 border-l"
                type="button"
                onClick={() => {
                  quantity > 0 && setQuantity(quantity - 1)
                }}
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 border border-dashed item-desc-header px-5 py-1">
              <div>
                <p className="text-xs">SIZE</p>
              </div>
              <div className="text-xs text-right">
                <p>PRICE</p>
              </div>
            </div>
            <div className="px-5 pt-6 pb-4">
              <Formik initialValues={{}} onSubmit={(values) => {}}>
                {() => (
                  <Form>
                    <div className="grid grid-cols-2">
                      <Checkbox name="size_s" label="Size S (500 ml)" />
                      <p className="text-right py-2">$0.0</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <Checkbox name="size_m" label="Size M (750 ml)" />
                      <p className="text-right py-2">$10.00</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <Checkbox name="size_l" label="Size L (1100 ml)" />
                      <p className="text-right py-2">$25.40</p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="border border-dashed item-desc-header px-5 py-1">
              <div>
                <p className="text-xs">Options</p>
              </div>
            </div>
            <div className="px-5 pt-6 pb-4">
              <Formik initialValues={{}} onSubmit={(values) => {}}>
                {() => (
                  <Form>
                    <Checkbox name="option_1" label="Add Lemon" />
                    <Checkbox name="option_2" label="Add Ice" />
                    <Checkbox name="option_3" label="Add Mint" />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizeOrder