import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { login, logout, setLanguage } from '../settingsSlice';
import { User } from '@features/users/types';

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