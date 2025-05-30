import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/users';
import { useDispatch } from 'react-redux';
import { setUsers } from '../userSlice';
import { useEffect } from 'react';
import { User } from '../types';

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