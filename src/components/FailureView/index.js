import './index.css'

const FailureView = props => {
  const {
    getPopularMovies,
    isSearchEmpty,
    searchValue,
    isPopularPage,
    getSearchResults,
  } = props
  const imageUrl = !isSearchEmpty
    ? 'https://res.cloudinary.com/dv0oedkxm/image/upload/v1694082454/Background-Complete_ggb5ru.png'
    : 'https://res.cloudinary.com/dv0oedkxm/image/upload/v1705178761/NoSearchValue_shlxe9.png'
  const imageAlt = !isSearchEmpty ? 'failure view' : 'no movies'
  const description = !isSearchEmpty
    ? 'Something went wrong. Please try again'
    : `Your search for ${searchValue} did not find any matches.`
  return (
    <div className="failure-view-container">
      <img src={imageUrl} alt={imageAlt} className="failure-view-image" />
      <p className="failure-description">{description}</p>
      {!isSearchEmpty && (
        <button
          onClick={() =>
            isPopularPage ? getPopularMovies() : getSearchResults()
          }
          type="button"
          className="try-again-button"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default FailureView
