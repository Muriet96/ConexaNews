import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { login, logout } from '@features/settings/settingsSlice';

export const loginMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (login.match(action)) {
    const user = store.getState().settings.user;
    AsyncStorage.setItem('user', JSON.stringify(user));
    AsyncStorage.setItem('isAuthenticated', 'true');
  }

  if (logout.match(action)) {
    AsyncStorage.removeItem('user');
    AsyncStorage.setItem('isAuthenticated', 'false');
  }

  return result;
};