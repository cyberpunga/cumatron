const crypto = require("crypto")

const validateWebhook = (token, secret) => {
  const responseToken = crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("base64")
  return { response_token: `sha256=${responseToken}` }
}

module.exports = {
  validateWebhook,
}
