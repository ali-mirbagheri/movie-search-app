/**
 * Header component displaying navigation and logout buttons for authenticated users.
 *
 * @returns A React component rendering a fixed header with navigation and logout buttons
 */
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslations } from '../translations/useTranslations';
import { useAuthStore } from '../../features/auth/store/authStore';

/**
 * Header component for navigation and logout functionality
 */
const Header = () => {
  const { logout } = useAuthStore();
  const t = useTranslations();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles logout action, shows a success toast, and redirects to login page
   */
  const handleLogout = () => {
    logout();
    toast.success(t.auth.logoutSuccess || 'Logged out successfully');
    navigate('/login');
  };

  /**
   * Handles navigation to the home page
   */
  const handleBackToHome = () => {
    navigate('/');
  };

  // Show back button only if not on the home page
  const showBackButton = location.pathname !== '/';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: '#1d1d1d',
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">{t.movies.title || 'Movies'}</Typography>
        {showBackButton && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBackToHome}
            sx={{ borderColor: '#90caf9', color: '#90caf9', '&:hover': { borderColor: '#64b5f6', bgcolor: '#1d1d1d' } }}
          >
            {t.movies.title}
          </Button>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
      >
        {t.auth.logoutButton || 'Logout'}
      </Button>
    </Box>
  );
};

export default Header;