/**
 * MovieDetail component for displaying detailed information about a specific movie.
 *
 * @returns A React component rendering movie details or a skeleton/error state
 */
import { Box, Typography, Chip, Grid, Card, CardContent, Button, Stack, Rating, Tooltip, CardMedia } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../api';
import { useTranslations } from '../../../shared/translations/useTranslations';
import MovieDetailSkeleton from './MovieDetailSkeleton';

/**
 * MovieDetail component
 */
const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError, error } = useMovieDetail(Number(id));
  const t = useTranslations();

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {t.common.error || 'Failed to load movie details'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {error instanceof Error ? error.message : t.common.error}
        </Typography>
      </Box>
    );
  }

  return (
    movie && (<Card sx={{ width: '100%', p: 2, maxWidth: 1200 }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-start' }}
        gap={2}
      >
        <CardMedia
          component="img"
          image={`${import.meta.env.VITE_IMAGE_URL}${movie.movie_poster}`}
          alt={movie.title}
          sx={{
            borderRadius: 2,
            width: { xs: '100%', md: 300 },
            height: 'auto',
          }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {movie.title}
          </Typography>
          {movie.tagline && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {movie.tagline}
            </Typography>
          )}
          <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mb: 1 }} />
            ))}
          </Stack>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t.common.releaseDate || 'Release Date'}
              </Typography>
              <Typography>{new Date(movie.release_date).toLocaleDateString()}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t.common.runtime || 'Runtime'}
              </Typography>
              <Typography>{movie.runtime} min</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t.common.budget || 'Budget'}
              </Typography>
              <Typography>
                ${Number(movie.budget).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t.common.revenue || 'Revenue'}
              </Typography>
              <Typography>
                ${movie.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t.common.voteCount || 'Votes'}
              </Typography>
              <Typography>{movie.vote_count}</Typography>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="subtitle2" color="text.secondary">
              {t.common.rating || 'User Rating'}
            </Typography>
            <Tooltip title={`${movie.vote_average} / 10`}>
              <Box width="fit-content">
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                  size="large"
                />
              </Box>
            </Tooltip>
          </Box>
          {movie.moviePageUrl && (
            <Box mt={2}>
              <Button
                variant="contained"
                href={movie.moviePageUrl}
                target="_blank"
                startIcon={<OpenInNewIcon />}
              >
                {t.common.moviePageUrl || 'Visit Official Website'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Box>
    </Card>)
  );
};

export default MovieDetail;