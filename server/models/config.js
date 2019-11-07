const Airtable = require('airtable');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  // eslint-disable-next-line global-require, import/no-unresolved
  require('env2')('.env');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_KEY,
});

module.exports = Airtable.base(process.env.AIRTABLE_BASE_ID);
