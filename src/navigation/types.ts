import { NavigatorScreenParams } from '@react-navigation/native';

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: { id: number, title: string };
};

export type RootTabParamList = {
  News: NavigatorScreenParams<NewsStackParamList>;
  Users: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}