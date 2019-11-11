if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('env2')('.env');

const app = require('./app');

const port = app.get('port');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on http://localhost:${port}`);
});
