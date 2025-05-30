import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, ActivityIndicator, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { useUsers } from '../hooks/useUsers';

/**
 * Displays a list of users fetched from the store or API.
 *
 * Handles loading and error states, and renders a list of user cards with their details.
 * If the list is empty, shows a localized empty message.
 *
 * @component
 * @returns {JSX.Element} The rendered user list screen.
 *
 * @remarks
 * - Uses translations from the 'users' namespace.
 * - Fetches users using a custom hook and Redux state.
 * - Shows loading and error indicators as appropriate.
 */
const UserListScreen = () => {
  const { t } = useTranslation('users');
  const { data: users, isLoading, error } = useUsers();
  const userList = useSelector((state: RootState) => state.users.users);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" testID="loading-message" />
        <Text>{t('loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center} testID="error-message">
        <Text>{t('error')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userList}
      renderItem={({ item }) => (
        <Surface style={styles.userCard}>
          <Text style={styles.userName}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userPhone}>{item.phone}</Text>
        </Surface>
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <Text style={styles.emptyText} testID="empty-list-message">{t('emptyList')}</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
    marginBottom: 3,
  },
  userPhone: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default UserListScreen;