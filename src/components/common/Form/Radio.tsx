import { useField } from 'formik'
import { forwardRef, ChangeEvent } from 'react'

type RadioProps = {
  label?: string
  name: string
  value: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
// eslint-disable-next-line react/display-name
const Radio = forwardRef(({ label, name, ...props }: RadioProps) => {
  const [RadioProps] = useField(name)
  return (
    <label className="flex justify-start items-center py-2">
      {/* <div className="checkbox-container bg-white border rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue"> */}
      <input
        type="radio"
        {...RadioProps}
        {...props}
        className="mr-3"
        onChange={props.onChange}
      />
      {/* </div> */}
      <div className="select-none">{label}</div>
    </label>
  )
})

export default Radio
