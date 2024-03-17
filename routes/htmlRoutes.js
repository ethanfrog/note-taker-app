const router = require('express').Router();

const path = require('path');

// Go to the notes page if given /notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

// Otherwise, go to the homepage
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;
