import itemImg from '../../images/item1.webp'

const OrderDetails = (props: any) => {
  const products = JSON.parse(localStorage.getItem('lastCartDetails') || '[]')
  console.log('products', products)
  return (
    <>
      {products
        ? products.cart.map((index: any, value: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex py-5 mx-5 justify-between items-center order-items border-b border-dashed border-border last:border-0">
              <div className="flex">
                <img
                  className="w-12 h-12 rounded-10 mr-2.5"
                  src={itemImg}
                  alt=""
                />
                <div>
                  <p className="text-sm">{index.product_name}</p>
                  <p className="item-desc text-darkgray">
                    {index.product_comments}
                  </p>
                  {index.extra != null
                    ? index.extra.map((value: any) => (
                        <p
                          className="item-desc text-darkgray"
                          key={value.addon}
                        >
                          Extra {value.addon_name + '  $' + value.addon_price}
                        </p>
                      ))
                    : null}
                  <p className="item-desc">
                    {index.addonName ? 'Extra' + index.addonName : ''}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm">{'x' + index.quantity}</p>
              </div>
              <div>
                <p className="text-sm font-bold">${index.total_price || 0}</p>
              </div>
            </div>
          ))
        : null}
    </>
  )
}

export default OrderDetails
