import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Input } from '../common/Form'

type TipsProps = {
  tip: object
  tipOptions: any
  setTip: Function
  customtip: Number
  setCustomtip: Function
  setSubtotal: Function
}

const Tips = ({
  tip,
  tipOptions,
  setTip,
  customtip,
  setCustomtip,
  setSubtotal,
}: TipsProps) => {
  let tipSet: any = []
  tipSet = JSON.parse(localStorage.getItem('tip') || '[]')
  const selectedTip: any = tip
  const [activeTab, setActiveTab] = useState(selectedTip.tip_index)
  useEffect(() => {
    setActiveTab(selectedTip.tip_index)
  }, [selectedTip.tip_index])
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
                  localStorage.setItem(
                    'tip',
                    JSON.stringify({
                      tip_index: index,
                      tip_percentage: tipOption.percentage,
                      tip_value: tipOption.value,
                    }),
                  )
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
        <Formik initialValues={{}} onSubmit={(values) => {}}>
          {({ values, setFieldValue }) => (
            <Form>
              <Input
                label="Custom Tip"
                type="text"
                name="custom_tip"
                value={
                  tipSet.tip_percentage === '' ? tipSet.tip_value : customtip
                }
                onChange={(event) => {
                  const re = /^[0-9]+(\.\d{0,2})?$/
                  setCustomtip(event.target.value)
                  setFieldValue('custom_tip', event.target.value)
                  if (event.target.value && re.test(event.target.value)) {
                    setActiveTab(-1)
                    setTip(() => ({
                      tip_value: event.target.value,
                      tip_percentage: '',
                    }))
                    localStorage.setItem(
                      'tip',
                      JSON.stringify({
                        tip_index: -1,
                        tip_value: event.target.value,
                        tip_percentage: '',
                      }),
                    )
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
                    localStorage.setItem(
                      'tip',
                      JSON.stringify({
                        tip_index: -1,
                        tip_value: 0,
                        tip_percentage: '',
                      }),
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
