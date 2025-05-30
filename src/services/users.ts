import axios from 'axios';
import { User } from '@features/users/types';
import {API_USERS_ENDPOINT} from '../constants/api';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_USERS_ENDPOINT);
  return response.data;
};