import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Favourites from "./Components/Favourites";
import Banner from "./Components/Banner";
import MovieList from "./Components/MovieList";
import Trending from "./Components/MoviesData/Trending";
import Upcoming from "./Components/MoviesData/Upcoming";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <MovieList />
            </>
          }
        ></Route>
        <Route
          path="/favourites"
          element={
            <>
              <Favourites />
            </>
          }
        ></Route>
        <Route path="/trending" element = {<Trending/>}></Route>
        <Route path="/upcoming" element = {<Upcoming/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
