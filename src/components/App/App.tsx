import { useState } from "react";
import "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSubmit(query: string) {
    const trimmed = query.trim();

    if (!trimmed) {
      toast.error("Please enter your search query.");
      setMovies([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setMovies([]);

    try {
      const results = await fetchMovies(trimmed);

      if (results.length === 0) {
        toast.error("No movies found.");
        setStatus("idle");
        return;
      }

      setMovies(results);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {status === "error" && <ErrorMessage />}
      {status === "loading" && <Loader />}
      {movies.length > 0 && status === "success" && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </>
  );
}

export default App;