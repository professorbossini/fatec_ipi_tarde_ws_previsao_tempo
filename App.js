import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Keyboard } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {

  const endpoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const apiKey = '';
  const [cidade, setCidade] = useState('');
  const capturarCidade = (cidade) => {
    setCidade(cidade)
  }

  const [previsoes, setPrevisoes] = useState([]);

  const obtemPrevisoes = () => {
    setPrevisoes([]);
    const target = endpoint + cidade + "&appid=" + apiKey;
    fetch(target).
      then((dados => dados.json())).
      then(dados => {
        setPrevisoes(dados['list'])
        Keyboard.dismiss()
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nomeCidade}
        placeholder="Digite o nome da cidade"
        value={cidade}
        onChangeText={capturarCidade}
      />
      <Button
        title="OK"
        onPress={obtemPrevisoes} />

      <FlatList
        data={previsoes}
        renderItem={
          previsao => (
            <PrevisaoItem previsao={previsao}></PrevisaoItem>
          )
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    marginBottom: 4,
    textAlign: 'center'
  }
});
