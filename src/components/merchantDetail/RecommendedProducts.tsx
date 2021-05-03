// import { useState } from 'react'
import productImg from '../../images/hotel1.jpg'
import { Minus, Plus } from '../common/icons'
const IMG_URL = 'http://127.0.0.1:8000/'

// const demoProducts = [
//   {
//     product_name: 'Burger Meal',
//     product_desc: 'Description of Product...',
//     price: '$20.45',
//     product_image: productImg,
//     quantity: 1,
//   },
//   {
//     product_name: 'Burger Meal',
//     product_desc: 'Description of Product...',
//     price: '$20.45',
//     product_image: productImg,
//     quantity: 2,
//   },
//   {
//     product_name: 'Burger Meal',
//     product_desc: 'Description of Product...',
//     price: '$20.45',
//     product_image: productImg,
//     quantity: 3,
//   },
//   {
//     product_name: 'Burger Meal',
//     product_desc: 'Description of Product...',
//     price: '$20.45',
//     product_image: productImg,
//     quantity: 4,
//   },
// ]
const RecommendedProducts = (props: any) => {
  // console.log(props.productList)
  // const [products, setProducts] = useState(demoProducts)
  // const manageQuantity = (index: number, action: string) => {
  //   setProducts((product) =>
  //     product.map((el, i) =>
  //       i === index
  //         ? {
  //             ...el,
  //             quantity:
  //               el.quantity +
  //               parseInt(
  //                 `${action === 'increment' ? 1 : el.quantity > 1 ? -1 : 0}`,
  //               ),
  //             // or
  //             // quantity: Math.max(0, el.quantity + action === "increment" ? 1 : -1)
  //           }
  //         : el,
  //     ),
  //   )
  // }
  return (
    <div>
      <h5 className="text-base my-3">Recommended</h5>
      <div className="flex flex-wrap">
        {!props.productList ? (
          <h2>No Product Available</h2>
        ) : (
          props.productList.map((product: any, index: any) => (
            <div
              className="recommended-product mr-3 mb-4 rounded-lg"
              key={index}
            >
              <img
                className="product-img"
                src={
                  product.image_url ? IMG_URL + product.image_url : productImg
                }
                alt="dish"
              />
              <h6 className="text-violet text-base product-name break-words">
                {product.name}
              </h6>
              <p className="text-violet product-desc break-words">
                {product.description}
              </p>
              <div className="flex justify-between px-2">
                <div>
                  <span className="text-green product-price">
                    USD {product.price}
                  </span>
                </div>
                <div className="product-quantity flex items-center">
                  {/* {productQuantity !== 0 && ( */}
                  <>
                    <div
                      className="decrease-quantity w-3 h-3 leading-none border border-lightgray flex justify-center items-center cursor-pointer"
                      // onClick={() => manageQuantity(index, 'decrement')}
                    >
                      <Minus className="h-4 w-4 text-lightgray" />
                    </div>
                    <span className="text-xs text-black1 mx-1">
                      {product.quantity}
                    </span>
                    <div
                      className="increase-quantity w-3 h-3 leading-none bg-blue text-white flex justify-center items-center cursor-pointer"
                      // onClick={() => manageQuantity(index, 'increment')}
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                  </>
                  {/* )} */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecommendedProducts
