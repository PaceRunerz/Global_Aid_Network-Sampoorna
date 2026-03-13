// utils/generateQR.js
const QRCode = require('qrcode');

const generateQR = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data);        etgergverf
    return qrCode;
  } catch (error) {
    console.error('QR generation error:', error);
    throw new Error('Error generating QR code');
  }
};

module.exports = generateQR;
