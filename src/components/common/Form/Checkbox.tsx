import { Field, useField } from 'formik'
import { forwardRef } from 'react'

type CheckboxProps = {
  label?: string
  name: string
}
// eslint-disable-next-line react/display-name
const Checkbox = forwardRef(({ label, name }: CheckboxProps) => {
  const [checkboxProps, { value }] = useField(name)
  return (
    <label className="flex justify-start items-center py-2">
      <div className="checkbox-container bg-white border rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue">
        <Field
          type="checkbox"
          className="opacity-0 absolute"
          checked={value}
          {...checkboxProps}
        />
        <svg
          className="fill-current hidden w-2 h-2 text-blue pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div className="select-none">{label}</div>
    </label>
  )
})

export default Checkbox
