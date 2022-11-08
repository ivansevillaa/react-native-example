import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ActiveOrder from '../../../../screens/ActiveOrder';
import ActiveOrderDetail from '../../../../screens/ActiveOrder/screens/ActiveOrderDetail';
import CreateOrder from '../../../../screens/CreateOrder';
import {
  HOME_SCREEN_OPTIONS,
  CREATE_ORDER_SCREEN_OPTIONS,
  SCREENS,
  CURRENT_ORDER_SCREEN_OPTIONS,
} from './constants';
import { HomeStackParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={SCREENS.ActiveOrder}
        options={HOME_SCREEN_OPTIONS}
        component={ActiveOrder}
      />
      <HomeStack.Screen
        name={SCREENS.ActiveOrderDetail}
        options={CURRENT_ORDER_SCREEN_OPTIONS}
        component={ActiveOrderDetail}
      />
      <HomeStack.Screen
        name={SCREENS.CreateOrder}
        options={CREATE_ORDER_SCREEN_OPTIONS}
        component={CreateOrder}
      />
    </HomeStack.Navigator>
  );
}
