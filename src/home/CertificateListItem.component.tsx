import React from 'react';
import {Certificate} from '../models/certificate';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {formatDateAndTime} from '../services/date.service';
import {isExpired} from '../services/certificate.service';

interface Props {
  certificate: Certificate;
  onCertificateSelected: (c: Certificate) => () => void;
}

export function CertificateListItem({
  certificate,
  onCertificateSelected,
}: Props) {
  const isCertificateExpired = isExpired(certificate);
  return (
    // @ts-ignore
    <View opacity={isCertificateExpired ? 0.3 : 1}>
      <TouchableOpacity
        style={styles.container}
        onPress={onCertificateSelected(certificate)}>
        <Text>
          {isCertificateExpired && "(Expiré)"} {certificate.firstName} {certificate.lastName}
        </Text>
        <Text>
          {certificate.address} {certificate.zipCode} {certificate.town}
        </Text>
        <Text>Sortie le {formatDateAndTime(certificate.releaseDate)}</Text>
        <Text>Motif(s): {certificate.releaseReasons.join(', ')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
