import React, { useState } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {generateCertificateAsBase64} from './certificate-service';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import Pdf from 'react-native-pdf';
import { Certificate } from "../model/certificate";

interface Props {
  certificate: Certificate;
}

type RootStackParamList = {Props: Props};

type NavigationProps = {
  route: RouteProp<RootStackParamList, 'Props'>;
  navigation: StackNavigationProp<RootStackParamList, 'Props'>;
};

export function CertificateReader({route}: NavigationProps) {
  const {certificate}: Props = route.params;
  const [pdfCertificate, setPdfCertificate] = useState();

  React.useEffect(() => {
    async function generateCertificate() {
      const generatedCertificate = await generateCertificateAsBase64(certificate);
      setPdfCertificate(generatedCertificate);
    }

    generateCertificate();
  }, []);

  return (
    <View style={styles.container}>
      {certificate && <Pdf source={{uri:pdfCertificate}} style={styles.pdf} />}
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
