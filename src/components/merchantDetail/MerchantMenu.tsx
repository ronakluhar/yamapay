import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RecommendedProducts } from '.'
import { getProductsList } from '../../redux/merchantList/action'
import { Clock } from '../common/icons'
import { ButtonTabs } from '../common/Tabs'
import { Tags } from '../merchantList'
import { Menu } from '../navigation'
import CategoryWiseProducts from './CategoryWiseProducts'
const tabOptions = [
  { id: 1, tabName: 'Dine-In' },
  { id: 2, tabName: 'Takeaway' },
]

// const [productList, setProducts] = useState(productList)

const MerchantMenu = (props: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsList(props.location.state[0].id))
  }, [dispatch])
  const { productList } = useSelector((state: any) => ({
    productList: state.merchantListReducer.productList,
  }))
  // const MerchantMenu = () => {
  const [openTab, setOpenTab] = useState(1)
  return (
    <div className="merchant-menu bg-white p-0 my-0 relative max-w-6xl mx-auto">
      <main>
        <div className="merchant-banner w-full">
          <img
            className="w-full"
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            alt="restaurant banner"
          />
        </div>
        <div className="merchant-detail absolute top-48 bg-white py-4 w-full">
          <div className="flex mb-8">
            <div className="merchant-detail-wrapper px-5 flex-1">
              <div className="flex justify-between items-center">
                <h1 className="merchant-name">
                  {props.location.state[0].store_name}
                </h1>
                <p className="merchant-rating">4.5</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lightgray text-xs">
                  Restaurant, American Food, Chinese
                </p>
                <div className="est-delivery-time rounded-lg p-1 text-blue bg-skyblue flex items-center">
                  <Clock className="mr-1 h-2.5 w-2.5 text-blue" />
                  30min
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5">
            <ButtonTabs
              tabs={tabOptions}
              openTab={openTab}
              setOpenTab={setOpenTab}
            />
          </div>
          <div className="mx-5">
            <Tags />
          </div>
          <div className="mx-5">
            <RecommendedProducts productList={productList} />
          </div>
          <div className="mx-5 mb-12">
            <CategoryWiseProducts storeId={props.location.state[0].id} />
          </div>
          <div className="mx-5 sticky bottom-7 flex justify-center">
            <Menu />
          </div>
        </div>
      </main>
    </div>
  )
}

export default MerchantMenu
