import { useQuery } from '@tanstack/react-query';
import { Text, Button } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { FlatList, SafeAreaView, View, Image, TouchableWithoutFeedback } from 'react-native';

import { SCREENS } from '../../components/Navigation/components/OrderStack/constants';
import { UserContext } from '../../context/UserContext';
import OrderService from '../../services/OrderService';
import { Order } from '../../types/Order';
import styles from './styles';

export default function OrderList({ navigation }) {
  const user = useContext(UserContext);
  const userId = user?.user.id_usuario;

  const { data } = useQuery(['orders', userId], () => OrderService.getOrders(userId ?? ''));

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(SCREENS.OrderDetail, { orderId: item.id_pedidos })}>
      <View style={styles.card}>
        <View>
          <Image
            source={{
              uri: 'https://sentidos.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75',
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.status}>{item.estados_pedido.toUpperCase()}</Text>
          <View style={styles.date}>
            <Text style={styles.dateContent}>{item.fecha}</Text>
            <Text style={styles.dateContent}>·</Text>
            <Text style={styles.dateContent}>{item.hora} hs</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoContent}>${item.total}</Text>
            <Text style={styles.infoContent}>·</Text>
            {item.menu_pedido.length === 1 ? (
              <Text style={styles.infoContent}>{item.menu_pedido.length} producto</Text>
            ) : (
              <Text style={styles.infoContent}>{item.menu_pedido.length} productos</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      {data?.data ? (
        <FlatList
          data={data?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_pedidos}
          style={styles.listContainer}
        />
      ) : (
        <Text>No tenés pedidos realizados</Text>
      )}
    </SafeAreaView>
  );
}
