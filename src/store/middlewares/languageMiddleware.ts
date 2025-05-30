import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { setLanguage } from '@features/settings/settingsSlice';

export const languageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (setLanguage.match(action)) {
    AsyncStorage.setItem('language', action.payload);
  }

  return result;
};