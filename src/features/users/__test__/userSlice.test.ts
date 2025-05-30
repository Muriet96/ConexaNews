import userReducer, { setUsers } from '../userSlice';
import { User } from '../types';

describe('userSlice', () => {
  const initialState = { users: [] };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUsers', () => {
    const mockUsers: User[] = [
      { id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', phone: '', login: { uuid: '', username: '', password: '' } }
    ];
    const state = userReducer(initialState, setUsers(mockUsers));
    expect(state.users).toEqual(mockUsers);
  });
});