type ButtonTabProps = {
  tabs: Array<string>
  openTab: Number
  setOpenTab: Function
}
const ButtonTabs = ({ tabs, openTab, setOpenTab }: ButtonTabProps) => {
  return (
    <div className="flex rounded-2xl mb-8 tabs">
      {tabs.map((tab, index) => (
        <a
          key={index}
          className={`rounded-2xl transition duration-200 ease-linear cursor-pointer select-none hover:text-white hover:bg-blue font-semibold flex-1 
       flex items-center justify-center py-5 ${
         openTab === index
           ? 'bg-blue font-bold text-white'
           : 'text-darkgray border-transparent'
       }`}
          onClick={(e) => {
            e.preventDefault()
            setOpenTab(index)
          }}
          data-toggle="tab"
          role="tab"
        >
          {tab}
        </a>
      ))}
    </div>
  )
}

export default ButtonTabs
