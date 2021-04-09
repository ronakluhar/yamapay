import { NavLink as Link } from 'react-router-dom'
import logo from '../../images/logo.png'

const Navigation = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="YamaPay Logo" />
        </Link>
        <div className="search-restaurants">
          <input type="search" placeholder="Search Restaurants" />
        </div>
      </div>
    </header>
  )
}

export default Navigation
