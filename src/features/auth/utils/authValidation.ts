/**
 * Yup schema for validating authentication form data.
 */
import * as yup from 'yup';

/**
 * Validation schema for username and password fields
 */
export const authSchema = yup.object({
  /**
   * Username field validation
   * - Must contain only English letters, numbers, underscores, or hyphens
   * - Must be between 3 and 20 characters
   * - Required
   */
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]{3,20}$/, 'Username can only contain English letters, numbers, _, or -, and must be 3-20 characters')
    .required('Username is required'),
  /**
   * Password field validation
   * - Minimum 8 characters
   * - Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
   * - Required
   */
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
}).required();