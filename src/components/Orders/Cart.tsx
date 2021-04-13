import { useState } from 'react'
import { OrderSummary, PersonalDetails, Tips } from '.'
import { Chat, ChevronRight, Minus, Pencil, Plus, Trash } from '../common/icons'
import { ButtonTabs } from '../common/Tabs'

const tabOptions = ['Dine-In', 'Takeaway']
const Cart = () => {
  const [quantity, setQuantity] = useState(Number)
  const [openTab, setOpenTab] = useState(0)
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
              {Array(3)
                .fill(0)
                .map((index) => (
                  <div
                    className="border-b last:border-0 border-border border-dashed py-8"
                    key={index}
                  >
                    <div className="py-2 flex justify-between items-center">
                      <h4 className="text-base">KEBAB SHISH Rs 15000</h4>
                      <div className="flex">
                        <Pencil className="h-4 w-4 mr-2.5" />
                        <Trash className="h-4 w-4 text-red" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center justify-around order-item-quantity shadow-none">
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
                      <div>
                        <p className="text-base">$133</p>
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
            <Tips />
            <PersonalDetails />
            <OrderSummary />
          </div>
        </div>
        <div className="md:px-5">
          <div className="bg-blue px-10 py-4 flex justify-between items-center">
            <div className="">
              <p className="text-lg text-white font-bold">
                Total Cost: $206.00
              </p>
              <p className="text-xs text-white font-normal">
                Confirm Your Order
              </p>
            </div>
            <div>
              <ChevronRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
