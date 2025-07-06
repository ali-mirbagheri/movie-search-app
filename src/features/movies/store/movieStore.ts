/**
 * Zustand store for managing movie search and genre filter state.
 */
import { create } from 'zustand';

/**
 * Interface for movie store state and actions
 */
interface MovieStore {
  searchQuery: string;
  selectedGenre: number | null;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
}

/**
 * Creates a movie store with Zustand
 */
export const useMovieStore = create<MovieStore>((set) => ({
  /**
   * Current search query for filtering movies
   */
  searchQuery: '',
  /**
   * Currently selected genre ID for filtering movies
   */
  selectedGenre: null,
  /**
   * Updates the search query
   * @param query - The search query string
   */
  setSearchQuery: (query) => set({ searchQuery: query }),
  /**
   * Updates the selected genre
   * @param genreId - The ID of the selected genre or null
   */
  setSelectedGenre: (genreId) => set({ selectedGenre: genreId }),
}));