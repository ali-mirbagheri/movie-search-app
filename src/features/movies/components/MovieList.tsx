/**
 * MovieList component for displaying a list of movies with search and genre filtering.
 * Uses infinite scrolling and virtualization for performance.
 *
 * @returns A React component rendering the movie list
 */
import { useState, useEffect, useMemo } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid } from '@mui/material';
import { FixedSizeGrid, type GridChildComponentProps, type GridOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useMovieStore } from '../store/movieStore';
import { useInfiniteMovies } from '../api';
import { useTranslations } from '../../../shared/translations/useTranslations';
import { useInfiniteVirtualLoader } from '../hooks/useVirtualListInfiniteLoader';
import SearchBar from './SearchBar';
import GenreFilter from './GenreFilters';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCard from './MovieCard';

/**
 * Constants for pagination and grid layout
 */
const MOVIES_PER_PAGE = 10;
const ITEM_HEIGHT = 700;
const ITEM_GAP = 16;

/**
 * Hook for calculating responsive column count based on screen size
 * @returns The number of columns based on the current breakpoint
 */
const useColumnCount = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  return isXs ? 1 : isSm ? 2 : 3;
};

const MovieList = () => {
  const { searchQuery, selectedGenre } = useMovieStore();
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteMovies(
    searchQuery,
    selectedGenre ? Number(selectedGenre) : undefined
  );
  const t = useTranslations();
  const [displayCount, setDisplayCount] = useState(MOVIES_PER_PAGE);
  const columnCount = useColumnCount();

  /**
   * Reset display count when search query or genre changes
   */
  useEffect(() => {
    setDisplayCount(MOVIES_PER_PAGE);
  }, [searchQuery, selectedGenre]);

  /**
   * Handle infinite loading for virtualized grid
   */
  const handleInfiniteLoad = useInfiniteVirtualLoader({
    data,
    displayCount,
    setDisplayCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    itemsPerPage: MOVIES_PER_PAGE,
  });

  /**
   * Calculate total items to display, accounting for loading state
   */
  const totalItems = useMemo(() => {
    if (data?.results) {
      return Math.min(displayCount, data.results.length + (isLoading ? MOVIES_PER_PAGE : 0));
    }
    return MOVIES_PER_PAGE;
  }, [displayCount, data?.results?.length, isLoading]);

  return (
    <Box
      sx={{
        p: 2,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 8 }}>
        <SearchBar />
        <GenreFilter />
      </Grid>

      {isError ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {t.movies.error}
        </Typography>
      ) : (
        <Box sx={{ flex: 1, width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <AutoSizer>
            {({ height, width }) => {
              const itemWidth = Math.floor((width - ITEM_GAP * (columnCount - 1)) / columnCount);
              const rowCount = Math.ceil(totalItems / columnCount);

              return (
                <FixedSizeGrid
                  columnCount={columnCount}
                  columnWidth={itemWidth}
                  rowCount={rowCount}
                  rowHeight={ITEM_HEIGHT}
                  height={height}
                  width={width}
                  overscanRowCount={3}
                  onItemsRendered={({ visibleRowStopIndex }: GridOnItemsRenderedProps) => {
                    const lastIndex = (visibleRowStopIndex + 1) * columnCount - 1;
                    handleInfiniteLoad(lastIndex, totalItems);
                  }}
                >
                  {({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
                    const index = rowIndex * columnCount + columnIndex;
                    const isLoadingItem = !data?.results || index >= data.results.length;

                    // Convert style properties to numbers, fallback to 0 if undefined
                    const left = typeof style.left === 'string' ? parseFloat(style.left) || 0 : style.left ?? 0;
                    const top = typeof style.top === 'string' ? parseFloat(style.top) || 0 : style.top ?? 0;
                    const width = typeof style.width === 'string' ? parseFloat(style.width) || 0 : style.width ?? 0;
                    const height = typeof style.height === 'string' ? parseFloat(style.height) || 0 : style.height ?? 0;

                    return (
                      <div
                        style={{
                          ...style,
                          left: `${left + columnIndex * ITEM_GAP}px`,
                          top: `${top + rowIndex * ITEM_GAP}px`,
                          width: `${width - ITEM_GAP}px`,
                          height: `${height - ITEM_GAP}px`,
                        }}
                      >
                        {isLoadingItem ? (
                          <MovieCardSkeleton />
                        ) : (
                          <MovieCard movie={data.results[index]} />
                        )}
                      </div>
                    );
                  }}
                </FixedSizeGrid>
              );
            }}
          </AutoSizer>
        </Box>
      )}
    </Box>
  );
};

export default MovieList;