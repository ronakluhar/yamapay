import Select, { NamedProps, Props } from 'react-select'

interface YPSelectProps extends NamedProps, Props {
  name: string
}

const YPSelect = ({ options, ...props }: YPSelectProps) => {
  return <Select options={options} {...props} />
}

export default YPSelect
