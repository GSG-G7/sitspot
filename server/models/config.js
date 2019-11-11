const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_KEY,
});

module.exports = {
  typeformBase: Airtable.base(process.env.TYPEFORM_BASE),
  staticsBase: Airtable.base(process.env.STATICS_BASE),
};
