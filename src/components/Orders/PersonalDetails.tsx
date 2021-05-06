import { Form, Formik } from 'formik'
// import { ThemeConfig } from 'react-select/src/theme'
import { Input, YPSelect } from '../common/Form'
import * as Yup from 'yup'
type Props = {
  setPersonalInfo: Function
}

// const validate = (values: any) => {
//   const errors = {}
//   if (!values.firstName) {
//     errors.firstName = 'Required'
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required'
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }

//   return errors
// }

const PersonalDetails = ({ setPersonalInfo }: Props) => {
  const PersonalDetailsSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required Field'),
    phone: Yup.number().required('Phone is Required Field'),
    comment: Yup.string().required('Comment is Required Field'),
  })
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: 'transparent',
      },
    }
  }
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      borderRadius: 10,
      backgroundColor: '#f4f4f8',
      padding: '0.75rem',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
    }),
    '::after': {
      borderColor: 'transparent',
    },
  }
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold mb-2.5">Personal Details</h3>
      <div className="bg-white px-5 py-10 rounded-30">
        <Formik
          initialValues={{
            name: '',
            phone: '',
            comment: '',
            selected_table: '',
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values))
          }}
          validationSchema={PersonalDetailsSchema}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="my-3">
                <Input
                  type="text"
                  name="name"
                  // id="name"
                  placeholder="Name*"
                  onChange={(event) => {
                    setFieldValue('name', event.target.value)
                    setPersonalInfo({ ...values })
                  }}
                />
                {errors.name && touched.name ? (
                  <span className="text-red">{errors.name}</span>
                ) : null}
              </div>

              <div className="my-3">
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number*"
                  onChange={(event) => {
                    const re = /^[0-9\b]+$/
                    if (
                      event.target.value !== '' &&
                      re.test(event.target.value)
                    ) {
                      setFieldValue('phone', event.target.value)
                      setPersonalInfo({ ...values })
                    } else {
                      setFieldValue('phone', '')
                      setPersonalInfo({ ...values })
                    }
                  }}
                />
                {errors.phone && touched.phone ? (
                  <span className="text-red">{errors.phone}</span>
                ) : null}
              </div>
              <div className="my-3">
                <Input
                  type="text"
                  name="comment"
                  placeholder="Comment*"
                  onChange={(event) => {
                    setFieldValue('comment', event.target.value)
                    setPersonalInfo({ ...values })
                  }}
                />
                {errors.comment && touched.comment ? (
                  <span className="text-red">{errors.comment}</span>
                ) : null}
              </div>
              <div>
                <YPSelect
                  name="selected_table"
                  options={[
                    { value: 'Yama', label: 'Yama' },
                    { value: 'Pay', label: 'Pay' },
                  ]}
                  styles={customStyles}
                  theme={customTheme}
                  onChange={(option) => {
                    setFieldValue('selected_table', option?.value)
                    setPersonalInfo({
                      ...values,
                      selected_table: option?.value,
                    })
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PersonalDetails
