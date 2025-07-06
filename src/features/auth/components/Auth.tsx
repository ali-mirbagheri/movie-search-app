/**
 * Authentication component for handling login and registration forms.
 *
 * @param props - Component props
 * @param props.mode - Either 'login' or 'register' to determine the form mode
 * @returns A React component rendering the authentication form
 */
import { Box, TextField, Button, Typography, CircularProgress, Card } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { useTranslations } from '../../../shared/translations/useTranslations';
import { useAuthStore } from '../store/authStore';
import { authSchema } from '../utils/authValidation';

/**
 * Form data interface for authentication
 */
interface AuthFormData {
  username: string;
  password: string;
}

/**
 * Props for the Auth component
 */
interface AuthProps {
  mode: 'login' | 'register';
}

const Auth = ({ mode }: AuthProps) => {
  const t = useTranslations();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading } = useAuthStore();
  const from = location.state?.from?.pathname || '/';
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  /**
   * Handles form submission for login or registration
   * @param data - Form data containing username and password
   */
  const onSubmit = async (data: AuthFormData) => {
    try {
      const sanitizedData = {
        username: DOMPurify.sanitize(data.username),
        password: DOMPurify.sanitize(data.password),
      };
      
      if (mode === 'login') {
        await login(sanitizedData);
        toast.success(t.auth.loginSuccess || 'Login successful');
        navigate(from, { replace: true });
      } else {
        await register(sanitizedData);
        toast.success(t.auth.registerSuccess || 'Registration successful');
        navigate('/login', { replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.auth.error || 'An error occurred');
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 400, 
      mx: 'auto', 
      p: 6, 
      mt: 8, 
      bgcolor: '#212121', 
      color: '#ffffff', 
      borderRadius: 2 
    }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t.auth.usernameLabel || 'Username'}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isLoading}
              sx={{ 
                input: { color: '#ffffff' }, 
                label: { color: '#aaaaaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#424242' },
                  '&:hover fieldset': { borderColor: '#ffffff' },
                },
              }}
              onChange={(e) => field.onChange(DOMPurify.sanitize(e.target.value))}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label={t.auth.passwordLabel || 'Password'}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              sx={{ 
                input: { color: '#ffffff' }, 
                label: { color: '#aaaaaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#424242' },
                  '&:hover fieldset': { borderColor: '#ffffff' },
                },
              }}
              onChange={(e) => field.onChange(DOMPurify.sanitize(e.target.value))}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : mode === 'login' ? (
            t.auth.loginButton || 'Login'
          ) : (
            t.auth.registerButton || 'Register'
          )}
        </Button>
        {mode === 'login' ? (
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaaaaa' }}>
            <Link to="/register" style={{ color: '#42a5f5', textDecoration: 'underline' }}>
              {t.auth.noAccount || 'Don’t have an account? Register'}
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaaaaa' }}>
            <Link to="/login" style={{ color: '#42a5f5', textDecoration: 'underline' }}>
              {t.auth.hasAccount || 'Already have an account? Login'}
            </Link>
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default Auth;