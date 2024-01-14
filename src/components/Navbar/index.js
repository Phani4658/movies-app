import './index.css'
import {useState} from 'react'
import {MdPlaylistPlay} from 'react-icons/md'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoCloseCircle} from 'react-icons/io5'
import {Link} from 'react-router-dom'

const Navbar = props => {
  const {
    isHome,
    isPopular,
    isAccount,
    isSearchPage,
    updateSearchValue,
    getSearchResults,
  } = props
  const [showMobileNav, updateShowMobileNav] = useState(false)

  const onChangeSearchValue = event => {
    updateSearchValue(event.target.value)
  }
  return (
    <nav>
      <div className="top-part">
        <div className="left-part">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1686423528/Movies-A-Netflix-clone/MoviesLogo_ayvbyq.svg"
              alt="website-logo"
            />
          </Link>
          <ul className="laptop-view left-nav-links">
            <li className="nav-link">
              <Link to="/" className={`link ${isHome ? 'bold' : null}`}>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/popular"
                className={`link ${isPopular ? 'bold' : null}`}
              >
                <span>Popular</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-part">
          {!isSearchPage && (
            <Link to="/search">
              <HiOutlineSearch testid="searchButton" className="nav-icons" />
            </Link>
          )}
          {isSearchPage && (
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                onChange={onChangeSearchValue}
              />
              <HiOutlineSearch
                className="search-page-icon"
                testid="searchButton"
                onClick={getSearchResults}
              />
            </div>
          )}
          <MdPlaylistPlay
            className="nav-icons mobile-view"
            onClick={() => updateShowMobileNav(true)}
          />
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1686463221/Movies-A-Netflix-clone/Avatar_wyipa4.svg"
              alt="profile"
              className="laptop-view"
            />
          </Link>
        </div>
      </div>
      {showMobileNav && (
        <ul className="bottom-part mobile-view">
          <li className="nav-link">
            <Link to="/" className={`link ${isHome ? 'bold' : null}`}>
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/popular" className={`link ${isPopular ? 'bold' : null}`}>
              <span>Popular</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/account" className={`link ${isAccount ? 'bold' : null}`}>
              <span>Account</span>
            </Link>
          </li>
          <IoCloseCircle
            className="close-icon"
            onClick={() => updateShowMobileNav(false)}
          />
        </ul>
      )}
    </nav>
  )
}

export default Navbar
