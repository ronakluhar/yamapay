import { Form, Formik } from 'formik'
import { Input } from '../common/Form'

const PersonalDetails = () => {
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
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default PersonalDetails
