import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Credits() {
  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Chers utilisateurs,
      </Text>
      <Text style={styles.textBlock}>
        Cette application a été créée avec ♥ pour passer cette étape difficile. Elle est entièrement gratuite.
      </Text>
      <Text style={styles.textBlock}>
        Elle reproduit à l'identique l'attestation demandée par les forces de
        l'ordre (version en vigueur à la date du 13 Avril 2020), ainsi que son QR Code.
      </Text>
      <Text style={styles.textBlock}>
        Faites en bon usage, et surtout, utilisez-la le moins possible ! <Text style={styles.boldText}>#restezChezVous</Text>
      </Text>
      <Text style={styles.signature}>
        Maxime Ghignet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#EEE',
    flex: 1,
  },
  intro: {
    marginBottom: 12,
    color: '#999',
    alignSelf: 'flex-start',
  },
  textBlock: {
    marginTop: 24,
    color: '#999',
  },
  boldText: {
    fontWeight: 'bold',
  },
  signature: {
    marginTop: 36,
    color: '#999',
    alignSelf: 'flex-end',
  }
});
