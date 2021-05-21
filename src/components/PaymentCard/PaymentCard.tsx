import { LeftArrow, Verified } from '../common/icons'
import logo from '../../images/logo.png'
import { Input } from '../common/Form'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router'
// @ts-ignore
import { css } from 'styled-components'
// @ts-ignore
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs'

// @ts-ignore
import images from 'react-payment-inputs/images'
import { useState } from 'react'

const PaymentCard = (props: any) => {
  const card = JSON.parse(localStorage.getItem('cardDetails') || '[]')
  const history = useHistory()
  const [cardDetails, setCardDetails] = useState({})
  let cardNumber: any = card ? card.cardNumber : ''
  let expiryDate: any = card ? card.expiryDate : ''
  let cvc: any = card ? card.cvc : ''
  const nameOnCard: any = card ? card.nameOnCard : ''
  console.log(cardNumber, expiryDate, cvc, nameOnCard)
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs()
  const paymentCardSchema = Yup.object({
    nameOnCard: Yup.string().required('Name is a required field'),
  })
  if (Object.keys(cardDetails).length > 0) {
    localStorage.setItem('cardDetails', JSON.stringify(cardDetails) || '[]')
    history.push('/review-order', props.location.state)
  }

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
            nameOnCard: '',
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
            if (meta.erroredInputs.nameOnCard) {
              errors.nameOnCard = meta.erroredInputs.nameOnCard
            }
            return errors
          }}
        >
          {({ handleSubmit, setFieldValue, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="bg-white px-3 py-16 rounded-30 mb-5 relative">
                <div className="mb-5">
                  <Input
                    type="text"
                    name="name_on_card"
                    label="Name on Card"
                    error={errors.nameOnCard?.toString()}
                  />
                </div>
                <div className="mb-5">
                  <svg {...getCardImageProps({ images })} />
                  <Input
                    type="text"
                    name="card_number"
                    label="Card Number"
                    error={errors.cardNumber}
                    {...getCardNumberProps({
                      onChange: (event: any) => {
                        setFieldValue('cardNumber', event.target.value)
                        console.log(event.target.value)
                      },
                    })}
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    type="month"
                    name="expiry"
                    label="Expiry Date"
                    error={errors.expiryDate?.toString()}
                    {...getExpiryDateProps({
                      onChange: (event: any) => {
                        setFieldValue('expiryDate', event.target.value)
                      },
                    })}
                  />
                  <Input
                    type="number"
                    name="cvv"
                    label="CVV"
                    min="000"
                    error={errors.cvc?.toString()}
                    {...getCVCProps({
                      onChange: (event: any) => {
                        setFieldValue('cvc', event.target.value)
                      },
                    })}
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
        <Formik
          enableReinitialize
          initialValues={{
            cardNumber: card ? card.cardNumber : '',
            expiryDate: card ? card.expiryDate : '',
            cvc: card ? card.cvc : '',
            nameOnCard: card ? card.nameOnCard : '',
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
            if (meta.erroredInputs.nameOnCard) {
              errors.nameOnCard = meta.erroredInputs.nameOnCard
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
                    name="nameOnCard"
                    label="Name on Card"
                    error={errors.nameOnCard?.toString()}
                    onChange={(event) => {
                      setFieldValue('nameOnCard', event.target.value)
                    }}
                  />
                </div>
                <PaymentInputsWrapper
                  {...wrapperProps}
                  styles={{
                    fieldWrapper: {
                      base: css`
                        margin-bottom: 1rem;
                      `,
                    },
                    inputWrapper: {
                      base: css`
                        border-color: blue;
                      `,
                      errored: css`
                        border-color: maroon;
                      `,
                      focused: css`
                        border-color: unset;
                        box-shadow: unset;
                        outline: 2px solid blue;
                        outline-offset: 2px;
                      `,
                    },
                    input: {
                      base: css`
                        color: black;
                      `,
                      errored: css`
                        color: maroon;
                      `,
                      cardNumber: 'custom-input',
                      expiryDate: css`
                        width: 10rem;
                      `,
                      cvc: css`
                        width: 5rem;
                      `,
                    },
                    errorText: {
                      base: css`
                        color: maroon;
                      `,
                    },
                  }}
                >
                  <svg {...getCardImageProps({ images })} />
                  <div>
                    <Field name="cardNumber" value={cardNumber}>
                      {(field: any) => (
                        <input
                          className="custom-box-input"
                          value={field.form.values.cardNumber}
                          {...console.log('field', field.form.values)}
                          {...getCardNumberProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('cardNumber', event.target.value)
                              cardNumber = event.target.value
                            },
                          })}
                          // value=""
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="expiryDate">
                      {(field: any) => (
                        <input
                          value={field.form.values.expiryDate}
                          {...getExpiryDateProps({
                            onBlur: field.onBlur,
                            // value: expiryDate,
                            onChange: (event: any) => {
                              setFieldValue('expiryDate', event.target.value)
                              expiryDate = event.target.value
                            },
                          })}
                          // value=""
                        />
                      )}
                    </Field>
                    <Field name="cvc">
                      {(field: any) => (
                        <input
                          value={field.form.values.cvc}
                          {...getCVCProps({
                            onBlur: field.onBlur,
                            // value: cvc,
                            onChange: (event: any) => {
                              setFieldValue('cvc', event.target.value)
                              cvc = event.target.value
                            },
                          })}
                          // value=""
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
