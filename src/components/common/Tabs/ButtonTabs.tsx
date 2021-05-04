type ButtonTabProps = {
  tabs: {
    id: number
    tabName: string
  }[]
  openTab: Number
  setOpenTab: Function
  setLocalStorage?: Function
}
const ButtonTabs = ({
  tabs,
  openTab,
  setOpenTab,
  setLocalStorage,
}: ButtonTabProps) => {
  return (
    <div className="flex rounded-2xl mb-8 tabs">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`rounded-2xl transition duration-200 ease-linear cursor-pointer select-none hover:text-white hover:bg-blue font-semibold flex-1 
       flex items-center justify-center py-5 ${
         openTab === tab.id
           ? 'bg-blue font-bold text-white'
           : 'text-darkgray border-transparent'
       }`}
          onClick={(e) => {
            e.preventDefault()
            setOpenTab(tab.id)
            setLocalStorage && setLocalStorage()
          }}
          data-toggle="tab"
          role="tab"
        >
          {tab.tabName}
        </a>
      ))}
    </div>
  )
}

export default ButtonTabs
