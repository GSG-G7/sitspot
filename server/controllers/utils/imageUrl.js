module.exports = publicId =>
  `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${publicId}`;
