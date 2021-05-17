// import { useState } from 'react'
import productImg from '../../images/hotel1.jpg'
// import { Minus, Plus } from '../common/icons'
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
  // const [products, setProducts] = useState(props.productList)
  // const manageQuantity = (index: number, action: string) => {
  //   setProducts((product: any) =>
  //     product.map((el: any, i: any) =>
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
                style={{ height: '130px', width: '150px' }}
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
                <div className="product-quantity flex items-center"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecommendedProducts
