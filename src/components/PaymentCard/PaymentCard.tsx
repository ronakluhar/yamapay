import { LeftArrow, Verified } from '../common/icons'
import logo from '../../images/logo.png'
import { Input } from '../common/Form'
import { Formik, Field } from 'formik'
// import { paymentCardSchema } from '../../validators'
// import CreditCardInput from 'react-credit-card-input'
import * as Yup from 'yup'
import { useHistory } from 'react-router'

// @ts-ignore
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs'
// @ts-ignore
import images from 'react-payment-inputs/images'
import { useEffect, useState } from 'react'
const PaymentCard = () => {
  const history = useHistory()
  const [cardDetails, setCardDetails] = useState({})
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs()
  const paymentCardSchema = Yup.object({
    name_on_card: Yup.string().required('Name is a required field'),
  })
  useEffect(() => {
    console.log('cardDetails', cardDetails)
    // Object.keys(cardDetails).length > 0 &&
    //   localStorage.setItem('cardDetails', JSON.stringify(cardDetails) || '[]')
  }, [cardDetails])
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div
          className="relative text-center mb-10"
          onClick={() => history.push('/review-order')}
        >
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
          initialValues={{
            cardNumber: '',
            expiryDate: '',
            cvc: '',
            name_on_card: '',
            image: '',
          }}
          validationSchema={paymentCardSchema}
          onSubmit={(data) => setCardDetails(data)}
          validate={() => {
            const errors: any = {}
            if (meta.erroredInputs.cardNumber) {
              errors.cardNumber = meta.erroredInputs.cardNumber
            }
            if (meta.erroredInputs.expiryDate) {
              errors.expiryDate = meta.erroredInputs.expiryDate
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc
            }
            if (meta.erroredInputs.name_on_card) {
              errors.name_on_card = meta.erroredInputs.name_on_card
            }
            return errors
          }}
        >
          {({ handleSubmit, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-3 py-16 rounded-30 mb-5 relative">
                <div className="mb-5">
                  <Input
                    type="text"
                    name="name_on_card"
                    label="Name on Card"
                    error={errors.name_on_card}
                    onChange={(event) => {
                      setFieldValue('name_on_card', event.target.value)
                      setFieldValue('image', getCardImageProps({ images }))
                    }}
                  />
                </div>
                <PaymentInputsWrapper
                  {...wrapperProps}
                  styles={{
                    fieldWrapper: {
                      base: `
                        margin-bottom: 1rem;
                      `,
                    },
                    inputWrapper: {
                      base: `
                        border-color: blue;
                      `,
                      errored: `
                        border-color: maroon;
                      `,
                      focused: `
                        border-color: unset;
                        box-shadow: unset;
                        outline: 2px solid blue;
                        outline-offset: 2px;
                      `,
                    },
                    input: {
                      base: `
                        color: black;
                      `,
                      errored: `
                        color: maroon;
                      `,
                      cardNumber: `
                        width: 15rem;
                      `,
                      expiryDate: `
                        width: 10rem;
                      `,
                      cvc: `
                        width: 5rem;
                      `,
                    },
                    errorText: {
                      base: `
                        color: maroon;
                      `,
                    },
                  }}
                >
                  <svg {...getCardImageProps({ images })} />
                  {console.log(getCardImageProps({ images }))}
                  <div>
                    <Field name="cardNumber">
                      {(field: any) => (
                        <input
                          {...getCardNumberProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('cardNumber', event.target.value)
                              setFieldValue(
                                'image',
                                getCardImageProps({ images }),
                              )
                            },
                          })}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="expiryDate">
                      {(field: any) => (
                        <input
                          {...getExpiryDateProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('expiryDate', event.target.value)
                              setFieldValue(
                                'image',
                                getCardImageProps({ images }),
                              )
                            },
                          })}
                        />
                      )}
                    </Field>
                    <Field name="cvc">
                      {(field: any) => (
                        <input
                          {...getCVCProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('cvc', event.target.value)
                              setFieldValue(
                                'image',
                                getCardImageProps({ images }),
                              )
                            },
                          })}
                        />
                      )}
                    </Field>
                  </div>
                </PaymentInputsWrapper>
              </div>
              <button
                className="rounded-2xl w-full bg-blue text-white font-semibold focus:outline-none py-5 px-16"
                type="submit"
              >
                Save Card
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PaymentCard
