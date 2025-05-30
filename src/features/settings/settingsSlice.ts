import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@features/users/types';

interface SettingsState {
  isAuthenticated: boolean;
  language: string;
  user: User | null;
}

const initialState: SettingsState = {
  isAuthenticated: false,
  language: 'es',
  user: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});





export default settingsSlice.reducer;
export const { login, logout, setLanguage } = settingsSlice.actions;