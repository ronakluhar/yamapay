import * as Yup from 'yup'

export const paymentCardSchema = Yup.object({
  name_on_card: Yup.string().required('Name is a required field'),
  card_number: Yup.string().required('Card Number is a required field'),
  expiry: Yup.date().required('Expiry date is a required field'),
  cvv: Yup.number()
    .max(999, 'CVV must be 3 digits')
    .required('CVV is a required field'),
})
