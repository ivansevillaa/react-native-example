import { SCREENS } from './constants';

export type OrderListStackParamList = {
  [SCREENS.OrderList]: undefined;
  [SCREENS.OrderDetail]: {
    orderId: string;
  };
  [SCREENS.OrderReceipt]: {
    orderId: string;
  };
};
