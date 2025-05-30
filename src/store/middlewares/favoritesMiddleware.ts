import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { toggleFavorite } from '@features/news/newsSlice';

export const favoritesMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (toggleFavorite.match(action)) {
    const favorites = store.getState().news.favorites;
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return result;
};