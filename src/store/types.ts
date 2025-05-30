import { Post } from '@features/news/types';
import { User } from '@features/users/types';
import { SettingsState } from '@features/settings/types';

export type RootState = {
  news: NewsState;
  users: UsersState;
  settings: SettingsState;
};

export type NewsState = {
  news: Post[];
  favorites: number[];
  searchQuery: string;
};

export type UsersState = {
  users: User[];
};