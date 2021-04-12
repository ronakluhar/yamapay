import itemImg from '../../images/item1.webp'

const OrderDetails = () => {
  return (
    <div className="flex py-5 mx-5 justify-between items-center order-items border-b border-dashed border-border last:border-0">
      <div className="flex">
        <img className="w-12 h-12 rounded-10 mr-2.5" src={itemImg} alt="" />
        <div>
          <p className="text-sm">Burger Meal</p>
          <p className="item-desc">Extra Cheese</p>
          <p className="item-desc">Extra mayonnaise</p>
          <p className="item-desc">Extra Test</p>
        </div>
      </div>
      <div>
        <p className="text-sm">x1</p>
      </div>
      <div>
        <p className="text-sm font-bold">$133.00</p>
      </div>
    </div>
  )
}

export default OrderDetails
