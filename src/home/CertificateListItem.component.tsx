import React from 'react';
import {Certificate} from '../model/certificate';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatDateAndTime} from '../services/date-service';

interface Props {
  certificate: Certificate;
  onCertificateSelected: (c: Certificate) => () => void;
}

export function CertificateListItem({
  certificate,
  onCertificateSelected,
}: Props) {
  return (
    <View>
      <TouchableOpacity onPress={onCertificateSelected(certificate)}>
        <Text>
          {certificate.firstName} {certificate.lastName}
        </Text>
        <Text>Sortie le {formatDateAndTime(certificate.releaseDate)}</Text>
        <Text>Motif(s): {certificate.reasons.join(', ')}</Text>
      </TouchableOpacity>
    </View>
  );
}
