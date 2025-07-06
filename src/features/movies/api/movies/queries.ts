/**
 * React Query hooks for fetching and mutating movie data.
 */
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { TFilteredMoviesResponse } from './types';
import { toast } from 'react-toastify';
import { deleteMovie, getMovieDetails, getMovies, searchMovies } from './utils';
import type { ApiError } from '../../../../shared/utils/errorHandler';
import { useTranslations } from '../../../../shared/translations/useTranslations';

const queryKeyMovies = 'movies';

/**
 * Hook for fetching movies with infinite scrolling, supporting search and genre filtering.
 *
 * @param query - The search query string
 * @param genre - The selected genre ID
 * @returns InfiniteQuery result with movie data
 */
export const useInfiniteMovies = (query: string, genre?: number) =>
  useInfiniteQuery<TFilteredMoviesResponse, ApiError, TFilteredMoviesResponse, [string, string, string | undefined], number>({
    queryKey: [queryKeyMovies, query, genre ? `genre-${genre}` : ''],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      query
        ? searchMovies({ query, page: pageParam, with_genres: genre })
        : getMovies({ page: pageParam, with_genres: genre }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    select: (data: InfiniteData<TFilteredMoviesResponse>): TFilteredMoviesResponse => ({
      results: data.pages.flatMap((page) => page.results),
      page: data.pages[data.pages.length - 1].page,
      total_pages: data.pages[data.pages.length - 1].total_pages,
    }),
  });

/**
 * Hook for fetching details of a single movie by ID.
 *
 * @param id - The ID of the movie
 * @returns Query result with movie details
 */
export const useMovieDetail = (id: number) =>
  useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });

/**
 * Hook for deleting a movie by ID, updating the movie list cache and showing notifications.
 *
 * @param query - The current search query
 * @param genre - The selected genre ID
 * @returns Mutation result for deleting a movie
 */
export const useDeleteMovie = (query: string, genre?: number) => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation<void, ApiError, string>({
    mutationFn: deleteMovie,
    onSuccess: (_, movieId) => {
      const queryKey: [string, string, string | undefined] = [queryKeyMovies, query, genre ? `genre-${genre}` : ''];
      queryClient.setQueryData<InfiniteData<TFilteredMoviesResponse>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              results: page.results.filter((movie) => movie.id.toString() !== movieId),
            })),
          };
        }
      );
      toast.success(t.movies.deleteSuccess);
    },
    onError: (error) => {
      toast.error(error.message || t.movies.deleteError);
    },
  });
};