import { Form, Formik } from 'formik'
// import { ThemeConfig } from 'react-select/src/theme'
import { Input, YPSelect } from '../common/Form'

type Props = {
  setPersonalInfo: Function
}

const PersonalDetails = ({ setPersonalInfo }: Props) => {
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
          onSubmit={(values) => {}}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="my-3">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  onChange={(event) => {
                    setFieldValue('name', event.target.value)
                    setPersonalInfo({ ...values })
                  }}
                />
              </div>
              <div className="my-3">
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number*"
                  onChange={(event) => {
                    setFieldValue('phone', event.target.value)
                    setPersonalInfo({ ...values })
                  }}
                />
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
