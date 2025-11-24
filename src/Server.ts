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

export interface GetMoviesOptions {
  max?: number /* max number of movies to return */;
  longLoading?: boolean /* true will force a 2sec loading time */;
  withError?: boolean /* true will cause an error to occur */;
}

// loads movie data when the component mounts
// reload() may be used to reload data at any time
export function useGetMovies(options?: GetMoviesOptions): GetMoviesResult {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setTimeout(
      () => {
        console.log("movies loaded from the server");
        setError(options?.withError ?? false);
        setData(
          options?.max === undefined ? MovieDb : MovieDb.slice(0, options.max)
        );
        setLoading(false);
      },
      options?.longLoading ? 2000 : 500
    );
  }, [options]);

  if (data === null && !loading) reload();

  return { data, loading, error, reload };
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
