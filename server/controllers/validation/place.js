const { object, string } = require('yup');

module.exports = object().shape({
  name: string().required,
  linkSite: string(),
  country: string().required,
  city: string().required,
  businessType: string().required,
});
