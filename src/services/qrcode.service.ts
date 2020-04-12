import { Certificate } from "../models/certificate";
import { formatDateAndTime } from "./date.service";

const qrImage = require("qr-image");

export async function generateQrCode(certificate: Certificate) {
  const qrText = [
    `Cree le ${certificate.creationDate}`,
    `Nom: ${certificate.lastName}`,
    `Prenom: ${certificate.firstName}`,
    `Naissance: ${certificate.birthDate} a ${certificate.birthLocation}`,
    `Adresse: ${certificate.address} ${certificate.zipCode} ${certificate.town}`,
    `Sortie: ${formatDateAndTime(certificate.releaseDate)}`,
    `Motifs: ${certificate.releaseReasons.join("-")}`,
  ].join("; ");
  const qrOptions = {
    ec_level: 'M',
    type: 'png',
    margin: 1,
  };
  const imageBytes = qrImage.imageSync(qrText, qrOptions);
  return `data:image/png;base64,${imageBytes.toString('base64')}`;
}
