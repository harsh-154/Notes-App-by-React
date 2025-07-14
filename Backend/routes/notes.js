const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Notes');

// ROUTE 1: GET ALL THE NOTES (with optional search)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const { q } = req.query;
    let filter = { user: req.user.id };
    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }
    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ROUTE 2: ADD NOTES TO DATABASE
router.post('/addnotes', fetchuser, async (req, res) => {
  try {
    const { title, description, tag, favorite } = req.body;
    const note = new Note({
      user: req.user.id,
      title,
      description,
      tag,
      favorite: !!favorite,
    });
    const addNotes = await note.save();
    res.status(200).send(addNotes);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ROUTE 3: UPDATE AN EXISTING NOTE
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag, favorite } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    if (favorite !== undefined) newNote.favorite = favorite;
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'NOT FOUND' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: 'NOT ALLOWED' });
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ROUTE 4: DELETE NOTE
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'NOT FOUND' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: 'NOT ALLOWED' });
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send({ error: 'CANNOT DELETE' });
  }
});

module.exports = router;