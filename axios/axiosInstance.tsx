import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Axios instance
const axiosInstance = axios.create({
  baseURL: "https://example-fko1.onrender.com/api" ||  "http://localhost:3233/api",
  timeout: 15000,
});

// Define the snackbar function reference type
type SnackbarFunc = (message: string, options?: { variant?: 'default' | 'error' | 'success' | 'warning' | 'info' }) => void;
const enqueueSnackbarRef: { current: SnackbarFunc | null } = { current: null };

// Login token, fallback to cookie
const loginToken: string | undefined =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdhMDU2Yzk5YjhlYzIwN2MxYWQ2NzYiLCJwaG9uZU51bWJlciI6Ijc5NzU2NzQ0MzkiLCJpYXQiOjE3NTI4Mjc3MTAsImV4cCI6MTc1NTcwNzcxMH0.Os27JCTyzHX34vodsBxEDocxU_50aJAhsn7h6zTCpUs" || Cookies.get('login_token');

// Set the snackbar function externally
export const setSnackbarFunction = (func: SnackbarFunc) => {
  enqueueSnackbarRef.current = func;
};

// Success handler
const handleSuccess = (response: AxiosResponse): any => {
  return response;
};

// Error handler
const handleError = (error: AxiosError): Promise<never> => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message;

  // Optional: Enable if you want toast notifications
  /*
  if (enqueueSnackbarRef.current) {
    if (status === 401) enqueueSnackbarRef.current("Unauthorized. Please log in.", { variant: 'error' });
    else if (status === 400) enqueueSnackbarRef.current("Bad request.", { variant: 'error' });
    else if (status === 403) enqueueSnackbarRef.current("Forbidden.", { variant: 'error' });
    else if (status === 404) enqueueSnackbarRef.current("Not found.", { variant: 'error' });
    else if (status === 500) enqueueSnackbarRef.current("Internal server error.", { variant: 'error' });
    else enqueueSnackbarRef.current(message, { variant: 'error' });
  }
  */

  return Promise.reject(error);
};

// Request interceptor: Adds token and headers
const updateRequestAndAddAuthToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = loginToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
};

// Register interceptors
axiosInstance.interceptors.request.use(updateRequestAndAddAuthToken, (error) => {
  console.error('Request Interceptor Error:', error);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export default axiosInstance;
