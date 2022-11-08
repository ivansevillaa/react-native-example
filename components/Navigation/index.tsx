import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { UserContext } from '../../context/UserContext';
import Login from '../../screens/Login';
import HomeStack from './components/HomeStack';
import OrderStack from './components/OrderStack';
import { SCREEN_OPTIONS, ROUTES, HOME_TAB_OPTIONS, ORDER_TAB_OPTIONS } from './constants';
import { AuthStackParamList, RootNavigationParamList } from './types';

const Tab = createBottomTabNavigator<RootNavigationParamList>();
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function App() {
  const userContext = useContext(UserContext);

  return userContext?.user.id_usuario ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...SCREEN_OPTIONS,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'home' | 'receipt' = 'home';

          if (route.name === ROUTES.HomeScreen) {
            iconName = 'home';
          } else if (route.name === ROUTES.OrderScreen) {
            iconName = 'receipt';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={ROUTES.HomeScreen} options={HOME_TAB_OPTIONS} component={HomeStack} />
      <Tab.Screen name={ROUTES.OrderScreen} options={ORDER_TAB_OPTIONS} component={OrderStack} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name={ROUTES.LoginScreen} component={Login} />
    </Stack.Navigator>
  );
}
