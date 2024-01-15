import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {details} = props

  return (
    <li className="movie-card">
      <Link to={`/movies/${details.id}`} key={details.id}>
        <img src={details.posterPath} alt={details.title} />
      </Link>
    </li>
  )
}

export default MovieCard
