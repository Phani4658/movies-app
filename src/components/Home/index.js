import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import TrendingMoviesList from '../TrendingMoviesList'

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

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalMovies: [],
    apiStatus: apiStatusConstants.inprogress,
  }

  componentDidMount = () => {
    this.fetchOriginalMovies()
  }

  fetchOriginalMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
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
        const originalMovies = results.map(movieDetails => ({
          id: movieDetails.id,
          backdropPath: movieDetails.backdrop_path,
          overview: movieDetails.overview,
          posterPath: movieDetails.poster_path,
          title: movieDetails.title,
        }))
        this.setState({
          apiStatus: apiStatusConstants.success,
          originalMovies,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = moviesList => (
    <Slider {...settings}>
      {moviesList.map(movieDetails => (
        <div className="slick-item" key={movieDetails.id}>
          <Link to={`/movies/${movieDetails.id}`}>
            <img
              src={movieDetails.posterPath}
              alt={movieDetails.title}
              className="backdrop-image"
            />
          </Link>
        </div>
      ))}
    </Slider>
  )

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = tryAgain => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1705222132/alert-triangle_tgw8xk.svg"
        className="failure-icon"
        alt="failure view"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )

  renderFinalView = () => {
    const {apiStatus, originalMovies} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(originalMovies)
      case apiStatusConstants.failure:
        return this.renderFailureView(this.fetchOriginalMovies)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderHeaderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHeaderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderHeaderSuccessView = () => {
    const {originalMovies} = this.state
    const randomMovie =
      originalMovies[Math.floor(Math.random() * originalMovies.length)]

    const {posterPath, title, overview} = randomMovie
    return (
      <>
        <img src={posterPath} alt={title} />
        <div className="banner-details">
          <h2 className="home-header-title">{title}</h2>
          <p className="home-header-para">{overview}</p>
          <button type="button" className="try-again-button">
            Play
          </button>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <header className="home-header">
          <Navbar isHome />
          {this.renderHeaderFinalView()}
        </header>
        <section className="movies-section">
          <TrendingMoviesList
            renderSuccessView={this.renderSuccessView}
            renderFailureView={this.renderFailureView}
            renderLoadingView={this.renderLoadingView}
          />
          <section>
            <h2 className="trending-now-heading">Originals</h2>
            {this.renderFinalView()}
          </section>
        </section>
        <Footer />
      </>
    )
  }
}

export default Home
