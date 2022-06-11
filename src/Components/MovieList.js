import React from 'react'
import {Link} from 'react-router-dom'
function MovieList() {
  return (
    <>
      <Link to='/trending'><button className='movielist-btn'>Trending Movies</button></Link>
      <Link to='/upcoming'><button className='movielist-btn'>Upcoming Movies</button></Link>
    </>
  )
}

export default MovieList