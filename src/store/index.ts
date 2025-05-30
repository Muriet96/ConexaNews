import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '@features/news/newsSlice';
import usersReducer from '@features/users/userSlice';
import settingsReducer from '@features/settings/settingsSlice';
import { favoritesMiddleware } from './middlewares/favoritesMiddleware';
import { loginMiddleware } from './middlewares/loginMiddleware';
import { languageMiddleware } from './middlewares/languageMiddleware';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    users: usersReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(favoritesMiddleware, loginMiddleware, languageMiddleware)
});

export type AppDispatch = typeof store.dispatch;