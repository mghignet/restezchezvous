const qrImage = require("qr-image");

export async function generateQrCode(text: string) {
  var options = {
    ec_level: 'M',
    type: 'png',
    margin: 1,
  };
  let imageBytes = qrImage.imageSync(text, options);
  return `data:image/png;base64,${imageBytes.toString('base64')}`;
}
