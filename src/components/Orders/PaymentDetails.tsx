const PaymentDetails = (props: any) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b border-border border-dashed p-5">
        <p className="text-darkgray payment-method">
          Payment Method: <span className="font-bold">CARD</span>
        </p>
        <p className="text-darkgray payment-method">
          Payment id: <span className="font-bold">GTF-125455</span>
        </p>
      </div>
      <div className="bg-white order-summary">
        <div className="flex justify-between items-center py-5 mx-5 border-b border-dashed border-border">
          <p>Item Total</p>
          <p>
            $
            {props.lastOrder
              ? (
                  parseFloat(props.lastOrder.sub_total.toString()) -
                  parseFloat(props.lastOrder.tax)
                ).toFixed(2)
              : 0}
          </p>
        </div>
        <div className="flex justify-between items-center py-5 mx-5 border-b border-dashed border-border">
          <p>Tips</p>
          <p>
            ${props.lastOrder ? parseFloat(props.lastOrder.tip).toFixed(2) : 0}
          </p>
        </div>
        <div className="flex justify-between items-center py-5 mx-5 border-b border-dashed border-border">
          <p>Tax</p>
          <p>
            ${props.lastOrder ? parseFloat(props.lastOrder.tax).toFixed(2) : 0}
          </p>
        </div>
        <div className="flex justify-between items-center py-5 mx-5">
          <p className="font-bold text-base">Total</p>
          <p className="font-bold text-base">
            $
            {props.lastOrder.total
              ? parseFloat(props.lastOrder.total).toFixed(2)
              : 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
