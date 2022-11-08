import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Input, Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, FlatList, ScrollView } from 'react-native';

import { UserContext } from '../../context/UserContext';
import OrderService from '../../services/OrderService';
import { OrderDataRequest } from '../../types/Order';
import { Plate } from '../../types/Plate';
import styles from './styles';

export default function CreateOrder() {
  const userContext = useContext(UserContext);
  const { control, handleSubmit } = useForm<OrderDataRequest>();
  const date = new Date();
  const transformedDate = format(date, 'dd/MM/yyyy').replaceAll('/', '-');

  const { data, isLoading: loadingPlates } = useQuery(['plates', transformedDate], () =>
    OrderService.getPlates(transformedDate)
  );

  const { isLoading: platePostIsLoading, mutate: mutatePlate } = useMutation(
    OrderService.addPlates,
    {
      onSuccess: (response) => {
        if (response.data) {
          console.log(response.data);
        }
      },
    }
  );

  const { isLoading, mutate } = useMutation(OrderService.createOrder, {
    onSuccess: (response) => {
      if (response.data) {
        mutatePlate([
          {
            id_pedido_mobile: response.data.toString(),
            id_menuMobile: '0c6f8a8e-d369-46f9-90cf-98045bcf0925',
            cantidad: 9,
          },
          {
            id_pedido_mobile: response.data.toString(),
            id_menuMobile: 'e473da03-8138-45c3-ae08-67a3e6d70ac1',
            cantidad: 2,
          },
        ]);
      }
    },
  });

  const handleOrderCreation = (data: OrderDataRequest) => {
    const date = new Date();

    mutate({
      userId: userContext?.user.id_usuario || '',
      orderData: {
        id_metodo_pago: 3,
        id_metodo_busqueda: 1,
        direccion: data.direccion,
        id_estado_pedido: 1,
        fecha: format(date, 'dd/MM/yyyy').replaceAll('/', '-'),
        hora: `${date.getHours()}:${date.getMinutes()}`,
      },
    });
  };

  const renderItem = ({ item }: { item: Plate }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text>{item.plato}</Text>
          <Text>{item.informacion_plato}</Text>
        </View>
        <Image
          source={{
            uri: item.url_foto_menu,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.row}>
        <Text>${item.precio}</Text>
        <View>
          <Text>-</Text>
          <Text>0</Text>
          <Text>+</Text>
        </View>
      </View>
    </View>
  );

  if (loadingPlates) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView>
      <Text>Platos</Text>
      {data?.data && data?.data.length > 0 ? (
        <FlatList
          data={data?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.listContainer}
          scrollEnabled={false}
        />
      ) : (
        <Text>Los platos no cargaron :/</Text>
      )}
      <Controller
        control={control}
        name="direccion"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            placeholder="Dirección"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'La direccion es obligatoria',
          },
        }}
      />
      <Button onPress={handleSubmit(handleOrderCreation)}>
        {isLoading || platePostIsLoading ? 'Cargando...' : 'Crear pedido'}
      </Button>
    </ScrollView>
  );
}
