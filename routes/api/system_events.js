const express = require('express');
const router = express.Router();

const SystemEvent = require('../../models/system_event');

router.get('/', (req, res) => {
    SystemEvent.find({})
      .then(system_events => res.json(system_events))
  });

router.post('/', (req, res) => {
    let new_system_event = new SystemEvent(req.body);
    new_system_event.save().then(system_event => res.json(system_event));
});

module.exports = router;
