/**
 * MovieDetailSkeleton component for displaying a placeholder while movie details are loading.
 *
 * @returns A React component rendering a skeleton for movie details
 */
import { Skeleton, Card, CardContent, Stack, Box, Grid } from '@mui/material';

const MovieDetailSkeleton = () => {
  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ md: "flex-start" }}
        gap={2}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: 2,
            width: { xs: "100%", md: 300 },
            height: { xs: 400, md: 450 },
          }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
          <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={80} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={100} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={70} height={32} sx={{ mb: 1 }} />
          </Stack>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="rectangular" width={120} height={24} />
          </Box>
          <Box mt={2}>
            <Skeleton variant="rectangular" width={160} height={36} />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieDetailSkeleton;