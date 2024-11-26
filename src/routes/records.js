const express = require('express');
const db = require('../database');

const router = express.Router();

// Get all records
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM records');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// Add a new record
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO records (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add record' });
  }
});

module.exports = router;
