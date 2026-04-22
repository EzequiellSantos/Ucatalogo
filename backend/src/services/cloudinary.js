const crypto = require('crypto');

const getCloudinaryConfig = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET
});

const canDeleteFromCloudinary = () => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  return Boolean(cloudName && apiKey && apiSecret);
};

const buildSignature = (publicId, timestamp) =>
  crypto
    .createHash('sha1')
    .update(`invalidate=true&public_id=${publicId}&timestamp=${timestamp}`)
    .update(process.env.CLOUDINARY_API_SECRET || '')
    .digest('hex');

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId || !canDeleteFromCloudinary()) {
    return { skipped: true };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildSignature(publicId, timestamp);
  const { cloudName, apiKey } = getCloudinaryConfig();

  const body = new URLSearchParams({
    public_id: publicId,
    invalidate: 'true',
    api_key: apiKey,
    timestamp: String(timestamp),
    signature
  });

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Cloudinary image deletion failed.');
  }

  return data;
};

module.exports = {
  canDeleteFromCloudinary,
  deleteCloudinaryImage
};
