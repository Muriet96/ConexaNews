import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Text, TextInput, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useUsers } from '@features/users/hooks/useUsers';
import { useDispatch } from 'react-redux';
import { login } from '../settingsSlice';

const LoginScreen = () => {
  const { t } = useTranslation('settings');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const { data: users, isLoading } = useUsers();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === '' || password === '') {
      setError(t('fillAllFields'));
      return;
    }
    const user = users && users.find(
      u => u.login?.username === username && u.login?.password === password
    );
    if (user) {
      dispatch(login(user));
      setError('');
    } else {
      setError(t('invalidCredentials'));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      testID="login-keyboard-avoiding-view"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={styles.container}>
          <Text style={styles.title}>{t('loginTitle')}</Text>
          <TextInput
            label={t('username')}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            error={!!error}
            testID="username-input"
          />
          <TextInput
            label={t('password')}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(prev => !prev)}
                testID="toggle-password-visibility"
              />
            }
            error={!!error}
            testID="password-input"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleLogin}
            loading={isLoading}
            testID="login-button"
          >
            {t('login')}
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: { fontSize: 22, marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 12, alignSelf: 'stretch' },
  button: { marginTop: 8, alignSelf: 'stretch' },
  error: { color: '#ff4d4f', marginBottom: 12 },
});

export default LoginScreen;