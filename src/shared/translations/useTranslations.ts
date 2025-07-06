/**
 * Hook for accessing localized translations.
 *
 * @returns The translation object for the current language
 */
import translations from './translations.json';

export interface Translations {
  auth: {
    loginTitle: string;
    registerTitle: string;
    usernameLabel: string;
    passwordLabel: string;
    pinLabel: string;
    loginButton: string;
    registerButton: string;
    loginSuccess: string;
    registerSuccess: string;
    loginError: string;
    registerError: string;
    invalidCredentials: string;
    userNotFound: string;
    wrongPassword: string;
    invalidPin: string;
    userExists: string;
    noAccount: string;
    hasAccount: string;
    error: string;
    invalidUsername: string;
    invalidPassword: string;
    logoutButton: string;
    logoutError: string;
    logoutSuccess: string;
  };
  movies: {
    title: string;
    searchLabel: string;
    deleteButton: string;
    addTitle: string;
    editTitle: string;
    addButton: string;
    editButton: string;
    noResults: string;
    error: string;
    deleteError: string;
    deleteSuccess: string;
    addError: string;
    editError: string;
    movieNotFound: string;
  };
  common: {
    rating: string;
    genres: string;
    error: string;
    title: string;
    originalTitle: string;
    overview: string;
    tagline: string;
    posterUrl: string;
    moviePageUrl: string;
    budget: string;
    revenue: string;
    runtime: string;
    voteCount: string;
    releaseDate: string;
    genreLabel: string;
    genreError: string;
  };
}

export const useTranslations = (): Translations => {
  const language = 'en'; // Future: Support dynamic language switching
  return translations[language];
};