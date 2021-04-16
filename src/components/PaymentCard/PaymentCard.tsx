import { LeftArrow, Verified } from '../common/icons'
import logo from '../../images/logo.png'
import { Input } from '../common/Form'
import { Form, Formik } from 'formik'
import { paymentCardSchema } from '../../validators'

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
        <Formik
          validationSchema={paymentCardSchema}
          initialValues={{
            cvv: '',
            name_on_card: '',
            expiry: '',
            card_number: '',
          }}
          onSubmit={(values) => {}}
        >
          {({ errors }) => (
            <Form>
              <div className="bg-white px-3 py-16 rounded-30 mb-5 relative">
                <div className="mb-5">
                  <Input
                    type="text"
                    name="name_on_card"
                    label="Name on Card"
                    error={errors.name_on_card}
                  />
                </div>
                <div className="mb-5">
                  <Input
                    type="text"
                    name="card_number"
                    label="Card Number"
                    error={errors.card_number}
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    type="month"
                    name="expiry"
                    label="Expiry Date"
                    error={errors.expiry}
                  />
                  <Input
                    type="number"
                    name="cvv"
                    label="CVV"
                    min="000"
                    error={errors.cvv}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none py-5 px-16"
              >
                Save Card
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PaymentCard
