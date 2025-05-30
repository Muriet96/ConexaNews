/**
 * Redux slice for managing news state.
 *
 * @module newsSlice
 * @remarks
 * - Stores the list of news articles fetched from the API.
 * - Manages favorite news IDs and search queries.
 * - Provides actions and reducer for updating news, favorites, and search state.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';

interface NewsState {
  news: Post[];
  favorites: number[];
  searchQuery: string;
}

const initialState: NewsState = {
  news: [],
  favorites: [],
  searchQuery: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    /**
     * Sets the list of news articles in the state.
     *
     * @param {NewsState} state - The current state.
     * @param {PayloadAction<Post[]>} action - The action containing the new news array.
     */
    setNews: (state, action: PayloadAction<Post[]>) => {
      state.news = action.payload;
    },
    /**
     * Toggles the favorite status of a news article by its ID.
     *
     * @param {NewsState} state - The current state.
     * @param {PayloadAction<number>} action - The action containing the news ID.
     */
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      state.favorites = exists
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id];
    },
    /**
     * Sets the current search query.
     *
     * @param {NewsState} state - The current state.
     * @param {PayloadAction<string>} action - The action containing the search query.
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    /**
     * Loads the list of favorite news IDs from storage.
     *
     * @param {NewsState} state - The current state.
     * @param {PayloadAction<number[]>} action - The action containing the favorite IDs.
     */
    loadFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
  },
});

export default newsSlice.reducer;
export const { setNews, toggleFavorite, setSearchQuery, loadFavorites } = newsSlice.actions;