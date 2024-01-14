import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
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
    this.setState({apiStatus: apiStatusConstants.failure})
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

  renderSuccessView = () => {
    const {trendingMovies} = this.state

    return (
      <Slider {...settings}>
        {trendingMovies.map(movieDetails => (
          <div className="slick-item">
            <Link to={`/movies/${movieDetails.id}`}>
              <img
                src={movieDetails.backdropPath}
                alt="movie-poster"
                className="backdrop-image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    return (
      <section>
        <h2 className="trending-now-heading">Trending Now</h2>
        {this.renderSuccessView()}
      </section>
    )
  }
}

export default TrendingMoviesList
