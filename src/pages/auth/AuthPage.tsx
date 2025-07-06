import Auth from '../../features/auth/components/Auth';

/**
 * Props for the AuthPage
 */
interface AuthProps {
  mode: 'login' | 'register';
}

const AuthPage = ({ mode }: AuthProps) => {

  return <Auth mode={mode} />;
};

export default AuthPage;