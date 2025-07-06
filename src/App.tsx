/**
 * Main application component for routing and global setup.
 *
 * @returns A React component rendering the application with routing
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './pages/auth/ProtectedRoutes';
import Auth from './pages/auth/AuthPage';
import MovieList from './features/movies/components/MovieList';
import MovieDetail from './pages/movies/MovieDetail';

/**
 * Application component with routing
 */
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;