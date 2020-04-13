import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Certificate} from 'src/models/certificate';
import {CertificateListItem} from './CertificateListItem.component';

interface Props {
  certificate?: Certificate;
  onCertificateCreateAction: () => void;
  onCertificateSelected: (c: Certificate) => () => void;
}

export function CertificateSummary({
  certificate,
  onCertificateCreateAction,
  onCertificateSelected,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Mon attestation</Text>
      {certificate == null && (
        <>
          <Text>Vous n'avez aucune attestation en cours de validité.</Text>
        </>
      )}
      {certificate != null && (
        <CertificateListItem
          certificate={certificate}
          onCertificateSelected={(c: Certificate) => onCertificateSelected(c)}
        />
      )}
      <View style={styles.button}>
        <Button
          title={'Créer une nouvelle attestation'}
          onPress={onCertificateCreateAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
  },
});
