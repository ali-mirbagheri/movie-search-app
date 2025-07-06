import { Skeleton, Card, Fade } from '@mui/material';

const MovieCardSkeleton = () => {
  return (
    <Fade in timeout={500}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 600,
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={400} animation="wave" />
        <Skeleton variant="text" height={40} sx={{ mt: 2 }} animation="wave" />
        <Skeleton variant="text" height={30} width="60%" animation="wave" />
      </Card>
    </Fade>
  );
};

export default MovieCardSkeleton;
