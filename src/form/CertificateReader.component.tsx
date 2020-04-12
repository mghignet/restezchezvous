import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

import Pdf from 'react-native-pdf';

interface Props {
  pdfFile: any;
}

export const CertificateReader: React.FC<Props> = ({pdfFile}) => {
  return (
    <View>
      <Pdf source={pdfFile} style={styles.pdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
