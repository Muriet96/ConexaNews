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
    setNews: (state, action: PayloadAction<Post[]>) => {
      state.news = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      state.favorites = exists
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    loadFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
  },
});

export default newsSlice.reducer;
export const { setNews, toggleFavorite, setSearchQuery, loadFavorites } = newsSlice.actions;