import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {generateCertificateAsBase64} from './certificate-service';
import {User} from '../model/user';
import {CertificateReason} from '../model/certificate-reason';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import Pdf from 'react-native-pdf';

interface Props {
  user: User;
  reason: CertificateReason;
}

type RootStackParamList = {Props: Props};

type NavigationProps = {
  route: RouteProp<RootStackParamList, 'Props'>;
  navigation: StackNavigationProp<RootStackParamList, 'Props'>;
};

export function CertificateReader({route}: NavigationProps) {
  const {user, reason}: Props = route.params;
  const [certificate, setCertificate] = React.useState();

  React.useEffect(() => {
    async function generateCertificate() {
      const generatedCertificate = await generateCertificateAsBase64(
        user,
        reason,
      );
      setCertificate({uri: generatedCertificate});
    }

    generateCertificate();
  }, []);

  return (
    <View style={styles.container}>
      {certificate && <Pdf source={certificate} style={styles.pdf} />}
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
