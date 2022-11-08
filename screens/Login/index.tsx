import { useMutation } from '@tanstack/react-query';
import { Text, Button, Input } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { SafeAreaView, View, Image } from 'react-native';

import { UserContext } from '../../context/UserContext';
import AuthService from '../../services/AuthService';
import { UserDataRequest } from '../../types/User';
import styles from './styles';

export default function Login() {
  const userContext = useContext(UserContext);
  const { control, handleSubmit } = useForm<UserDataRequest>();

  const { isLoading, mutate } = useMutation(AuthService.login, {
    onSuccess: (response) => {
      if (response.data) {
        userContext?.setUser(response.data);
      }
    },
  });

  const handleLogin: SubmitHandler<UserDataRequest> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Text category="h1">Iniciar sesión</Text> */}
        <Image
          source={{
            uri: 'https://sentidos.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'El email es obligatorio',
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Contraseña"
                textContentType="password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'La contraseña es obligatoria',
              },
            }}
          />
        </View>
        <Button onPress={handleSubmit(handleLogin)}>
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </View>
    </SafeAreaView>
  );
}
