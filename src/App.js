import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import PopularMovies from './components/PopularMovies'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import Search from './components/Search'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import UserContext from './context/UserContext'

class App extends Component {
  state = {username: '', password: '', num: 0}

  updateId = () => {
    this.setState(previousState => ({num: previousState.num + 1}))
  }

  updateUsername = username => {
    this.setState({username})
  }

  updatePassword = password => {
    this.setState({password})
  }

  render() {
    const {username, password, num} = this.state
    return (
      <UserContext.Provider
        value={{
          username,
          password,
          updateUsername: this.updateUsername,
          updatePassword: this.updatePassword,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={PopularMovies} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute
            path="/movies/:id"
            component={MovieDetails}
            key={num}
            onClick={this.updateId}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App
