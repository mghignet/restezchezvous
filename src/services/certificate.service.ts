import {PDFDocument, StandardFonts} from 'pdf-lib';
import {generateQrCode} from './qrcode.service';
import {
  formatDateAndTime,
  formatDateOnly,
  formatHoursOnly,
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
      ReleaseReasons.COURSES,
      ReleaseReasons.SANTE,
      ReleaseReasons.FAMILLE,
      ReleaseReasons.JUDICIAIRE,
    ].some((reason) => certificate.releaseReasons.includes(reason))
  ) {
    return !moment(certificate.releaseDate).isSame(moment(), 'day');
  }

  if (
    certificate.releaseReasons.length === 1 &&
    certificate.releaseReasons.includes(ReleaseReasons.SPORT)
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

  drawText(`${certificate.firstName} ${certificate.lastName}`, 123, 686);
  drawText(certificate.birthDate, 123, 661);
  drawText(certificate.birthLocation, 92, 638);
  drawText(
    `${certificate.address} ${certificate.zipCode} ${certificate.town}`,
    134,
    613,
  );

  if (certificate.releaseReasons.includes(ReleaseReasons.TRAVAIL))
    drawText('x', 77, 527, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.COURSES))
    drawText('x', 77, 478, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.SANTE))
    drawText('x', 77, 436, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.FAMILLE))
    drawText('x', 77, 400, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.SPORT))
    drawText('x', 77, 345, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.JUDICIAIRE))
    drawText('x', 77, 298, 19);
  if (certificate.releaseReasons.includes(ReleaseReasons.MISSIONS))
    drawText('x', 77, 260, 19);

  drawText(certificate.town, 111, 226, 11);

  if (certificate.releaseReasons.length > 0) {
    drawText(formatDateOnly(certificate.releaseDate), 92, 200);
    drawText(formatHoursOnly(certificate.releaseDate), 200, 201);
    drawText(formatMinutesOnly(certificate.releaseDate), 220, 201);
  }

  drawText('Date de création:', 464, 150, 7);
  drawText(formatDateAndTime(certificate.creationDate), 455, 144, 7);
  const generatedQrCode = await generateQrCode(certificate);
  const qrImage = await pdfDoc.embedPng(generatedQrCode);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 170,
    y: 155,
    width: 100,
    height: 100,
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
