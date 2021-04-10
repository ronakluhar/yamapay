import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { Input } from '../common/Form'
// import { Input } from '../common/Form'

const tips = [
  {
    percentage: '10%',
    value: 12.25,
  },
  {
    percentage: '20%',
    value: 24.5,
  },
  {
    percentage: '25%',
    value: 35.0,
  },
  {
    percentage: '30%',
    value: 45.35,
  },
  {
    percentage: '35%',
    value: 50.68,
  },
]
const Tips = () => {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold mb-2.5">Tips</h3>
      <div className="bg-white px-6 py-7 tips">
        <div className="flex items-center justify-between mb-4">
          {tips.map((tip, index) => (
            <div key={index}>
              <Link
                to="#"
                className="focus:bg-blue border border-blue text-blue focus:text-white px-3.5 
                py-2.5 tip flex-1 focus:outline-none flex flex-col items-center justify-center"
              >
                <p className="font-bold text-xs">{tip.percentage}</p>
                <p className="font-bold text-xs">{tip.value}</p>
              </Link>
            </div>
          ))}
        </div>
        <Formik initialValues={{}} onSubmit={(values) => {}}>
          {() => <Input label="Custom Tip" type="text" name="tip" />}
        </Formik>
      </div>
    </div>
  )
}

export default Tips
