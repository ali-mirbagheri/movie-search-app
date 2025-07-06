/**
 * MovieCard component for displaying a single movie with its details and actions.
 * Allows navigation to movie details and deletion of the movie.
 *
 * @param props - Component props
 * @param props.movie - The movie data to display
 * @param props.isLoading - Whether the card is in a loading state
 * @returns A React component rendering a movie card
 */
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Chip, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDeleteMovie, useGenres, type TFilteredMovie } from '../api';
import { useMovieStore } from '../store/movieStore';
import { useTranslations } from '../../../shared/translations/useTranslations';

/**
 * Props for the MovieCard component
 */
interface MovieCardProps {
  movie?: TFilteredMovie;
  isLoading?: boolean;
}

const MovieCard = ({ movie, isLoading }: MovieCardProps) => {
  const navigate = useNavigate();
  const { data: genres } = useGenres();
  const { searchQuery, selectedGenre } = useMovieStore();
  const t = useTranslations();
  const { mutate: deleteMovie, isPending } = useDeleteMovie(searchQuery, selectedGenre ? selectedGenre : undefined);

  const genreNames = isLoading
    ? []
    : movie?.genres.map((id) => genres?.find((genre) => genre.id === id)?.name || 'Unknown') || [];

  /**
   * Handles navigation to the movie details page
   */
  const handleCardClick = () => {
    if (!isLoading && movie) {
      navigate(`/movie/${movie.id}`);
    }
  };

  /**
   * Handles the delete action for the movie
   * @param event - The mouse event from clicking the delete button
   * @param movieId - The ID of the movie to delete
   */
  const handleDelete = (event: React.MouseEvent, movieId: string) => {
    event.stopPropagation();
    if (movieId) {
      deleteMovie(movieId);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        mx: 'auto',
        my: 2,
        cursor: isLoading ? 'default' : 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: isLoading ? 'none' : 'scale(1.05)' },
        backgroundColor: '#212121',
        color: '#ffffff',
      }}
      onClick={handleCardClick}
    >
        <CardMedia
          component="img"
          height="500"
          image={`${import.meta.env.VITE_IMAGE_URL}${movie?.movie_poster}`}
          alt={movie?.title}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ position: 'relative' }}>
            <Typography variant="h6" component="div">
              {movie?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.common.rating}: {movie?.rating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.common.genres}:{' '}
              {genreNames.map((name) => (
                <Chip
                  key={name}
                  label={name}
                  size="small"
                  sx={{ mr: 0.5, backgroundColor: '#424242', color: '#ffffff' }}
                />
              ))}
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={(e) => handleDelete(e, movie?.id.toString() || '')}
              disabled={isPending || !movie?.id}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#ff1744',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: '#ff4569',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
        </CardContent>
    </Card>
  );
};

export default MovieCard;