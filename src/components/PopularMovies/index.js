import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import './index.css'
import Footer from '../Footer'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.failure,
    popularMovies: [],
  }

  componentDidMount = () => {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const {results} = data
        const popularMovies = results.map(movieDetails => ({
          id: movieDetails.id,
          backdropPath: movieDetails.backdrop_path,
          overview: movieDetails.overview,
          posterPath: movieDetails.poster_path,
          title: movieDetails.title,
        }))
        this.setState({apiStatus: apiStatusConstants.success, popularMovies})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <>
        <ul className="popular-movies-container">
          {popularMovies.map(movieDetails => (
            <li key={movieDetails.id} className="movie-card">
              <Link to={`/movies/${movieDetails.id}`}>
                <img src={movieDetails.posterPath} alt={movieDetails.title} />
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return (
          <FailureView isPopularPage getPopularMovies={this.getPopularMovies} />
        )
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div>
        <Navbar isPopular />
        {this.renderFinalView()}
        <Footer />
      </div>
    )
  }
}

export default PopularMovies
