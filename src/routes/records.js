const express = require('express');
const db = require('../database');

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /records:
 *     get:
 *       summary: Retrieve a list of records.
 *       responses:
 *         200:
 *           description: A list of records.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
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
 * paths:
 *   /records:
 *     post:
 *       summary: Add a new record.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       responses:
 *         201:
 *           description: The created record.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
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
