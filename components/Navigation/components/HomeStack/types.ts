import { SCREENS } from './constants';

export type HomeStackParamList = {
  [SCREENS.ActiveOrder]: undefined;
  [SCREENS.ActiveOrderDetail]: {
    orderId: string;
  };
  [SCREENS.CreateOrder]: undefined;
};
