import QRCode from 'qrcode';

const generateQRCodeMiddleware = async (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({ error: "Form title is required" });
  }

  try {
    const formURL = `http://localhost:4000/forms/${req.body.title}`;
    const qrCodeDataURL = await QRCode.toDataURL(formURL);

    req.body.qrCode = qrCodeDataURL;
    next();
  } catch (error) {
    next(error);
  }
};

export default generateQRCodeMiddleware;
