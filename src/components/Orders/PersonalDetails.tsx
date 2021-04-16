import { Form, Formik } from 'formik'
import { Input, YPSelect } from '../common/Form'

const PersonalDetails = () => {
  const customTheme = (theme: { colors: any }) => {
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
        <Formik initialValues={{}} onSubmit={(values) => {}}>
          <Form>
            <div className="my-3">
              <Input type="text" name="name" placeholder="Name*" />
            </div>
            <div className="my-3">
              <Input type="text" name="phone" placeholder="Phone Number*" />
            </div>
            <div className="my-3">
              <Input type="text" name="comment" placeholder="Comment*" />
            </div>
            <div>
              <YPSelect
                options={[
                  { value: 'Yama', label: 'Yama' },
                  { value: 'Pay', label: 'Pay' },
                ]}
                styles={customStyles}
                theme={customTheme}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default PersonalDetails
