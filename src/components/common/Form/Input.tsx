import { useField } from 'formik'
import { forwardRef } from 'react'

type InputProps = {
  label?: string
  name: string
  required?: boolean
  type: string
  placeholder?: string
  min?: string
  error?: string
}
// eslint-disable-next-line react/display-name
const Input = forwardRef(({ label, name, ...props }: InputProps, ref) => {
  const [inputProps] = useField(name)
  return (
    <div className="custom-input">
      <div>
        <label htmlFor="">
          {/* eslint-disable-next-line react/prop-types */}
          {props.required ? `${label} (Required)` : label}
        </label>
      </div>
      <div>
        <input className="custom-box-input" {...inputProps} {...props} />
      </div>
      <div>
        <span className="text-red text-xs">{props.error}</span>
      </div>
    </div>
  )
})

export default Input
