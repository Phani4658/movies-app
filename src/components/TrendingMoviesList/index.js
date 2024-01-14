import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingMoviesList extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    trendingMovies: [],
  }

  componentDidMount = () => {
    this.fetchTrendingMovies()
  }

  fetchTrendingMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const {results} = data
        const trendingMovies = results.map(movieDetails => ({
          id: movieDetails.id,
          backdropPath: movieDetails.backdrop_path,
          overview: movieDetails.overview,
          posterPath: movieDetails.poster_path,
          title: movieDetails.title,
        }))
        this.setState({apiStatus: apiStatusConstants.success, trendingMovies})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFinalView = () => {
    const {apiStatus, trendingMovies} = this.state
    const {renderSuccessView, renderFailureView, renderLoadingView} = this.props

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView(trendingMovies)
      case apiStatusConstants.failure:
        return renderFailureView(this.fetchTrendingMovies)
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <section>
        <h2 className="trending-now-heading">Trending Now</h2>
        {this.renderFinalView()}
      </section>
    )
  }
}

export default TrendingMoviesList
