import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.success,
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
        this.setState({apiStatus: apiStatusConstants.inProgress})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMovies, isMobile} = this.state
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
        <Footer />
      </>
    )
  }

  render() {
    return (
      <div>
        <Navbar isPopular />
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default PopularMovies
