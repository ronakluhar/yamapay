import itemImg from '../../images/item1.webp'
import { Plus } from '../common/icons'

const categories = [
  {
    category: 'Feather',
    products: [
      {
        product_img: itemImg,
        product_name: 'Freddo',
        product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
        product_price: '$12.00',
      },
      {
        product_img: itemImg,
        product_name: 'Freddo',
        product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
        product_price: '$12.00',
      },
      {
        product_img: itemImg,
        product_name: 'Freddo',
        product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
        product_price: '$12.00',
      },
    ],
  },
]
const CategoryWiseProducts = () => {
  return (
    <div className="product-category">
      {categories.map((category, index) => (
        <>
          <h5 className="text-base my-1.5">{category.category}</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category?.products?.map((product, index) => (
              <div className="flex items-center bg-white product" key={index}>
                <div>
                  <img
                    className="product-img"
                    src={product.product_img}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center pr-2 pl-5">
                  <div>
                    <h6 className="product-name">{product.product_name}</h6>
                    <p className="product-desc text-gray">
                      {product.product_desc}
                    </p>
                    <span className="text-blue text-sm">
                      {product.product_price}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex justify-end pr-2">
                  <Plus className="text-white w-6 h-6 bg-blue rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}

export default CategoryWiseProducts
