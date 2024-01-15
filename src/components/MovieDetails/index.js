import {Component} from 'react'
import Cookies from 'js-cookie'
import {parse, minutesToHours, format} from 'date-fns'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import './index.css'
import MovieCard from '../MovieCard'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    similarMovies: [],
    movieDetails: {},
  }

  componentDidMount = () => {
    this.getMovieDetails()
  }

  getFormattedData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    genres: data.genres,
    title: data.title,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    spokenLanguages: data.spoken_languages.map(language => ({
      id: language.id,
      name: language.english_name,
    })),
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const fetchedData = data.movie_details
        const movieDetails = this.getFormattedData(fetchedData)
        const similarMovies = fetchedData.similar_movies.map(movie => ({
          id: movie.id,
          backdropPath: movie.backdrop_path,
          overview: movie.overview,
          posterPath: movie.poster_path,
          title: movie.title,
        }))
        this.setState({
          movieDetails,
          similarMovies,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movieDetails, similarMovies} = this.state
    const {
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
    } = movieDetails
    return (
      <div className="extra-info">
        <div className="movie-extra-info-container">
          <div className="genre-details">
            <h1 className="list-heading">Genres</h1>
            <ul>
              {genres.map(genre => (
                <li className="list-items" key={genre.id}>
                  <p>{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="genre-details">
            <h1 className="list-heading">Audio Available</h1>
            <ul>
              {spokenLanguages.map(language => (
                <li className="list-items" key={language.id}>
                  <p>{language.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-details">
            <div>
              <h1 className="list-heading">Rating Count</h1>
              <p className="list-item">{voteCount}</p>
            </div>
            <div>
              <h1 className="list-heading">Rating Average</h1>
              <p className="list-item">{voteAverage}</p>
            </div>
          </div>

          <div className="genre-details">
            <div>
              <h1 className="list-heading">Budget</h1>
              <p className="list-item">{budget}</p>
            </div>
            <div>
              <h1 className="list-heading">Release Date</h1>
              <p className="list-item">{this.formattedFullDate(releaseDate)}</p>
            </div>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1>More Like this</h1>
          <ul className="popular-movies-container">
            {similarMovies.map(details => (
              <MovieCard details={details} key={details.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return (
          <FailureView
            isMovieDetailsPage
            getMovieDetails={this.getMovieDetails}
          />
        )
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  formateRuntime = runtime => {
    const formattedTime = minutesToHours(runtime)
    const remainingMinutes = runtime - formattedTime * 60
    const finalRuntime = `${formattedTime}h ${remainingMinutes}m`
    return finalRuntime
  }

  formattedReleaseDate = releaseDate => {
    const dateObject = parse(releaseDate, 'yyyy-M-d', new Date())
    return dateObject.getFullYear()
  }

  formattedFullDate = releaseDate => {
    const dateObject = parse(releaseDate, 'yyyy-M-d', new Date())

    const formattedDate = format(dateObject, 'd MMMM yyyy')
    return formattedDate
  }

  renderHeaderView = () => {
    const {movieDetails} = this.state
    const {
      backdropPath,
      title,
      overview,
      releaseDate,
      runtime,
      adult,
    } = movieDetails
    return (
      <>
        <>
          <img src={backdropPath} alt={title} />
          <div className="banner-details">
            <h2 className="home-header-title movie-details-title">{title}</h2>
            <div className="extra-banner-details">
              <p>{this.formateRuntime(runtime)}</p>
              <p className="censor-cut">{adult ? 'A' : 'U/A'}</p>
              <p>{this.formattedReleaseDate(releaseDate)}</p>
            </div>
            <p className="home-header-para">{overview}</p>
            <button type="button" className="try-again-button">
              Play
            </button>
          </div>
        </>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <header
          className={
            apiStatus === apiStatusConstants.success
              ? 'movie-details-header'
              : 'normal-header'
          }
        >
          <Navbar />
          {apiStatus === apiStatusConstants.success && this.renderHeaderView()}
        </header>
        {this.renderFinalView()}
      </>
    )
  }
}

export default MovieDetails
