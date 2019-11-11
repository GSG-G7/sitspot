const { typeformBase } = require('../config');

module.exports = ({
  name,
  linkSite: url,
  country,
  city,
  businessType: type,
  img1: image1,
  img2: image2,
}) =>
  typeformBase('place').create([
    {
      fields: {
        name,
        country,
        city,
        image1,
        image2,
        url,
        type,
      },
    },
  ]);
