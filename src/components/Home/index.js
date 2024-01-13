import './index.css'
import {Component} from 'react'
import Navbar from '../Navbar'
import TrendingMoviesList from '../TrendingMoviesList'

class Home extends Component {
  render() {
    return (
      <>
        <header>
          <Navbar isHome />
          <img
            src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1705125000/superman_izukis.jpg"
            alt="movie"
          />
        </header>
        <div className="movies-section">
          <TrendingMoviesList />
        </div>
      </>
    )
  }
}

export default Home
