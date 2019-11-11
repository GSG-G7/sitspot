const router = require('express').Router();
const multer = require('multer');

const upload = multer({ limits: { fieldSize: 3 * 1024 * 1024 } });
const {
  routes: { place },
} = require('../controllers/');

router.post('/place', upload.any(), place.post);

router.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(500).send('sorry, Internal Server Error');
});
module.exports = router;
