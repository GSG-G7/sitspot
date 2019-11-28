module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log(err);
  switch (err.statusCode) {
    case 400:
      res.status(400).json({ code: err.statusCode, message: err.message });
      break;
    case 401:
      res.status(401).json({ statusCode: 401, message: err.message });
      break;
    case 404:
      if (err.message.includes('Could not find table')) {
        // airtable
        const message = 'Could not find table';
        res.status(404).json({ statusCode: err.statusCode, message });
        break;
      }
      res
        .status(404)
        .json({ statusCode: err.statusCode, message: err.message });
      break;
    default:
      res.status(500).json({ message: 'server error' });
  }
};
