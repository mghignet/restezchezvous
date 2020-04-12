import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CertificateReaderContainer} from './src/form/CertificateReader.container';
import moment from 'moment'

export interface User {
  firstName: string;
  lastName: string;
  birthday: string;
  birthLocation: string;
  address: string;
  zipCode: string;
  town: string;
}

export interface CertificateReason {
  reasons: string[];
  releaseDate: string;
  releaseHours: string;
  releaseMinutes: string;
}

export default function App() {
  const user: User = {
    firstName: 'Jean',
    lastName: 'Valjean',
    birthday: '18/12/1990',
    birthLocation: 'Sainte-Catherine',
    address: '46 Rue des stations',
    zipCode: '59800',
    town: 'Lille',
  };

  const reason = {
    reasons: ['travail', 'courses'],
    releaseDate: "01/04/2020",
    releaseHours: "15",
    releaseMinutes: "30",
  };

  return (
    <View style={styles.container}>
      <CertificateReaderContainer user={user} reason={reason} />
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
