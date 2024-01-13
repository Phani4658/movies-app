import './index.css'
import {MdPlaylistPlay} from 'react-icons/md'
import {HiOutlineSearch} from 'react-icons/hi'
import {NavLink, Link} from 'react-router-dom'

const Navbar = props => {
  const {isHome} = props
  return (
    <nav>
      <div className="left-part">
        <img
          src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1686423528/Movies-A-Netflix-clone/MoviesLogo_ayvbyq.svg"
          alt="website-logo"
        />
        <ul className="laptop-view left-nav-links">
          <NavLink to="/" className={`link ${isHome ? 'bold' : null}`}>
            <li className="nav-link">Home</li>
          </NavLink>
          <NavLink
            activeClassName="bold"
            to="/popular"
            className={`link ${!isHome ? 'bold' : null}`}
          >
            <li className="nav-link">Popular</li>
          </NavLink>
        </ul>
      </div>
      <div className="right-part">
        <Link to="/search">
          <HiOutlineSearch testid="searchButton" className="nav-icons" />
        </Link>
        <MdPlaylistPlay className="nav-icons mobile-view" />
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1686463221/Movies-A-Netflix-clone/Avatar_wyipa4.svg"
            alt="profile"
            className="laptop-view"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
