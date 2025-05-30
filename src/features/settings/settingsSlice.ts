/**
 * Redux slice for managing authentication and settings state.
 *
 * @module settingsSlice
 * @remarks
 * - Handles user authentication (login/logout).
 * - Stores the current language and user data.
 * - Provides actions and reducer for updating settings.
 */

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
    /**
     * Logs in the user and updates authentication state.
     *
     * @param {SettingsState} state - The current state.
     * @param {PayloadAction<User>} action - The action containing the user object.
     */
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    /**
     * Logs out the user and resets authentication state.
     *
     * @param {SettingsState} state - The current state.
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    /**
     * Sets the current language.
     *
     * @param {SettingsState} state - The current state.
     * @param {PayloadAction<string>} action - The action containing the new language code.
     */
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const { login, logout, setLanguage } = settingsSlice.actions;