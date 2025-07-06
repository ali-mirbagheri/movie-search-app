export type TGetMovies = {
  params: {
    page?: number;
    with_genres?: number;
    sort_by?: string;
  };
  response: TMovieResponse;
};

export type TSearchMovies = {
  params: {
    query: string;
    page?: number;
    with_genres?: number;
  };
  response: TMovieResponse;
};

export type TGetMovieDetails = {
  response: TMovieDetails;
};

export type TMovieResponse = {
  page: number;
  results: TMovie[];
  total_pages: number;
  total_results: number;
}

export type TMovie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TFilteredMovie = {
  movie_poster: string
  title: string
  rating: number
  genres: number[]
  id: number
}

export type TFilteredMoviesResponse = {
  results: TFilteredMovie[];
  page: number;
  total_pages: number;
}

export type TMovieDetails = {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                TGenre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    origin_country:        string[];
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  TProductionCompany[];
    production_countries:  TProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      TSpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

type TGenre = {
    id:   number;
    name: string;
}

export type TProductionCompany = {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export type TProductionCountry = {
    iso_3166_1: string;
    name:       string;
}

export type TSpokenLanguage = {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

export type TFilteredMovieDetails = {
  movie_poster: string
  budget: string
  genres: TGenre[]
  moviePageUrl: string
  original_title: string
  overview: string
  release_date: Date
  revenue: number
  runtime: number
  title: string
  vote_average: number
  vote_count: number
  tagline: string
}

export type TAddMovieParams = {
  query: string;
  genre?: number;
  movie: TFilteredMovieDetails;
}

export type TLocalMovies = TFilteredMovieDetails & { id: string }