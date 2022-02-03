const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCleanImage = async () => {
  const { resources } = await cloudinary.api.resources({
    type: "upload",
    prefix: "clean/",
  });
  const random = resources[Math.floor(Math.random() * resources.length)];
  return random.secure_url.replace(/\/upload\/v([0-9])\w+\//g, "/upload/w_480/");
};

module.exports = { getCleanImage };
