const express = require('express');
const db = require('../database');

const router = express.Router();

/**
 * @swagger
 * /records:
 *   get:
 *     summary: "Get all records"
 *     description: "Returns a list of records"
 *     responses:
 *       200:
 *         description: "A list of records"
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM records');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

/**
 * @swagger
 * /records:
 *   post:
 *     summary: "Create a record"
 *     responses:
 *       200:
 *         description: "record"
 */
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
