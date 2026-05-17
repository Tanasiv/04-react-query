import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export interface MoviesResponse {
  results: any[];
  total_pages: number;
}

export const fetchMovies = async ({ query, page }: any) => {
  const res = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return res.data;
};