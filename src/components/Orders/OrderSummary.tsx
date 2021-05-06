type OrderSummaryProps = {
  subtotal: Number
  Tax: Number
}
const OrderSummary = ({ subtotal, Tax }: OrderSummaryProps) => {
  return (
    <div>
      <h3 className="text-sm font-bold mb-2.5">Order Summary</h3>
      <div className="bg-white px-5 py-3.5 order-summary">
        <div className="flex justify-between items-center pt-5 pb-3.5 border-b border-dashed border-border">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <div className="flex justify-between items-center pt-5 pb-3.5 border-b border-dashed border-border">
          <p>Service Fee</p>
          <p>0.0</p>
        </div>
        <div className="flex justify-between items-center pt-5 pb-3.5">
          <p>Tax(%)</p>
          <p>{Tax || 0.0}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
