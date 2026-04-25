const { getAllowedAdminEmails, isAllowedAdminEmail, verifyGoogleCredential } = require('../services/auth');

const loginWithGoogle = async (req, res, next) => {
  try {
    const credential = String(req.body?.credential || '').trim();

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required.' });
    }

    const allowedEmails = getAllowedAdminEmails();

    if (allowedEmails.length === 0) {
      return res.status(500).json({ message: 'ADMIN_ALLOWED_EMAILS is not configured.' });
    }

    const user = await verifyGoogleCredential(credential);

    if (!isAllowedAdminEmail(user.email)) {
      return res.status(403).json({ message: 'Acesso negado. Este email não tem permissão para acessar a área de administração. ATUALIZE a página.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginWithGoogle
};
