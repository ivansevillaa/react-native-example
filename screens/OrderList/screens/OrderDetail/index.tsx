import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@ui-kitten/components';
import { SafeAreaView, View, Image, FlatList, ScrollView } from 'react-native';

import { SCREENS } from '../../../../components/Navigation/components/OrderStack/constants';
import OrderService from '../../../../services/OrderService';
import { OrderPlate } from '../../../../types/Order';
import styles from './styles';

export default function OrderDetail({ route, navigation }) {
  const { orderId } = route.params;

  const { data, isLoading } = useQuery(['order', orderId], () =>
    OrderService.getOrderById(orderId)
  );

  const renderItem = ({ item }: { item: OrderPlate }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.urlfoto,
        }}
        style={styles.image}
      />
      <Text>{item.porciones}</Text>
      <Text style={styles.plate}>{item.plato}</Text>
      <Text>${item.total}</Text>
    </View>
  );

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (data?.data) {
    return (
      <ScrollView>
        <FlatList
          data={data?.data.menu_pedido}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.listContainer}
          scrollEnabled={false}
        />
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Resumen</Text>
          <View style={styles.infoCardContainer}>
            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text>${data.data.total}</Text>
            </View>
            <View style={styles.row}>
              <Text>Envío</Text>
              <Text>$150</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>${data.data.total + 150}</Text>
            </View>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Formas de pago</Text>
          <View style={{ ...styles.infoCardContainer, ...styles.payment }}>
            <EvilIcons name="credit-card" size={32} color="black" />
            <Text>{data.data.metodo_de_pago}</Text>
          </View>
          <View style={{ ...styles.infoCardContainer, ...styles.receiptContainer }}>
            <View style={styles.payment}>
              <Ionicons name="receipt-outline" size={24} color="black" />
              <Text style={styles.receipt}>Tu Factura</Text>
            </View>
            <Text
              style={styles.receiptLink}
              onPress={() =>
                navigation.navigate(SCREENS.OrderReceipt, { orderId: data.data?.id_pedidos })
              }>
              Ver factura
            </Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Dirección de entrega</Text>
          <View style={styles.infoCardContainer}>
            <Text style={styles.nickname}>{data.data.nickname}</Text>
            <Text>{data.data.direccion}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Algo no está bien</Text>
    </SafeAreaView>
  );
}
