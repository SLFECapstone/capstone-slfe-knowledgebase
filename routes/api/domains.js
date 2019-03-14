const express = require('express');
const router = express.Router();

//Domain Model
const Domain = require('../../models/domain');

// @route  GET api/domains
// @desc   Get all domains
// @access Public
router.get('/', (req, res) => {
  Domain.find({})
    .then(domains => res.json(domains))
});

module.exports = router;