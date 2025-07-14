const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Bookmark = require('../models/Bookmarks');
const { body, validationResult } = require('express-validator');
const fetch = require('node-fetch');

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// GET /api/bookmarks
router.get('/api/bookmarks', fetchuser, async (req, res) => {
  try {
    const { q, tags } = req.query;
    let filter = { user: req.user.id };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } },
      ];
    }
    if (tags) {
      filter.tag = { $in: tags.split(',') };
    }
    const bookmarks = await Bookmark.find(filter);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET /api/bookmarks/:id
router.get('/api/bookmarks/:id', fetchuser, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark || bookmark.user.toString() !== req.user.id) {
      return res.status(404).send({ error: 'NOT FOUND' });
    }
    res.json(bookmark);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST /api/bookmarks
router.post(
  '/api/bookmarks',
  fetchuser,
  [
    body('url').notEmpty().withMessage('URL is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { url, title, description, tag, favorite } = req.body;
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    let bookmarkTitle = title;
    if (!bookmarkTitle) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const match = html.match(/<title>(.*?)<\/title>/i);
        bookmarkTitle = match ? match[1] : url;
      } catch {
        bookmarkTitle = url;
      }
    }
    try {
      const bookmark = new Bookmark({
        user: req.user.id,
        url,
        title: bookmarkTitle,
        description,
        tag,
        favorite: !!favorite,
      });
      const saved = await bookmark.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

// PUT /api/bookmarks/:id
router.put('/api/bookmarks/:id', fetchuser, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark || bookmark.user.toString() !== req.user.id) {
      return res.status(404).send({ error: 'NOT FOUND' });
    }
    const fields = {};
    ['url', 'title', 'description', 'tag', 'favorite'].forEach((key) => {
      if (req.body[key] !== undefined) fields[key] = req.body[key];
    });
    if (fields.url && !isValidUrl(fields.url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    const updated = await Bookmark.findByIdAndUpdate(req.params.id, { $set: fields }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE /api/bookmarks/:id
router.delete('/api/bookmarks/:id', fetchuser, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark || bookmark.user.toString() !== req.user.id) {
      return res.status(404).send({ error: 'NOT FOUND' });
    }
    const deleted = await Bookmark.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).send({ error: 'CANNOT DELETE' });
  }
});

module.exports = router;
