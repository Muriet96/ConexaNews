import { User } from "../users/types";

export interface SettingsState {
  isAuthenticated: boolean;
  language: string;
  user: User | null;
}