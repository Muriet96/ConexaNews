import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsListScreen from '@features/news/screens/NewsListScreen';
import NewsDetailScreen from '@features/news/screens/NewsDetailScreen';
import UserListScreen from '@features/users/screens/UserListScreen';
import SettingsScreen from '@features/settings/screens/SettingsScreen';
import LoginScreen from '@features/settings/screens/LoginScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewsStackParamList, RootTabParamList } from './types';
import { useDispatch } from 'react-redux';
import { setLanguage, login } from '@features/settings/settingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettings } from '@features/settings/hooks/useSettings';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const NewsStack = createStackNavigator<NewsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function NewsStackNavigator() {
  const theme = useTheme();
  const { t } = useTranslation('common');
  return (
    <NewsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
      }}
    >
      <NewsStack.Screen
        name="NewsList"
        component={NewsListScreen}
        options={{ title: t('latestNews') }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={({ route }) => ({
          title: route.params?.title ?? t('detail'),
          headerBackButtonDisplayMode: 'minimal',
        })}
      />
    </NewsStack.Navigator>
  );
}

function MainTabs() {
  const theme = useTheme();
  const { t } = useTranslation('common');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'News') {
            return <MaterialCommunityIcons name="newspaper" color={color} size={size} />;
          }
          if (route.name === 'Users') {
            return <MaterialCommunityIcons name="account-group" color={color} size={size} />;
          }
          if (route.name === 'Settings') {
            return <MaterialCommunityIcons name="cog" color={color} size={size} />;
          }
          return null;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen
        name="News"
        component={NewsStackNavigator}
        options={{ title: t('news'), headerShown: false }}
      />
      <Tab.Screen
        name="Users"
        component={UserListScreen}
        options={{ title: t('users'), headerShown: true }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('settings'), headerShown: true }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const { isAuthenticated } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      const userStr = await AsyncStorage.getItem('user');
      const isAuth = await AsyncStorage.getItem('isAuthenticated');
      const lang = await AsyncStorage.getItem('language');
      if (userStr && isAuth === 'true') {
        dispatch(login(JSON.parse(userStr)));
      }
      if (lang) {
        dispatch(setLanguage(lang));
      }
    };
    restoreAuth();
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <MainTabs />;
};

export default AppNavigator;