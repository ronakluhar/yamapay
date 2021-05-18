import itemImg from '../../images/item1.webp'

const OrderDetails = (props: any) => {
  // console.log('props', props.orderDetails.order_details)
  const products = props.orderDetails || []
  // console.log('products 12', products)
  return (
    <>
      {products.order_details
        ? products.order_details.map((index: any, value: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex py-5 mx-5 justify-between items-center order-items border-b border-dashed border-border last:border-0">
              <div className="flex">
                <img
                  className="w-12 h-12 rounded-10 mr-2.5"
                  src={itemImg}
                  alt=""
                />
                <div>
                  <p className="text-sm">
                    {index.name + ' $'}
                    {<b>{index.price}</b>}
                  </p>
                  <p className="item-desc text-darkgray">{index.comment}</p>
                  {index.order_details_extra_addon != null
                    ? index.order_details_extra_addon.map((value: any) => (
                        <p
                          className="item-desc text-darkgray"
                          key={value.addon_name}
                        >
                          Extra{' '}
                          {value.addon_name +
                            '  $' +
                            value.addon_price +
                            ' x ' +
                            value.addon_count +
                            ' = $' +
                            (value.addon_price * value.addon_count).toFixed(2)}
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
                <p className="text-sm font-bold">
                  ${(index.price * index.quantity).toFixed(2) || 0}
                </p>
              </div>
            </div>
          ))
        : null}
    </>
  )
}

export default OrderDetails
