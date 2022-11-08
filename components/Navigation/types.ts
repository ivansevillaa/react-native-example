import { ROUTES } from './constants';

export type RootNavigationParamList = {
  [ROUTES.HomeScreen]: undefined;
  [ROUTES.OrderScreen]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.LoginScreen]: undefined;
};
