import { View, Text } from 'react-native';

export default function OrderReceipt({ route }) {
  const { orderId } = route.params;

  return (
    <View>
      <Text>Factura {orderId}</Text>
    </View>
  );
}
