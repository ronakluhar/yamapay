import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Cart, Dish, OrderList } from '../common/icons'

let totalItemCount: any
const Menu = () => {
  const history = useHistory()
  const currentPath = history.location.pathname
  let cartProducts: any = []
  cartProducts = localStorage.getItem('CartProducts')
  cartProducts = cartProducts ? JSON.parse(cartProducts) : []
  useEffect(() => {
    totalItemCount = cartProducts.length
  }, [cartProducts])
  return (
    <div className="bg-white py-4 flex justify-between items-center rounded-10 px-5 max-w-xl flex-1 menu">
      <Link
        to={'/'}
        className={`flex flex-col items-center ${
          currentPath === '/restaurant' || currentPath === '/'
            ? 'text-blue'
            : 'text-gray'
        }`}
        data-toggle="tab"
        role="tab"
      >
        <Dish className="h-5 w-5" />
        <span className="">Home</span>
      </Link>
      <Link
        to={'/cart'}
        className={`flex flex-col items-center ${
          currentPath === '/cart' ? 'text-blue' : 'text-gray'
        }`}
        data-toggle="tab"
        role="tab"
      >
        <Cart className="h-5 w-5" />
        <span>
          Cart{' '}
          <span
            className={`rounded-3xl items-center justify-center ${
              currentPath === '/cart' ? 'text-blue' : 'text-gray'
            } bg-white font-bold`}
          >
            {totalItemCount || ''}
          </span>
        </span>
      </Link>
      <Link
        to={'/order-list'}
        className={`flex flex-col items-center ${
          currentPath === '/order-status' ? 'text-blue' : 'text-gray'
        }`}
        data-toggle="tab"
        role="tab"
      >
        <OrderList className="h-5 w-5" />
        <span>My Order</span>
      </Link>
    </div>
  )
}

export default Menu
