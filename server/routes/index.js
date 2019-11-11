const router = require('express').Router();

const {
  routes: { place },
} = require('../controllers/');

router.post('/place', place.post);

module.exports = router;
