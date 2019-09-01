const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  upload: (image, options, cb) => {
    cloudinary.v2.uploader.upload(image, options, (error, result) => {
      if (error) throw error;
      // console.log(JSON.stringify(result, null, 2));
      // console.log(result);
      cb(result.url);
    });
  },
  list: (folder, cb) => {
    cloudinary.v2.api.resources({ type: 'upload', prefix: folder }, function(
      error,
      result
    ) {
      if (error) throw error;
      cb(result.resources);
    });
  }
};
