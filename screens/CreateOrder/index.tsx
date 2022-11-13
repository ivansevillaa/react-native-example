import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Input, Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import React, { useContext, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, ScrollView } from 'react-native';

import { UserContext } from '../../context/UserContext';
import OrderService from '../../services/OrderService';
import { OrderDataRequest } from '../../types/Order';
import { Plate } from '../../types/Plate';
import styles from './styles';

const countReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PLATE': {
      return {
        ...state,
        [action.payload.menu]: action.payload.count,
      };
    }
  }
};

export default function CreateOrder() {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(countReducer, {});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderDataRequest>();
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
        const plates = [];
        for (const idMenu in state) {
          plates.push({
            id_pedido_mobile: response.data.toString(),
            id_menuMobile: idMenu,
            cantidad: state[idMenu],
          });
        }
        mutatePlate(plates);
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

  if (loadingPlates) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView>
      <Controller
        control={control}
        name="direccion"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            placeholder="Dirección"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'La direccion es obligatoria',
          },
        }}
      />
      {errors.direccion && <Text style={styles.errorMessage}>{errors.direccion.message}</Text>}
      <View style={styles.listContainer}>
        {data?.data && data?.data.length > 0 ? (
          data.data?.map((item, index) => {
            return (
              <View>
                <RenderItem key={index} item={item} dispatch={dispatch} />
                {index + 1 !== data.data?.length && <View style={styles.separator} />}
              </View>
            );
          })
        ) : (
          <Text>Los platos no cargaron :/</Text>
        )}
      </View>
      <Button onPress={handleSubmit(handleOrderCreation)}>
        {isLoading || platePostIsLoading ? 'Cargando...' : 'Crear pedido'}
      </Button>
    </ScrollView>
  );
}

const RenderItem = ({ item, dispatch }: { item: Plate }) => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      dispatch({ type: 'UPDATE_PLATE', payload: { menu: item.id_MenuMobile, count: count - 1 } });
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
    dispatch({ type: 'UPDATE_PLATE', payload: { menu: item.id_MenuMobile, count: count + 1 } });
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.plato}</Text>
          <Text style={styles.text}>{item.informacion_plato}</Text>
        </View>
        <Image
          source={{
            uri: item.url_foto_menu,
          }}
          style={styles.image}
        />
      </View>
      <View style={{ ...styles.row, ...styles.bottom }}>
        <Text style={styles.title}>${item.precio}</Text>
        <View style={{ ...styles.row, ...styles.counter }}>
          <Text style={styles.countBtn} onPress={handleDecrement}>
            -
          </Text>
          <Text style={styles.count}>{count}</Text>
          <Text style={styles.countBtn} onPress={handleIncrement}>
            +
          </Text>
        </View>
      </View>
    </View>
  );
};
