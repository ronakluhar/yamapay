import { NavLink as Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { Search } from '../common/icons'

const Navigation = () => {
  return (
    <header className="navbar">
      <div className="navbar-container flex bg-white">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="YamaPay Logo" />
        </Link>
        <div className="search-restaurants relative">
          <input
            className="p-4 pr-10 my-3 ml-3 border-none rounded-lg outline-none"
            type="search"
            placeholder="Search Restaurants"
          />
          <Search className="h-5 w-5 search-icon absolute right-3 top-7" />
        </div>
      </div>
    </header>
  )
}

export default Navigation
