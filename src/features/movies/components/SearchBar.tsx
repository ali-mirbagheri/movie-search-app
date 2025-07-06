/**
 * SearchBar component for searching movies with debounced input.
 *
 * @returns A React component rendering a search input field
 */
import { useState, useCallback } from 'react';
import { TextField, Grid } from '@mui/material';
import { debounce } from 'lodash';
import { useMovieStore } from '../store/movieStore';
import { useTranslations } from '../../../shared/translations/useTranslations';

const SearchBar = () => {
  const { setSearchQuery } = useMovieStore();
  const [localValue, setLocalValue] = useState('');
  const t = useTranslations();

  /**
   * Debounced function to update the search query in the store
   */
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 700),
    [setSearchQuery]
  );

  /**
   * Handles input changes and triggers debounced search
   * @param e - The change event from the input field
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedSearch(value);
  };

  return (
    <Grid size={{ xs: 6, md: 4 }} sx={{ p: 2 }}>
      <TextField
        fullWidth
        label={t.movies.searchLabel || 'Search Movies'}
        variant="outlined"
        value={localValue}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default SearchBar;