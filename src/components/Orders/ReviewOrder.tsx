import { LeftArrow } from '../common/icons'
import { RestaurantInfo } from '.'
import { useState } from 'react'
import { ButtonTabs } from '../common/Tabs'
import { useHistory } from 'react-router'
import { placeOrder } from '../../redux/merchantList/action'
import { useDispatch } from 'react-redux'
import { Formik, Field } from 'formik'
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
  let cardNumber: any = ''
  cardNumber = cardDetails.cardNumber || '1234 1234 1234 1234'
  const checkArray = cardNumber.split(' ')
  console.log('length=>', checkArray.length)
  cardNumber =
    checkArray[checkArray.length - checkArray.length] +
    '  **** ' +
    ' **** ' +
    ' ' +
    (checkArray[checkArray.length - 1] ? checkArray[checkArray.length - 1] : '')
  const dispatch = useDispatch()
  const history = useHistory()
  const tip = props.location.state ? props.location.state[1] : []
  const [openTab, setOpenTab] = useState()
  if (openTab === 1) {
    history.push('/cart')
  }
  if (openTab === 2) {
    if (props.location.state && props.location.state[0].total > 1) {
      dispatch(placeOrder(props.location.state[0] || [], history, tip))
    }
  }
  const {
    getCardImageProps,
    getCardNumberProps,
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
                ? parseFloat(props.location.state[0].total).toFixed(2)
                : 0}
            </p>
          </div>
          <div className="px-6 py-7">
            <h4 className="text-sm font-bold">Payment Method</h4>
            <div className="flex items-center justify-between mt-2 relative">
              <Formik
                onSubmit={(data) => console.log(data)}
                initialValues={{
                  cardNumber: '',
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <PaymentInputsWrapper
                      {...wrapperProps}
                      styles={{
                        inputWrapper: {
                          base: `
                            border-color: white;
                          `,
                        },
                        input: {
                          cardNumber: 'width: 13rem;',
                        },
                      }}
                    >
                      <svg {...getCardImageProps({ images })} />
                      <div>
                        <Field name="cardNumber">
                          {(field: any) => (
                            <input
                              className="text-base font-bold mt-1"
                              {...getCardNumberProps({
                                // onBlur: field.onBlur,
                                value: cardNumber,
                              })}
                              disabled
                            />
                          )}
                        </Field>
                      </div>
                    </PaymentInputsWrapper>
                  </form>
                )}
              </Formik>
              <button
                className="bg-blue text-white change-card-btn text-sm px-4 py-1"
                onClick={() =>
                  history.push('/payment-card', props.location.state)
                }
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
