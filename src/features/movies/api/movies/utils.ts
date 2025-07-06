/**
 * Utility functions for movie-related API calls and local storage operations.
 */
import api from "../../../../shared/api/configs/axios";
import { handleApiError } from "../../../../shared/utils/errorHandler";
import { transformData } from "../../../../shared/utils/transformData";
import {
  type TGetMovies,
  type TSearchMovies,
  type TGetMovieDetails,
  type TFilteredMoviesResponse,
  type TFilteredMovie,
  type TMovie,
  type TFilteredMovieDetails,
  type TMovieDetails,
} from './types';

/**
 * Fetches movies from the API with optional genre filtering and applies local deletion filtering.
 *
 * @param params - Parameters for fetching movies (page, genres)
 * @returns A promise resolving to filtered movie data
 * @throws ApiError if the request fails
 */
export const getMovies = async (params: TGetMovies['params']): Promise<TFilteredMoviesResponse> => {
  try {
    const res = await api.get<TGetMovies['response']>('/discover/movie', { params });
    const filteredResults = res.data.results?.map((movie) =>
      transformData<TMovie, TFilteredMovie>(movie, {
        movie_poster: 'backdrop_path',
        rating: 'vote_average',
        genres: 'genre_ids',
        title: 'title',
        id: 'id',
      })
    );

    const deletedMovies = getDeletedMovies();
    const filteredMovies = filteredResults.filter(
      (movie) => !deletedMovies.includes(movie.id.toString())
    );

    return {
      results: filteredMovies,
      page: res.data.page,
      total_pages: res.data.total_pages,
    };
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch movies');
  }
};

/**
 * Searches movies based on a query string with optional genre filtering and applies local deletion filtering.
 *
 * @param params - Parameters for searching movies (query, page, genres)
 * @returns A promise resolving to filtered movie data
 * @throws ApiError if the request fails
 */
export const searchMovies = async (params: TSearchMovies['params']): Promise<TFilteredMoviesResponse> => {
  try {
    const { with_genres, ...restParams } = params;
    const res = await api.get<TSearchMovies['response']>('/search/movie', { params: restParams });
    const filteredResults = res.data.results.map((movie) =>
      transformData<TMovie, TFilteredMovie>(movie, {
        movie_poster: 'backdrop_path',
        rating: 'vote_average',
        genres: 'genre_ids',
        title: 'title',
        id: 'id',
      })
    );

    const deletedMovies = getDeletedMovies();
    const filteredMovies = filteredResults.filter(
      (movie) => !deletedMovies.includes(movie.id.toString())
    );

    const filteredResultsBasedOnGenre = with_genres
      ? filteredMovies.filter((movie) => movie?.genres?.includes(Number(with_genres)))
      : filteredMovies;

    return {
      results: filteredResultsBasedOnGenre,
      page: res.data.page,
      total_pages: res.data.total_pages,
    };
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch movies');
  }
};

/**
 * Fetches detailed information for a specific movie by ID.
 *
 * @param id - The ID of the movie
 * @returns A promise resolving to filtered movie details
 * @throws ApiError if the request fails
 */
export const getMovieDetails = async (id: number): Promise<TFilteredMovieDetails> => {
  try {
    const res = await api.get<TGetMovieDetails['response']>(`/movie/${id}`);
    const filteredResults = transformData<TMovieDetails, TFilteredMovieDetails>(res.data, {
      movie_poster: 'poster_path',
      budget: 'budget',
      genres: 'genres',
      moviePageUrl: 'homepage',
      original_title: 'original_title',
      overview: 'overview',
      release_date: 'release_date',
      revenue: 'revenue',
      runtime: 'runtime',
      title: 'title',
      vote_average: 'vote_average',
      vote_count: 'vote_count',
      tagline: 'tagline',
    });

    return filteredResults;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch movie details');
  }
};

/**
 * Key for storing deleted movie IDs in Local Storage.
 */
const DELETED_MOVIES_KEY = 'deletedMovies';

/**
 * Marks a movie as deleted by storing its ID in Local Storage.
 *
 * @param movieId - The ID of the movie to delete
 * @returns A promise resolving when the movie is marked as deleted
 * @throws Error if the operation fails
 */
export const deleteMovie = async (movieId: string): Promise<void> => {
  try {
    const deletedMovies = getDeletedMovies();
    if (!deletedMovies.includes(movieId)) {
      deletedMovies.push(movieId);
      localStorage.setItem(DELETED_MOVIES_KEY, JSON.stringify(deletedMovies));
    }
  } catch {
    throw new Error('Failed to delete movie');
  }
};

/**
 * Retrieves the list of deleted movie IDs from Local Storage.
 *
 * @returns An array of deleted movie IDs
 * @throws Error if the operation fails
 */
export const getDeletedMovies = (): string[] => {
  try {
    const data = localStorage.getItem(DELETED_MOVIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    throw new Error('Failed to get deleted movies');
  }
};