const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getResources = async () => {
  try {
    const { resources } = await cloudinary.api.resources({ type: "upload", prefix: "clean/" });
    return resources;
  } catch (error) {
    throw error;
  }
};

const storeUpload = async (file) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload("data:image/png;base64," + file.toString("base64"));
    return secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = { getResources, storeUpload };
