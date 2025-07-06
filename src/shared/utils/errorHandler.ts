/**
 * Utility functions for handling API errors and displaying toast notifications.
 */
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Interface for API error response
 */
export interface IErrResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

/**
 * Interface for API error object
 */
export interface ApiError {
  message: string;
  status?: number;
  response?: IErrResponse;
}

/**
 * Handles API errors and displays a toast notification
 * @param error - The error object (e.g., from Axios)
 * @param defaultMessage - Default message to display if no specific message is found
 * @returns An ApiError object with message, status, and response details
 */
export const handleApiError = (error: unknown, defaultMessage: string): ApiError => {
  let message = defaultMessage;
  let status: number | undefined;
  let response: IErrResponse | undefined;

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.status_message || defaultMessage;
    status = error.response?.status;
    response = error.response?.data;
  }

  toast.error(`${message}${status ? ` (Status: ${status})` : ''}`);

  return { message, status, response };
};