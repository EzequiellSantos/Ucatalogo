const getAllowedAdminEmails = () =>
  String(process.env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

const isAllowedAdminEmail = (email) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  if (!normalizedEmail) {
    return false;
  }

  return getAllowedAdminEmails().includes(normalizedEmail);
};

const verifyGoogleCredential = async (credential) => {
  const googleClientId = String(process.env.GOOGLE_CLIENT_ID || '').trim();

  if (!googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured.');
  }

  const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
  const response = await fetch(tokenInfoUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Failed to validate Google credential.');
  }

  if (data.aud !== googleClientId) {
    throw new Error('Google credential does not belong to this application.');
  }

  if (data.email_verified !== 'true') {
    throw new Error('Google account email is not verified.');
  }

  return {
    email: data.email,
    name: data.name,
    picture: data.picture,
    sub: data.sub
  };
};

module.exports = {
  getAllowedAdminEmails,
  isAllowedAdminEmail,
  verifyGoogleCredential
};
