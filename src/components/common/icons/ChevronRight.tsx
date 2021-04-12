import { IconProps } from '.'

const ChevronRight = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

export default ChevronRight
