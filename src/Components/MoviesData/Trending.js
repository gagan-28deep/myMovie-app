import React , {useState , useEffect} from 'react'

import axios from 'axios'
import {movies} from '../GetMovies'
function Trending() {
    // let movie = movies.results
    let [hover , setHover] =  useState('')
    let [favourites , setFavourites] = useState([])
    let [parr , setParr] = useState([1])
    let [currPage , setCurrPage] = useState(1)
    let [movies , setMovies] = useState([])

    useEffect(async ()=>{
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=813fc636b6c680f1e28a60bab5837918&language=en-US&page=${currPage}`)
      let data = res.data
      setMovies([...data.results])
    } , [currPage])

    const handleLeft = ()=>{
      if(currPage!=1){
        setCurrPage(currPage - 1)
      }
      handleChangeMovies()
    }
    const handleRight = ()=>{
      let tempArr = []
      for(let i = 1 ; i<parr.length + 1 ; i++) {
        tempArr.push(parr[i])
    }
    setParr(...tempArr)
    setCurrPage((currPage),handleChangeMovies()) 
    
  }

  const handleChangeMovies = async ()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=813fc636b6c680f1e28a60bab5837918&language=en-US&page=${currPage}`)
    let data = res.data
    setMovies([...data.results])
  }

    const handleFavourites = (movie)=>{
        let oldData = JSON.parse(localStorage.getItem('custom-movie-app') || '[]')
        if(favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id != movie.id)
        }
        else{
            oldData.push(movie)
        }
        localStorage.setItem('custom-movie-app',JSON.stringify(oldData))
        handleFavouriteState()
    }

    const  handleFavouriteState = ()=>{
        let oldData = JSON.parse(localStorage.getItem('custom-movie-app') || '[]')
        let temp = oldData.map((movie)=>movie.id)
        setFavourites([...temp])
    }
  return (
    <>
        {
            movies.length === 0 ? 
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : 
          <div>
            <h2 className='text-center'><strong>Trending</strong></h2>
            <div className='movies-list'>{movies.map((movieObj=>(
                <div className='card movies-card' 
                onMouseEnter={()=>(setHover(movieObj.id))}
                onMouseLeave={()=>(setHover(''))}>
                    <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.title}
                    />
                    <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  <div className='button-wrapper' style={{display : 'flex' , justifyContent : 'center' , width : '100%'}}>
                      {
                          hover == movieObj.id &&
                          <a className='btn btn-primary movies-btn' onClick={()=>handleFavourites(movieObj)}>
                        {
                            favourites.includes(movieObj.id) ? 'Remove From Favourites' : 'Add to Favourites' 
                        }
                    </a>
                      }
                    {/* <a className='btn btn-primary movies-btn' onClick={()=>handleFavourites(movieObj)}>
                        {
                            favourites.includes(movieObj.id) ? 'Remove From Favourites' : 'Add to Favourites' 
                        }
                    </a> */}
                  </div>
                </div>
            )))}</div>
            <div style={{display : 'flex' , justifyContent : 'center'}}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={handleLeft}>
                      Previous
                    </a>
                  </li>
                    {
                        parr.map((value)=>(
                            <li className="page-item">
                            <a className="page-link" onClick={()=>this.handleClick(value)}>
                              {value}
                            </a>
                          </li>
                        ))
                    }
                  <li className="page-item">
                    <a className="page-link" onClick={handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        }
    
    </>
  )
}

export default Trending