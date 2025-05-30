import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { login, logout, setLanguage } from '../settingsSlice';
import { User } from '@features/users/types';

/**
 * Custom React hook that provides access to settings-related state and actions.
 *
 * This hook exposes the current authentication status, selected language, and user information
 * from the Redux store, as well as dispatchable actions for logging in, logging out, and changing the language.
 *
 * @returns An object containing:
 * - `isAuthenticated`: A boolean indicating if the user is authenticated.
 * - `language`: The currently selected language as a string.
 * - `user`: The current user object.
 * - `login`: A function to log in a user.
 * - `logout`: A function to log out the current user.
 * - `setLanguage`: A function to change the application's language.
 */
export const useSettings = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, language, user } = useSelector((state: RootState) => state.settings);

  return {
    isAuthenticated,
    language,
    user,
    login: (user: User) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    setLanguage: (lang: string) => dispatch(setLanguage(lang)),
  };
};