import itemImg from '../../images/item1.webp'

const OrderDetails = (props: any) => {
  const products = JSON.parse(localStorage.getItem('lastOrderProducts') || '[]')
  return (
    <div className="flex py-5 mx-5 justify-between items-center order-items border-b border-dashed border-border last:border-0">
      {products
        ? products.map((index: any, value: any) => (
            <>
              <div className="flex">
                <img
                  className="w-12 h-12 rounded-10 mr-2.5"
                  src={itemImg}
                  alt=""
                />
                <div>
                  <p className="text-sm">{index.product_name}</p>
                  {index.extra != null
                    ? index.extra.map((value: any) => (
                        <p className="item-desc" key={value.addon}>
                          Extra {value.addon_name + '  $' + value.addon_price}
                        </p>
                      ))
                    : null}
                  <p className="item-desc">
                    {index.addonName ? 'Extra' + index.addonName : ''}
                  </p>
                  {/* <p className="item-desc">Extra mayonnaise</p>
                  <p className="item-desc">Extra Test</p> */}
                </div>
              </div>
              <div>
                <p className="text-sm">{'x' + index.quantity}</p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  ${props.lastOrder ? props.lastOrder.total : 0}
                </p>
              </div>
            </>
          ))
        : null}
      {/* <div className="flex">
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
        <p className="text-sm font-bold">
          ${props.lastOrder ? props.lastOrder.total : 0}
        </p>
      </div> */}
    </div>
  )
}

export default OrderDetails
