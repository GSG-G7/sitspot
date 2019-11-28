const { upload } = require('../utils');
const { addPlace } = require('../../models/queries');
const { place } = require('../validation');

const post = (req, res, next) => {
  const body = { ...req.body };
  const { name, linkSite, country, city, businessType, img1 } = body;
  place
    .validate({ name, linkSite, country, city, businessType })
    .then(() => {
      if (img1) return upload(img1);

      return Promise.resolve('NO_IMAGE');
    })
    .then(image => {
      if (image !== 'NO_IMAGE') {
        const { secure_url: url } = image;
        // eslint-disable-next-line prefer-destructuring
        body.img1 = url.split('/image/upload/')[1];
      }
      return body;
    })
    .then(addPlace)
    .then(([{ fields: { id } }]) => res.send(`${id}`))
    .catch(next);
};

module.exports = { post };
