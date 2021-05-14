import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import itemImg from '../../images/item1.webp'
import { getCategoryList } from '../../redux/merchantList/action'
// import * as actionTypes from '../../redux/merchantList/actionType'
// import api from '../../utils/API'
import { Plus } from '../common/icons'
const IMG_URL = 'http://127.0.0.1:8000/'

const CategoryWiseProducts = (props: any) => {
  // const shop = props.store
  let shop: any = []
  shop = localStorage.getItem('shop')
  shop = shop ? JSON.parse(shop) : []
  // console.log(shop.id)
  // eslint-disable-next-line no-unused-vars
  const [selectedproduct, setSelectedproduct] = useState({
    name: '',
    price: '',
  })
  const history = useHistory()
  // const storeId = props.store.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoryList(shop.id))
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
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                key={categories.id}
              >
                {categories?.productinfos?.map((product: any, index: any) => (
                  <div
                    className="flex items-center bg-white product"
                    key={product.id}
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
                    <div
                      className="flex-1 flex justify-end pr-2"
                      onClick={() =>
                        history.push('/customize-order', [product])
                      }
                    >
                      <Plus className="text-white w-6 h-6 bg-blue rounded-lg cursor-pointer" />
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
