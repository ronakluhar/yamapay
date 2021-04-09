import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Pencil, Plus, Trash } from '../common/icons'

const Cart = () => {
  const [quantity, setQuantity] = useState(Number)

  return (
    <div className="bg-offWhite p-5 h-screen cart">
      <div className="mx-auto max-w-xl">
        <div>
          <h2 className="font-bold text-2xl mb-5">Cart</h2>
        </div>
        <div className="flex rounded-2xl tabs bg-white">
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            Dine-In
          </Link>
          <Link
            to="#"
            className="rounded-2xl text-darkgray focus:text-white hover:text-white hover:bg-blue font-semibold focus:bg-blue flex-1 focus:outline-none flex items-center justify-center py-5 px-16"
          >
            Takeaway
          </Link>
        </div>
        <div className="py-5">
          <h3 className="text-sm font-bold">Items in Cart</h3>
          <div className="px-4 bg-white mt-2.5 cart-items">
            {Array(3)
              .fill(0)
              .map((index) => (
                <div
                  className="border-b border-border border-dashed py-8"
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
        </div>
      </div>
    </div>
  )
}

export default Cart
