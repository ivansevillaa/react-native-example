import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { Card, Button, List } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { SCREENS } from '../../components/Navigation/components/HomeStack/constants';
import { OrderListStackParamList } from '../../components/Navigation/components/OrderStack/types';
import { UserContext } from '../../context/UserContext';
import OrderService from '../../services/OrderService';
import { Order } from '../../types/Order';

interface Props {
  navigation: NativeStackScreenProps<OrderListStackParamList>;
}

export default function ActiveOrder({ navigation }: Props) {
  const user = useContext(UserContext);
  const userId = user?.user.id_usuario;

  const { data } = useQuery(['currentOrder', userId], () =>
    OrderService.getCurrentOrders(userId ?? '')
  );

  const renderItem = ({ item }: { item: Order }) => (
    <Card status="basic">
      <Text>{item.id_pedidos}</Text>
      <Button
        onPress={() =>
          navigation.navigate(SCREENS.ActiveOrderDetail, { orderId: item.id_pedidos })
        }>
        Ver detalle
      </Button>
    </Card>
  );

  return (
    <SafeAreaView>
      <Text>Datos del pedido actual</Text>
      {data?.data ? (
        <List style={styles.container} data={data?.data} renderItem={renderItem} />
      ) : (
        <Text>No tenés pedidos realizados</Text>
      )}
      <Button onPress={() => navigation.navigate(SCREENS.CreateOrder)}>Generar pedido</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
