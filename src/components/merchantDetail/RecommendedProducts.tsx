// import { useState } from 'react'
import productImg from '../../images/hotel1.jpg'

const products = [
  {
    product_name: 'Burger Meal',
    product_desc: 'Description of Product...',
    price: '$20.45',
    product_image: productImg,
  },
  {
    product_name: 'Burger Meal',
    product_desc: 'Description of Product...',
    price: '$20.45',
    product_image: productImg,
  },
  {
    product_name: 'Burger Meal',
    product_desc: 'Description of Product...',
    price: '$20.45',
    product_image: productImg,
  },
  {
    product_name: 'Burger Meal',
    product_desc: 'Description of Product...',
    price: '$20.45',
    product_image: productImg,
  },
]
const RecommendedProducts = () => {
  // const [productQuantity, setProductQuantity] = useState(0)
  // const increaseQuantity = () => {
  //   setProductQuantity((state) => state + 1)
  // }
  return (
    <div>
      <h5 className="text-base my-3">Recommended</h5>
      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <div className="recommended-product mr-3 mb-4 rounded-lg" key={index}>
            <img
              className="product-img"
              src={product.product_image}
              alt="dish"
            />
            <h6 className="text-violet text-base product-name break-words">
              {product.product_name}
            </h6>
            <p className="text-violet product-desc break-words">
              {product.product_desc}
            </p>
            <div className="flex justify-between px-2">
              <div>
                <span className="text-green product-price">
                  {product.price}
                </span>
              </div>
              <div className="product-quantity flex items-center">
                {/* {productQuantity !== 0 && ( */}
                <div className="decrease-quantity w-3 h-3 text-lightgray leading-none border border-lightgray flex justify-center items-center cursor-pointer">
                  -
                </div>
                {/* )} */}
                {/* <div>{productQuantity}</div> */}
                <div
                  className="increase-quantity w-3 h-3 leading-none bg-blue text-white flex justify-center items-center cursor-pointer"
                  // onClick={increaseQuantity}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedProducts
