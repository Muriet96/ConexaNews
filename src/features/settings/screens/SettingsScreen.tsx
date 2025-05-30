import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Text, Surface, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';

/**
 * Displays the settings screen for the application.
 *
 * This screen allows the user to:
 * - View their profile information (first name, last name, email).
 * - Change the application language between Spanish and English.
 * - Log out of their account with a confirmation prompt.
 *
 * The component uses the `useTranslation` hook for internationalization,
 * and retrieves user data and logout functionality from the `useSettings` hook.
 *
 * UI elements include:
 * - User information (if available)
 * - Language selection via radio buttons
 * - Logout button (if user is logged in)
 *
 * @component
 */
const SettingsScreen = () => {
  const { t, i18n } = useTranslation('settings');
  const [lang, setLang] = React.useState(i18n.language);
  const { user, logout } = useSettings();

  const changeLanguage = (lng: string) => {
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    Alert.alert(
      t('logoutConfirmTitle'),
      t('logoutConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('confirm'), onPress: logout, style: 'destructive' }
      ]
    );
  };

  return (
    <Surface style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </>
      ) : (
        <Text testID="no-user-message">{t('noUserData')}</Text>
      )}
      <Text style={styles.label}>{t('language')}</Text>
      <RadioButton.Group onValueChange={changeLanguage} value={lang}>
        <RadioButton.Item label="Español" value="es" />
        <RadioButton.Item label="English" value="en" />
      </RadioButton.Group>
      {user && (
        <Button mode="outlined" style={styles.button} onPress={handleLogout}>
          {t('logout')}
        </Button>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: { margin: 24, padding: 24, borderRadius: 8, backgroundColor: '#fff' },
  title: { fontSize: 22, marginBottom: 4, textAlign: 'center', fontWeight: 'bold' },
  email: { fontSize: 16, marginBottom: 16, textAlign: 'center', color: '#666' },
  label: { marginTop: 12, marginBottom: 4 },
  button: { marginTop: 24 },
});

export default SettingsScreen;