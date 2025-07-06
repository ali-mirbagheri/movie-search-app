/**
 * Zustand store for managing authentication state and actions.
 */
import { create } from 'zustand';
import { decryptData, encryptData, hashString } from '../../../shared/utils/encryptionWebCrypto';

/**
 * Interface for user data
 */
interface User {
  username: string;
  password: string;
}

/**
 * Interface for authentication store state and actions
 */
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

/**
 * Creates an authentication store with Zustand
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  /**
   * Registers a new user by encrypting and storing credentials in Local Storage
   * @param credentials - User credentials (username and password)
   * @throws Error if credentials are invalid or user already exists
   */
  register: async (credentials) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      if (!credentials.username || !credentials.password) {
        throw new Error('Invalid credentials');
      }

      // Hash username for Local Storage key
      const hashedUsername = await hashString(credentials.username);

      // Check if user already exists
      const storedUserJson = localStorage.getItem(`user:${hashedUsername}`);
      if (storedUserJson) {
        throw new Error('User already exists');
      }

      // Encrypt user data
      const userData = JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      });
      const encryptedData = await encryptData(userData, import.meta.env.VITE_SECRET_KEY);

      // Store encrypted data in Local Storage
      localStorage.setItem(`user:${hashedUsername}`, encryptedData);
      set({ user: { username: credentials.username, password: credentials.password } });
    } catch (error) {
      throw new Error((error as Error).message || 'Registration failed');
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Logs in a user by verifying credentials against stored encrypted data
   * @param credentials - User credentials (username and password)
   * @throws Error if credentials are invalid, user not found, or password incorrect
   */
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      if (!credentials.username || !credentials.password) {
        throw new Error('Invalid credentials');
      }

      // Hash username to find storage key
      const hashedUsername = await hashString(credentials.username);
      const encryptedUserJson = localStorage.getItem(`user:${hashedUsername}`);
      if (!encryptedUserJson) {
        throw new Error('Username not found');
      }

      // Decrypt user data
      const decryptedUserJson = await decryptData(encryptedUserJson, import.meta.env.VITE_SECRET_KEY  );
      if (!decryptedUserJson) {
        throw new Error('Error decrypting user data');
      }

      const storedUser = JSON.parse(decryptedUserJson) as User;
      if (storedUser.password !== credentials.password) {
        throw new Error('Incorrect password');
      }

      // Successful login
      set({ user: storedUser });
    } catch (error) {
      throw new Error((error as Error).message || 'Login failed');
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Logs out the current user by clearing the user state
   */
  logout: () => {
    set({ user: null });
  },
}));