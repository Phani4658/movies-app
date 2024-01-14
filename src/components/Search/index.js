import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchValue: '',
    apiStatus: apiStatusConstants.initial,
    finalSearchValue: '',
  }

  getSearchResults = async () => {
    const {searchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      finalSearchValue: searchValue,
    })
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const {results} = data
        const searchResults = results.map(movieDetails => ({
          id: movieDetails.id,
          backdropPath: movieDetails.backdrop_path,
          overview: movieDetails.overview,
          posterPath: movieDetails.poster_path,
          title: movieDetails.title,
        }))
        console.log(searchResults)
        this.setState({apiStatus: apiStatusConstants.success, searchResults})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateSearchValue = searchValue => {
    this.setState({searchValue})
    console.log(searchValue)
  }

  renderSuccessView = () => {
    const {searchResults, finalSearchValue} = this.state
    console.log(searchResults.length === 0)
    if (searchResults.length === 0) {
      return <FailureView isSearchEmpty searchValue={finalSearchValue} />
    }
    return (
      <>
        <ul className="popular-movies-container">
          {searchResults.map(movieDetails => (
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
        return <FailureView getSearchResults={this.getSearchResults} />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar
          updateSearchValue={this.updateSearchValue}
          getSearchResults={this.getSearchResults}
          isSearchPage
        />
        {this.renderFinalView()}
      </>
    )
  }
}

export default Search
