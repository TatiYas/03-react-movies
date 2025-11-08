import axios from "axios";
import type { Movie } from "../../src/types/movie";
interface TMDBResponse {
  results: Movie[];
}
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) {
    console.warn("Порожній пошуковий запит - запит не буде виконано.");
    return [];
  }

  try {
    const response = await axios.get<TMDBResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.results)) {
      console.error("Невірний формат даних від TMDB API");
      return [];
    }

    return response.data.results;
  } catch (error) {
  
    console.error("Помилка при запиті до TMDB API:", error);
    return [];
  }
}