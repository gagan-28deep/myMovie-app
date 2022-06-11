import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div style={{display: 'flex' , padding : '0.5rem'}}>
    <Link to='/' style={{textDecoration : 'none'}}><h1 style={{marginTop : '1rem' , marginLeft : '1rem'}}>Movies App</h1></Link>
    <Link to='/favourites' style={{textDecoration : 'none'}}><h2 style={{marginTop : '1.5rem' , marginLeft : '2rem'}}>Favourites</h2></Link>
    </div>
  )
}

export default Navbar