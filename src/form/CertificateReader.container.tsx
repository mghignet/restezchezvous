import React from 'react';
import {View} from 'react-native';
import {CertificateReader} from './CertificateReader.component';
import { Reason, User } from "../../App";
import { generateCertificateAsBase64 } from "./certificate-service";

interface Props {
  user: User,
  reason: Reason,
};

export const CertificateReaderContainer: React.FC<Props> = ({user, reason}) => {
  const [certificate, setCertificate] = React.useState();

  React.useEffect(() => {
    async function generateCertificate() {
      const generatedCertificate = await generateCertificateAsBase64(user, reason);
      setCertificate({uri: generatedCertificate});
    }
    generateCertificate();
  }, []);

  return (
    <View>
      {certificate && <CertificateReader pdfFile={certificate}></CertificateReader>}
    </View>
  );
};
