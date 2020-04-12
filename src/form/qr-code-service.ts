import { CertificateData } from "./certificate-service";

const qrImage = require("qr-image");

export async function generateQrCode(certificateData: CertificateData) {
  const { user, reason, creationDate } = certificateData;
  const qrText = [
    `Cree le ${creationDate}`,
    `Nom: ${user.lastName}`,
    `Prenom: ${user.firstName}`,
    `Naissance: ${user.birthDate} a ${user.birthLocation}`,
    `Adresse: ${user.address} ${user.zipCode} ${user.town}`,
    `Sortie: ${reason.releaseDate} a ${reason.releaseHours}h${reason.releaseMinutes}`,
    `Motifs: ${reason.reasons.join("-")}`,
  ].join("; ");
  console.log(qrText);
  const qrOptions = {
    ec_level: 'M',
    type: 'png',
    margin: 1,
  };
  const imageBytes = qrImage.imageSync(qrText, qrOptions);
  return `data:image/png;base64,${imageBytes.toString('base64')}`;
}
