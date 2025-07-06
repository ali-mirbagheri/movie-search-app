/**
 * GenreFilter component for selecting a movie genre to filter the movie list.
 * Displays a dropdown of available genres or a loading/error state.
 *
 * @returns A React component rendering a genre selection dropdown.
 */
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography, Grid } from '@mui/material';
import { useMovieStore } from '../store/movieStore';
import { useGenres } from '../api';
import { useTranslations } from '../../../shared/translations/useTranslations';

const GenreFilter = () => {
  const { selectedGenre, setSelectedGenre } = useMovieStore();
  const { data: genres, isLoading, isError } = useGenres();
  const t = useTranslations();

  return (
    <Grid size={{ xs: 6, md: 4 }} sx={{ p: 2 }}>
      <FormControl sx={{ width: '100%' }} variant="outlined">
        <InputLabel>{t.common.genreLabel}</InputLabel>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : isError ? (
          <Typography color="error">{t.common.genreError}</Typography>
      ) : (
        <Select
          value={selectedGenre ?? ''}
          onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
          label={t.common.genreLabel}
        >
          <MenuItem value="">{t.common.genres}</MenuItem>
          {genres?.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      )}
     </FormControl>
    </Grid>
  );
};

export default GenreFilter;