import { useCallback, useState } from "react";
import type { Movie } from "./Types";
import { MovieData } from "./MovieData";

let MovieDb: Movie[] = MovieData;

export interface GetMoviesResult {
  data: Movie[] | null; // null if loading or error
  loading: boolean;
  error: boolean;
  reload: () => void;
}

// loads movie data when the component mounts
// reload() may be used to reload data at any time
export function useGetMovies(
  max?: number /* max number of movies to return */
): GetMoviesResult {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("movies loaded from the server");
      setData(max === undefined ? MovieDb : MovieDb.slice(0, max));
      setLoading(false);
    }, 500);
  }, [max]);

  if (data === null && !loading) reload();

  return { data, loading, error: false, reload };
}

export interface UpdateMoviesResult {
  removeMovies: (titlesToRemove: string[]) => void;
  resetMovies: () => void;
}

// provides methods for updatin the movie list:
// removeMovies: removes a list of movies (by title) from the movie list
// resetMovies: reset the list of movies to the original (without any removed)
export function useUpdateMovies(): UpdateMoviesResult {
  const removeMovies = useCallback((titlesToRemove: string[]) => {
    MovieDb = MovieDb.filter((movie) => !titlesToRemove.includes(movie.title));
  }, []);
  const resetMovies = useCallback(() => {
    MovieDb = MovieData;
  }, []);
  return { removeMovies, resetMovies };
}
