const { join } = require('path');
const express = require('express');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  // eslint-disable-next-line global-require, import/no-unresolved
  require('env2')('.env');

const router = require('./routes');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.all('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
