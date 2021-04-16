import Select, { OptionTypeBase } from 'react-select'

const YPSelect = ({ options, ...props }: OptionTypeBase) => {
  return <Select options={options} {...props} />
}

export default YPSelect
