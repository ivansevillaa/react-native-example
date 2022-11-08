import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from '../../../../screens/OrderList';
import OrderDetail from '../../../../screens/OrderList/screens/OrderDetail';
import OrderReceipt from '../../../../screens/OrderList/screens/OrderDetail/screens/OrderReceipt';
import { SCREENS } from './constants';
import { OrderListStackParamList } from './types';

const OrderStack = createNativeStackNavigator<OrderListStackParamList>();

export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name={SCREENS.OrderList} component={OrderList} />
      <OrderStack.Screen name={SCREENS.OrderDetail} component={OrderDetail} />
      <OrderStack.Screen name={SCREENS.OrderReceipt} component={OrderReceipt} />
    </OrderStack.Navigator>
  );
}
