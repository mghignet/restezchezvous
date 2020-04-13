import AsyncStorage from "@react-native-community/async-storage";
import { Certificate } from "../models/certificate";


export async function getCertificate(): Promise<Certificate> {
  const certificates = await AsyncStorage.getItem('certificate');
  // @ts-ignore
  return JSON.parse(certificates);
}

export async function saveCertificate(certificate: Certificate) {
  return AsyncStorage.setItem('certificate', JSON.stringify(certificate));
}

// For debugging use only
async function deleteCertificates() {
  return AsyncStorage.removeItem('certificate');
}
