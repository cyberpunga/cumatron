const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storeUpload = async file => {
  const base64String = file.toString("base64")
  const upload = await cloudinary.uploader.upload(
    "data:image/png;base64," + base64String
  )
  return upload.secure_url
}

module.exports = storeUpload
