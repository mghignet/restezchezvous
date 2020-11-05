import {PDFDocument, StandardFonts} from 'pdf-lib';
import {generateQrCode} from './qrcode.service';
import {
  formatDateAndTime,
  formatDateOnly,
  formatTimeOnly,
  formatMinutesOnly,
} from './date.service';
import {ReleaseReasons} from '../models/release-reason';
import {Certificate} from '../models/certificate';
import rawPdfCertificate from '../assets/pdf-certificate.base64';
import moment from 'moment';

export function isExpired(certificate: Certificate) {
  if (certificate.releaseReasons.length === 0) return true;

  if (
    [ReleaseReasons.TRAVAIL, ReleaseReasons.MISSIONS].some((reason) =>
      certificate.releaseReasons.includes(reason),
    )
  ) {
    return moment(certificate.releaseDate).isBefore(moment().subtract(24, 'hours'));
  }

  if (
    [
      ReleaseReasons.ACHATS,
      ReleaseReasons.SANTE,
      ReleaseReasons.FAMILLE,
      ReleaseReasons.HANDICAP,
      ReleaseReasons.CONVOCATION,
      ReleaseReasons.ENFANTS,
    ].some((reason) => certificate.releaseReasons.includes(reason))
  ) {
    return !moment(certificate.releaseDate).isSame(moment(), 'day');
  }

  if (
    certificate.releaseReasons.length === 1 &&
    certificate.releaseReasons.includes(ReleaseReasons.SPORT_ANIMAUX)
  ) {
    return moment(certificate.releaseDate).isBefore(moment().subtract(60, 'm'));
  }
}

export async function generateCertificateAsBase64(certificate: Certificate) {
  const pdfDoc = await PDFDocument.load(rawPdfCertificate);
  const pages = pdfDoc.getPages();
  let page1 = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  function drawText(text: string, x: number, y: number, size: number = 11) {
    page1.drawText(text, {x, y, size, font});
  }

  drawText(`${certificate.firstName} ${certificate.lastName}`, 119, 696);
  drawText(certificate.birthDate, 119, 674);
  drawText(certificate.birthLocation, 297, 674);
  drawText(
    `${certificate.address} ${certificate.zipCode} ${certificate.town}`,
    133,
    652,
  );

  if (certificate.releaseReasons.includes(ReleaseReasons.TRAVAIL))
    drawText('x', 78, 578, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.ACHATS))
    drawText('x', 78, 533, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.SANTE))
    drawText('x', 78, 477, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.FAMILLE))
    drawText('x', 78, 435, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.HANDICAP))
    drawText('x', 78, 396, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.SPORT_ANIMAUX))
    drawText('x', 78, 358, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.CONVOCATION))
    drawText('x', 78, 295, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.MISSIONS))
    drawText('x', 78, 255, 18);
  if (certificate.releaseReasons.includes(ReleaseReasons.ENFANTS))
    drawText('x', 78, 211, 18);

  drawText(certificate.town, 105, 177, 11);

  if (certificate.releaseReasons.length > 0) {
    drawText(formatDateOnly(certificate.releaseDate), 91, 153, 11);
    drawText(formatTimeOnly(certificate.releaseDate), 264, 153, 11);
  }

  const generatedQrCode = await generateQrCode(certificate);
  const qrImage = await pdfDoc.embedPng(generatedQrCode);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 156,
    y: 100,
    width: 92,
    height: 92,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  const base64Doc = await pdfDoc.saveAsBase64();
  return `data:application/pdf;base64,${base64Doc}`;
}
