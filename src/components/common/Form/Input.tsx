import { useField } from 'formik'
import { ChangeEvent, forwardRef } from 'react'

type InputProps = {
  label?: string
  name: string
  required?: boolean
  type: string
  placeholder?: string
  min?: string
  error?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
// eslint-disable-next-line react/display-name
const Input = forwardRef(({ label, name, ...props }: InputProps, ref) => {
  // eslint-disable-next-line no-unused-vars
  const [inputProps, { error }, { setValue }] = useField(name)
  return (
    <div className="custom-input">
      <div>
        <label htmlFor="">
          {/* eslint-disable-next-line react/prop-types */}
          {props.required ? `${label} (Required)` : label}
        </label>
      </div>
      <div>
        <input
          className="custom-box-input"
          {...inputProps}
          {...props}
          onChange={props.onChange}
        />
      </div>
      <div>
        <span className="text-red text-xs">{props.error}</span>
      </div>
    </div>
  )
})

export default Input
