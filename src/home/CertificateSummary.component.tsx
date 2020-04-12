import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Certificate} from 'src/model/certificate';
import {CertificateListItem} from './CertificateListItem.component';

interface Props {
  certificates: Certificate[];
  onCertificateCreateAction: () => void;
  onCertificateSelected: (c: Certificate) => () => void;
}

export function CertificateSummary({
  certificates,
  onCertificateCreateAction,
  onCertificateSelected,
}: Props) {
  const certificateElements = certificates.map((c: Certificate) => {
    return (
      <CertificateListItem
        key={`${c.creationDate}}`}
        certificate={c}
        onCertificateSelected={(c:Certificate) => onCertificateSelected(c)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Mes attestations</Text>
      {certificates.length == 0 && (
        <>
          <Text>
            Vous n'avez aucune attestation en cours de validité.
          </Text>
        </>
      )}
      {certificateElements}
      <View style={styles.button}>
        <Button
          title={'Créer une attestation'}
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
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
  },
});
