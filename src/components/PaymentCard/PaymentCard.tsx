import { LeftArrow, Verified } from '../common/icons'
import logo from '../../images/logo.png'
import { Input } from '../common/Form'
import { Formik } from 'formik'

const PaymentCard = () => {
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div className="relative text-center mb-10">
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Payment Methods</h2>
        </div>
        <div className="bg-white p-6 rounded-10 mb-5 relative payment-merchant">
          <img className="mx-auto h-7 w-auto" src={logo} alt="" />
          <div>
            <Verified className="h-5 v-5 text-lime absolute right-8 top-8" />
          </div>
        </div>
        <div className="bg-white px-3 py-16 rounded-30 mb-5 relative">
          <Formik initialValues={{}} onSubmit={(values) => {}}>
            <>
              <div className="mb-5">
                <Input type="text" name="name_on_card" label="Name on Card" />
              </div>
              <div className="mb-5">
                <Input type="text" name="card_number" label="Card Number" />
              </div>
              <div className="flex justify-between items-center">
                <Input type="month" name="expiry" label="Expiry Date" />
                <Input type="text" name="cvv" label="CVV" />
              </div>
            </>
          </Formik>
        </div>
        <button className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none py-5 px-16">
          Save Card
        </button>
      </div>
    </div>
  )
}

export default PaymentCard
