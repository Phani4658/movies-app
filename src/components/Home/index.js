import './index.css'
import {Component} from 'react'
import Navbar from '../Navbar'

class Home extends Component {
  render() {
    return (
      <header>
        <Navbar isHome />
        <img
          src="https://res.cloudinary.com/dv0oedkxm/image/upload/v1705125000/superman_izukis.jpg"
          alt="movie"
        />
      </header>
    )
  }
}

export default Home
