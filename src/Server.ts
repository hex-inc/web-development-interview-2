import { useEffect, useState } from "react";
import type { Movie } from "./Types";
import { MovieData } from "./MovieData";

export interface GetMoviesResult {
  data: Movie[] | null; // null if loading or error
  loading: boolean;
  error: boolean;
}

export type TestState = "loading" | "error" | "empty";

// loads movie data when the component mounts
// optional testState can be used for testing
export function useGetMovies(testState?: TestState): GetMoviesResult {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setError(testState === "error");
      setData(testState === "empty" ? [] : MovieData);
      if (testState !== "loading") setLoading(false);
    }, 500);
  }, []);

  return { data, loading, error };
}
