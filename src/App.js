import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import PopularMovies from './components/PopularMovies'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import Search from './components/Search'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/popular" component={PopularMovies} />
    <Route exact path="/movies/:id" component={MovieDetails} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
