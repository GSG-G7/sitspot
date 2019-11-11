const Airtable = require('airtable');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  // eslint-disable-next-line global-require, import/no-unresolved, import/no-extraneous-dependencies
  require('env2')('.env');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_KEY,
});

module.exports = {
  typeformBase: Airtable.base(process.env.TYPEFORM_BASE),
  staticsBase: Airtable.base(process.env.STATICS_BASE),
};
