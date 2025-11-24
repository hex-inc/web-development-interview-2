import { useState } from "react";
import type { Movie } from "./Types";
import { MovieData } from "./MovieData";

export interface GetMoviesResult {
  data: Movie[] | null; // null if loading or error
  loading: boolean;
  error: boolean;
}

export type TestState = "loading" | "error" | "empty";

// loads movie data when the component mounts
// reload() may be used to reload data at any time
// optional testState can be used for testing
export function useGetMovies(testState?: TestState): GetMoviesResult {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setError(testState === "error");
      setData(testState === "empty" ? [] : MovieData);
      if (testState !== "loading") setLoading(false);
    }, 500);
  };

  if (data === null && !loading) loadData();

  return { data, loading, error };
}
