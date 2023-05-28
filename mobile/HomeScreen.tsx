import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Bem-vindo à aplicação mobile!</Text>
      <Button title="Cadastrar" onPress={() => {}} />
      <Button title="Excluir" onPress={() => {}} />
      <Button title="Editar" onPress={() => {}} />
      <Button title="Pesquisar" onPress={() => {}} />
    </View>
  );
};

export default HomeScreen;
