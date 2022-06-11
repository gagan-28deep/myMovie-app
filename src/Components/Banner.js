import React, { useEffect } from "react";
import { movies } from "./GetMovies";
import axios from 'axios'
function Banner() {

  // useEffect(async ()=>{
  //   const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=813fc636b6c680f1e28a60bab5837918&language=en-US&page=${1}`)
  //   let data = res.data
  //   console.log(data);
  // } , [])

  let moviesEle = movies.results[Math.floor(Math.random() * 10)];
  let backDrop = moviesEle.backdrop_path;
  let movieTitle = moviesEle.title;
  let orgTitle = moviesEle.original_title
  let movieOverview = moviesEle.overview

  return (
    <>
      {movies == "" ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="card banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${backDrop}`}
              alt={movieTitle}
              className="card-img-top banner-img"/>
              <h1 className="card-title banner-title">{orgTitle}</h1>
              <p className="card-text banner-text">{movieOverview}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
