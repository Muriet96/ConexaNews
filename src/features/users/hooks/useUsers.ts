import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/users';
import { useDispatch } from 'react-redux';
import { setUsers } from '../userSlice';
import { useEffect } from 'react';
import { User } from '../types';

/**
 * Custom React hook to fetch and manage the list of users.
 *
 * This hook uses React Query to asynchronously fetch users and dispatches
 * the fetched data to the Redux store when available.
 *
 * @returns {UseQueryResult<User[], Error>} The query object returned by React Query,
 * including status, data, error, and other query state.
 *
 * @example
 * const usersQuery = useUsers();
 * if (usersQuery.isLoading) return <div>Loading...</div>;
 * if (usersQuery.error) return <div>Error!</div>;
 * return <UserList users={usersQuery.data} />;
 */
export const useUsers = () => {
  const dispatch = useDispatch();
  const query = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setUsers(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};