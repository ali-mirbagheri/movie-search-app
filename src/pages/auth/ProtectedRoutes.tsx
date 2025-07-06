/**
 * ProtectedRoute component for guarding routes that require authentication.
 *
 * @returns A React component rendering child routes for authenticated users or redirecting to login
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import Header from '../../shared/components/Header';

/**
 * ProtectedRoute component to ensure only authenticated users access certain routes
 */
const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;