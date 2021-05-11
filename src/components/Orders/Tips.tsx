import { Form, Formik } from 'formik'
// import { parse } from 'postcss'
import { useState } from 'react'
import { Input } from '../common/Form'

type TipsProps = {
  tip: object
  tipOptions: any
  setTip: Function
  customtip: Number
  setCustomtip: Function
  setSubtotal: Function
}

// const tipOptions = [
//   {
//     percentage: '10%',
//     value: (subTotal * 10) / 100,
//   },
//   {
//     percentage: '20%',
//     value: (subTotal * 20) / 100,
//   },
//   {
//     percentage: '25%',
//     value: (subTotal * 25) / 100,
//   },
//   {
//     percentage: '30%',
//     value: (subTotal * 30) / 100,
//   },
//   {
//     percentage: '35%',
//     value: (subTotal * 35) / 100,
//   },
// ]
const Tips = ({
  tip,
  tipOptions,
  setTip,
  customtip,
  setCustomtip,
  setSubtotal,
}: TipsProps) => {
  const [activeTab, setActiveTab] = useState(-1)
  let cartDetails: any = []
  cartDetails = JSON.parse(localStorage.getItem('Cart') || '[]')
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold mb-2.5">Tips</h3>
      <div className="bg-white px-6 py-7 tips">
        <div className="flex flex-wrap items-center justify-between mb-2 tip-box">
          {tipOptions.map((tipOption: any, index: any) => (
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
                      parseFloat(localStorage.getItem('subTotal') || '0') +
                      parseFloat(tipOption.value),
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
                value={cartDetails.tip}
                onChange={(event) => {
                  const re = /^[0-9\b]+$/
                  setFieldValue('custom_tip', event.target.value)
                  setCustomtip(event.target.value)
                  if (event.target.value && re.test(event.target.value)) {
                    setActiveTab(-1)
                    setTip(() => ({
                      tip_value: event.target.value,
                      tip_percentage: '',
                    }))
                    setSubtotal(
                      (prev: any) =>
                        parseFloat(localStorage.getItem('subTotal') || '0') +
                        parseFloat(event.target.value),
                    )
                  } else if (!re.test(event.target.value)) {
                    setFieldValue('custom_tip', '')
                    setSubtotal((prev: any) =>
                      parseFloat(localStorage.getItem('subTotal') || '0'),
                    )
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
