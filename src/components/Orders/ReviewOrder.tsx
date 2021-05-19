import { LeftArrow } from '../common/icons'
import { RestaurantInfo } from '.'
import { useState } from 'react'
import { ButtonTabs } from '../common/Tabs'
import { useHistory } from 'react-router'
import { placeOrder } from '../../redux/merchantList/action'
import { useDispatch } from 'react-redux'
import { Formik, Field } from 'formik'
// import { Input } from '../common/Form'
// @ts-ignore
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs'
// @ts-ignore
import images from 'react-payment-inputs/images'
const tabOptions = [
  { id: 1, tabName: 'Cancel' },
  { id: 2, tabName: 'Pay' },
]
const ReviewOrder = (props: any) => {
  const cardDetails = JSON.parse(localStorage.getItem('cardDetails') || '[]')
  console.log(cardDetails)

  const dispatch = useDispatch()
  const history = useHistory()
  const tip = props.location.state ? props.location.state[1] : []
  const [openTab, setOpenTab] = useState()
  if (openTab === 1) {
    history.push('/cart')
  }
  if (openTab === 2) {
    if (props.location.state) {
      dispatch(placeOrder(props.location.state[0] || [], history, tip))
    }
  }
  const {
    // meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs()
  return (
    <div className="bg-offWhite p-5 min-h-screen">
      <div className="mx-auto max-w-xl">
        <div
          className="relative text-center mb-12"
          onClick={() => history.goBack()}
        >
          <LeftArrow className="h-5 w-5 absolute" />
          <h2 className="text-sm font-bold">Review Order</h2>
        </div>
        <div className="bg-white py-8 mb-5 order-review">
          <RestaurantInfo />
          <div className="border border-dashed order-total flex px-6 py-5 justify-between items-center">
            <h4 className="text-sm font-bold">Order Total</h4>
            <p className="text-base">
              $
              {props.location.state
                ? props.location.state[0].total.toFixed(2)
                : 0}
            </p>
          </div>
          <div className="px-6 py-7">
            <h4 className="text-sm font-bold">Payment Method</h4>
            <div className="flex items-center justify-between">
              {/* <svg {...(cardDetails ? cardDetails.image : '')} /> */}
              <Formik
                onSubmit={(data) => console.log(data)}
                initialValues={{
                  cardNumber: '',
                }}
              >
                {({ handleSubmit, setFieldValue, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white px-3 py-16 rounded-30 mb-5 relative">
                      <PaymentInputsWrapper {...wrapperProps}>
                        <svg {...getCardImageProps({ images })} />
                        {console.log(getCardImageProps({ images }))}
                        <div>
                          <Field name="cardNumber">
                            {(field: any) => (
                              <input
                                {...getCardNumberProps({
                                  onBlur: field.onBlur,
                                  onChange: (event: any) => {
                                    setFieldValue(
                                      'cardNumber',
                                      event.target.value,
                                    )
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
                                    setFieldValue(
                                      'expiryDate',
                                      event.target.value,
                                    )
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
              {/* <svg
                className={cardDetails.viewBox}
                fill="none"
                viewBox={cardDetails.viewBox}
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
              >
                <path
                // strokeLinecap="round"
                // strokeLinejoin="round"
                // strokeWidth="2"
                // d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg> */}
              <p className="text-base font-bold">**** **** **** 2635</p>
              <button
                className="bg-blue text-white change-card-btn text-sm px-4 py-1"
                onClick={() => history.push('/payment-card')}
              >
                CHANGE
              </button>
            </div>
          </div>
        </div>
        <ButtonTabs
          tabs={tabOptions}
          openTab={openTab || 1}
          setOpenTab={setOpenTab}
        />
      </div>
    </div>
  )
}

export default ReviewOrder
