import AsyncStorage from "@react-native-community/async-storage";
import { Certificate } from "../model/certificate";


export async function getCertificates() {
  const certificates = await AsyncStorage.getItem('certificates');
  // @ts-ignore
  return JSON.parse(certificates) || [];
}

export async function saveCertificate(certificate: Certificate) {
  const certificates = await getCertificates();
  certificates.unshift(certificate);
  return AsyncStorage.setItem('certificates', JSON.stringify(certificates));
}
