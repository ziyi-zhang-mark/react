import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true);
    setError();
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong!!");
        }
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movie) => ({
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        }));
        setMovies(transformedMovies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = (movie) => {
    console.log(movie);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
