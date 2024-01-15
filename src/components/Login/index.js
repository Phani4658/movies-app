import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import UserContext from '../../context/UserContext'

class Login extends Component {
  state = {
    errorMessage: '',
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulLogin = (jwtToken, updateUsername, updatePassword) => {
    const {username, password} = this.state
    updateUsername(username)
    updatePassword(password)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    // Cookies.set('username', username, {expires: 30})
    // Cookies.set('password', password, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMessage => {
    this.setState({errorMessage})
  }

  loginUser = async (event, updateUsername, updatePassword) => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token, updateUsername, updatePassword)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <UserContext.Consumer>
        {value => {
          const {updateUsername, updatePassword} = value
          return (
            <div className="login-page">
              <img
                src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1686423528/Movies-A-Netflix-clone/MoviesLogo_ayvbyq.svg"
                alt="login website logo"
                className="login-logo"
              />
              <div className="login-card">
                <h2 className="login-heading">Login</h2>
                <form
                  onSubmit={event => {
                    this.loginUser(event, updateUsername, updatePassword)
                  }}
                >
                  <div className="input-container">
                    <label htmlFor="username" className="login-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      onChange={this.onChangeUsername}
                      value={username}
                      className="login-input"
                    />
                  </div>
                  <div className="input-container no-margin-bottom">
                    <label htmlFor="password" className="login-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={this.onChangePassword}
                      className="login-input"
                    />
                  </div>
                  {errorMessage.length > 0 && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                  <button className="login-button" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default Login
