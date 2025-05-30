import axios from 'axios';
import { fetchUsers } from '../users';
import { API_USERS_ENDPOINT } from '../../constants/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchUsers', () => {
  it('should fetch users from API and return data', async () => {
    const mockUsers = [{ id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', phone: '', login: { uuid: '', username: '', password: '' } }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await fetchUsers();
    expect(mockedAxios.get).toHaveBeenCalledWith(API_USERS_ENDPOINT);
    expect(result).toEqual(mockUsers);
  });
});