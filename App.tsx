import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from "./src/form/form.component";

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Générateur d'attestation Covid-19</Text>
        <Form/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
