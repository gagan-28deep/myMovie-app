import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
function MovieList() {
  const navigate = useNavigate() 
  return (
    <>
      <Link to='/trending'><button className='movielist-btn'>Trending Movies</button></Link>
      <Link to='/upcoming'><button className='movielist-btn'>Upcoming Movies</button></Link>
{/* 
      <button onClick={()=>navigate('trending')}>Trending Movies</button>
      <button onclick={()=>navigate('upcoming')}>Upcoming Movies</button> */}
    </>
  )
}

export default MovieList