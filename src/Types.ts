export type MovieGenre = "Action" | "Comedy" | "Drama";

export type MovieRating = "R" | "PG" | "PG-13" | "G";

export interface Movie {
  title: string;
  genre: MovieGenre;
  year: number;
  runtime: number; // minutes
  director: string;
  rating: MovieRating;
}
