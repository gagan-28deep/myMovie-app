import React, { useEffect, useState } from "react";
import { movies } from "./GetMovies";
function Favourites() {
  let [genre, setGenre] = useState([]);
  let [currGenre, setCurrGenre] = useState("All genres");
  let [movies, setMovies] = useState([]);
  let [currText, setCurrText] = useState("");
  let [limit, setLimit] = useState(5);
  let [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("custom-movie-app") || "[]");
    let temp = [];
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift("All genres");
    setGenre([...temp]);
    setMovies([...data]);

  } , []);

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  let filterArr = []

  if (currText === "") {
    filterArr = movies;
  } else {
    filterArr = movies.filter((movieObj) => {
      let title = movieObj.original_title.toLowerCase();
      return title.includes(currText.toLowerCase().trim());
    });
  }

  if (currGenre !== "All genres") {
    filterArr = movies.filter(
      (movieObj) => genreids[movieObj.genre_ids[0]] == currGenre
    );
  }

  let pages = Math.ceil(filterArr.length / limit)
  let pageArr = []
  for(let i = 1 ; i<=pages ; i++){
      pageArr.push(i)
  }
  let si = (currPage - 1)*(limit)
  let ei = (si) + (limit)
  filterArr = filterArr.slice(si , ei)

  const handleChangeGenre = (genre) => {
    setCurrGenre(genre);
  };

  const sortPopularityDesc = () => {
    let temp = movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
    setMovies([...temp]);
  };
  const sortPopularityAsc = () => {
    let temp = movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
    setMovies([...temp]);
  };

  const sortRatingDesc = () => {
    let temp = movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    setMovies([...temp]);
  };

  const sortRatingAsc = () => {
    let temp = movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    setMovies([...temp]);
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  const handleDelete = (id) => {
    let newArr = [];
    newArr = movies.filter((movieObj) => movieObj.id !== id);
    setMovies([...newArr]);
    localStorage.setItem("custom-movie-app", JSON.stringify(newArr));
  };
  return (
    <div>
      <>
        <div className="main">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="list-group favourites-group">
                <ul className="list-group">
                  {genre.map((genre) =>
                    currGenre === genre ? (
                      <li
                        className="list-group-item"
                        style={{
                          background: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        style={{
                          background: "white",
                          color: "#3f51b5",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleChangeGenre(genre)}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-sm-12 favourites-table">
              <div className="row">
                <input
                  type="text"
                  className="input-group-text col"
                  placeholder="Search"
                  value={currText}
                  onChange={(e) => setCurrText(e.target.value)}
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="Rows Count"
                  value={limit}
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}
                />
              </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={sortPopularityDesc}
                      ></i>
                      Popularity
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={sortPopularityAsc}
                      ></i>
                    </th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={sortRatingDesc}
                      ></i>
                      Rating
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={sortRatingAsc}
                      ></i>
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filterArr.map(
                    // this.state.movies.map
                    (
                      movieObj // movies.map
                    ) => (
                      <tr>
                        <td>
                          <img
                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                            alt={movieObj.title}
                            style={{ width: "5rem" }}
                          />
                        </td>
                        <td>{movieObj.original_title}</td>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(movieObj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {pageArr.map((page) => (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Favourites;
