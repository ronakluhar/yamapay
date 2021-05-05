import { Form, Formik } from 'formik'
// import { parse } from 'postcss'
import { useState } from 'react'
import { Input } from '../common/Form'

type TipsProps = {
  tip: object
  setTip: Function
  customtip: Number
  setCustomtip: Function
  setSubtotal: Function
}
const tipOptions = [
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
const Tips = ({
  tip,
  setTip,
  customtip,
  setCustomtip,
  setSubtotal,
}: TipsProps) => {
  const [activeTab, setActiveTab] = useState(-1)
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold mb-2.5">Tips</h3>
      <div className="bg-white px-6 py-7 tips">
        <div className="flex flex-wrap items-center justify-between mb-2 tip-box">
          {tipOptions.map((tipOption, index) => (
            <div key={index}>
              <a
                className={`border border-blue px-3.5 
                py-2.5 mb-2 tip flex-1 focus:outline-none flex flex-col items-center justify-center 
                cursor-pointer ${
                  activeTab === index ? 'bg-blue text-white' : 'text-blue'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(index)
                  setTip({
                    tip_percentage: tipOption.percentage,
                    tip_value: tipOption.value,
                  })
                  setSubtotal(
                    (prev: any) =>
                      parseInt(localStorage.getItem('subTotal') || '0') +
                      tipOption.value,
                  )
                  setCustomtip('')
                }}
              >
                <p className="font-bold text-xs">{tipOption.percentage}</p>
                <p className="font-bold text-xs">{tipOption.value}</p>
              </a>
            </div>
          ))}
        </div>
        <Formik
          initialValues={{
            custom_tip: '',
          }}
          onSubmit={(values) => {}}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Input
                label="Custom Tip"
                type="text"
                name="custom_tip"
                onChange={(event) => {
                  setFieldValue('custom_tip', event.target.value)
                  setCustomtip(event.target.value)
                  if (event.target.value) {
                    setActiveTab(-1)
                    setTip(() => ({
                      tip_value: event.target.value,
                      tip_percentage: '',
                    }))
                  }
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Tips
