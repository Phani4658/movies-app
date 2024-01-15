import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'
import UserContext from '../../context/UserContext'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <UserContext.Consumer>
      {value => {
        const {username, password} = value
        const maskedPassword = '*'.repeat(password.length)
        return (
          <>
            <Navbar />
            <div className="account-details-container">
              <h1 className="account-heading">Account</h1>
              <hr />
              <div className="membership-details">
                <p className="account-detail-heading">Member ship</p>
                <div className="user-details">
                  <p className="account-para">{username}</p>
                  <p className="account-password">Password: {maskedPassword}</p>
                </div>
              </div>
              <hr />
              <div className="membership-details">
                <p className="account-detail-heading">Plan Details </p>
                <div className="plan-details">
                  <p className="account-para">Premium</p>
                  <p className="plan-name">Ultra HD</p>
                </div>
              </div>
              <hr />
              <div className="logout-container">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <Footer />
          </>
        )
      }}
    </UserContext.Consumer>
  )
}
export default withRouter(Account)
