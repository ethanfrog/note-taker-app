const router = require('express').Router();
const notes = require('../notes');

router.get('/notes', (req, res) => {
  notes.getNotes()
  .then((notes) => {
      return res.json(notes);
  })
});

router.post('/notes', (req, res) => {
  notes.postNote(req.body)
  .then((note) => res.json(note))
});

module.exports = router;
