import axios from 'axios';
import { User } from '@features/users/types';
import {API_USERS_ENDPOINT} from '../constants/api';

/**
 * Fetches a list of users from the API.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 * @throws {AxiosError} Throws if the HTTP request fails.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_USERS_ENDPOINT);
  return response.data;
};