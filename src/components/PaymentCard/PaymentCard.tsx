import { LeftArrow, Verified } from '../common/icons'
import logo from '../../images/logo.png'
import { Input } from '../common/Form'
import { Formik, Field } from 'formik'
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
          {({ handleSubmit, setFieldValue, errors, touched, ...meta }) => (
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
                        width: 100%;
                      `,
                    },
                    inputWrapper: {
                      base: css`
                        display: block;
                        border: none;
                        box-shadow: none;
                        height: auto;
                      `,
                      errored: css`
                        border: 1px;
                        border-color: transparent;
                        box-shadow: none;
                      `,
                      focused: css`
                        border-color: unset;
                        box-shadow: unset;
                      `,
                    },
                    input: {
                      base: css`
                        padding: 1rem;
                        background-color: #f4f4f8;
                        border: none;
                        border-radius: 10px;
                        outline: none;
                        width: 100% !important;
                      `,
                      cardNumber: 'custom-input',
                      expiryDate: css`
                        margin-right: 24px;
                      `,
                    },
                    errorText: {
                      base: css`
                        color: #cd051d;
                      `,
                    },
                  }}
                >
                  <div className="flex items-center mb-5">
                    <svg {...getCardImageProps({ images })} />
                    <div className="w-full">
                      <Field name="cardNumber">
                        {(field: any) => (
                          <input
                            className="custom-box-input"
                            value={field.form.values.cardNumber}
                            {...getCardNumberProps({
                              onBlur: field.onBlur,
                              onChange: (event: any) => {
                                setFieldValue('cardNumber', event.target.value)
                              },
                            })}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Field name="expiryDate">
                      {(field: any) => (
                        <input
                          className="mr-6"
                          value={field.form.values.expiryDate}
                          {...getExpiryDateProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('expiryDate', event.target.value)
                            },
                          })}
                        />
                      )}
                    </Field>
                    <Field name="cvc">
                      {(field: any) => (
                        <input
                          value={field.form.values.cvc}
                          {...getCVCProps({
                            onBlur: field.onBlur,
                            onChange: (event: any) => {
                              setFieldValue('cvc', event.target.value)
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
