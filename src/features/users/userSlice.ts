/**
 * Redux slice for managing the users state.
 *
 * @module userSlice
 * @remarks
 * - Stores the list of users fetched from the API.
 * - Provides actions and reducer for updating user data.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Sets the list of users in the state.
     *
     * @param {UsersState} state - The current state.
     * @param {PayloadAction<User[]>} action - The action containing the new users array.
     */
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;