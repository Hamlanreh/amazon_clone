const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.image(
//   'https://upload.wikimedia.org/wikipedia/commons/1/13/Benedict_Cumberbatch_2011.png',
//   { type: 'fetch' }
// );

module.exports = cloudinary;
