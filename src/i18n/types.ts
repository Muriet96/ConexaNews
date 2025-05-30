import 'react-i18next';
import newsEn from '@features/news/i18n/en.json';
import newsEs from '@features/news/i18n/es.json';
import usersEn from '@features/users/i18n/en.json';
import usersEs from '@features/users/i18n/es.json';
import settingsEn from '@features/settings/i18n/en.json';
import settingsEs from '@features/settings/i18n/es.json';

type NewsTranslations = typeof newsEn;
type UsersTranslations = typeof usersEn;
type SettingsTranslations = typeof settingsEn;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'news';
    resources: {
      news: NewsTranslations;
      users: UsersTranslations;
      settings: SettingsTranslations;
    };
  }
}