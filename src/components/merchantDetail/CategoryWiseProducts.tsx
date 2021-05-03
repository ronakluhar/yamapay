import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import itemImg from '../../images/item1.webp'
import { getCategoryList } from '../../redux/merchantList/action'
import { Plus } from '../common/icons'
const IMG_URL = 'http://127.0.0.1:8000/'

// const categories = [
//   {
//     category: 'Feather',
//     products: [
//       {
//         product_img: itemImg,
//         product_name: 'Freddo',
//         product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
//         product_price: '$12.00',
//       },
//       {
//         product_img: itemImg,
//         product_name: 'Freddo',
//         product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
//         product_price: '$12.00',
//       },
//       {
//         product_img: itemImg,
//         product_name: 'Freddo',
//         product_desc: 'Abc Coffe Shop 512 Jim Rosa Lane',
//         product_price: '$12.00',
//       },
//     ],
//   },
// ]
const CategoryWiseProducts = (props: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoryList(props.storeId))
  }, [dispatch])
  const { categoryList } = useSelector((state: any) => ({
    categoryList: state.merchantListReducer.categoryList,
  }))

  return (
    <div className="product-category">
      {categoryList.categories
        ? categoryList.categories.map((categories: any, index: any) => (
            <>
              <h5 className="text-base my-1.5">{categories.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories?.productinfos?.map((product: any, index: any) => (
                  <div
                    className="flex items-center bg-white product"
                    key={index}
                  >
                    <div>
                      <img
                        className="product-img"
                        style={{ height: '130px', width: '130px' }}
                        src={
                          product.image_url
                            ? IMG_URL + product.image_url
                            : itemImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center pr-2 pl-5">
                      <div>
                        <h6 className="product-name">{product.name}</h6>
                        <p className="product-desc text-gray">
                          {product.description}
                        </p>
                        <span className="text-blue text-sm">
                          USD {product.price}
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
          ))
        : null}
      {categoryList.addoncategory
        ? categoryList.addoncategory.map((categories: any, index: any) => (
            <>
              <h5 className="text-base my-1.5">{categories.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories?.addons?.map((product: any, index: any) => (
                  <div
                    className="flex items-center bg-white product"
                    key={index}
                  >
                    <div>
                      <img
                        className="product-img"
                        style={{ height: '130px', width: '130px' }}
                        src={
                          product.image_url
                            ? IMG_URL + product.image_url
                            : itemImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center pr-2 pl-5">
                      <div>
                        <h6 className="product-name">{product.addon_name}</h6>
                        <span className="text-blue text-sm">
                          USD {product.price}
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
          ))
        : null}
    </div>
  )
}

export default CategoryWiseProducts
