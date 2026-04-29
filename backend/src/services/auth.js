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
    throw new Error('Erro de configuração: GOOGLE_CLIENT_ID não está definido.');
  }

  const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
  const response = await fetch(tokenInfoUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Validação da credencial do Google falhou.');
  }

  if (data.aud !== googleClientId) {
    throw new Error('Credencial do Google inválida: o client ID não corresponde.');
  }

  if (data.email_verified !== 'true') {
    throw new Error('Esta Conta do Google não foi Autorizada. Por favor, verifique sua conta e tente novamente e ATUALIZE a página.');
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
