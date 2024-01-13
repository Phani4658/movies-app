import './index.css'

const FailureView = props => {
  const {getFailureView, isPopularPage, searchInputValue} = props
  const imageUrl = isPopularPage
    ? 'https://res.cloudinary.com/dv0oedkxm/image/upload/v1694082454/Background-Complete_ggb5ru.png'
    : 'https://res.cloudinary.com/dv0oedkxm/image/upload/v1705178761/NoSearchValue_shlxe9.png'

  const description = isPopularPage
    ? 'Something went wrong. Please try again'
    : `Your search for ${searchInputValue} did not find any matches.`
  return (
    <div className="failure-view-container">
      <img src={imageUrl} alt="failureView" className="failure-view-image" />
      <p className="failure-description">{description}</p>
      {isPopularPage && (
        <button
          onClick={getFailureView}
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
