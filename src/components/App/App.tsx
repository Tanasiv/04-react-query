import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";




import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";



export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: !!query,
  });

  const movies = data?.results ?? [];


  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <>
      <Toaster />

      {/* 🔍 SEARCH */}
      <SearchBar onSubmit={handleSearch} />

      {/* ⏳ LOADING */}
      {isLoading && <Loader />}

      {/* ❌ ERROR */}
      {isError && <ErrorMessage />}

      {/* 🎬 MOVIES */}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {/* 🎥 MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}


    
    </>
  );
}