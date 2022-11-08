import { useQuery } from '@tanstack/react-query';
import { Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

import OrderService from '../../../../services/OrderService';

export default function ActiveOrderDetail({ route }) {
  const { orderId } = route.params;

  const { data, isLoading } = useQuery(['currentOrder', orderId], () =>
    OrderService.getOrderById(orderId)
  );

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (data?.data) {
    return (
      <SafeAreaView>
        <Text>Pedido: {data.data.id_pedidos}</Text>
        {data.data.menu_pedido.map((item) => (
          <>
            <Text>Plato: {item.plato}</Text>
            <Text>Porciones: {item.porciones}</Text>
            <Text>Total: {item.total}</Text>
          </>
        ))}
        <Text>Estado: {data.data.estados_pedido}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Algo no está bien</Text>
    </SafeAreaView>
  );
}
