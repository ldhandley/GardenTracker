// backend/src/routes/plants.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all plants
router.get('/', (req, res) => {
  const plants = db.prepare('SELECT * FROM plants').all();
  res.json(plants);
});

// Add new plant
router.post('/', (req, res) => {
  const { name, planting_date, emergence_start, emergence_end, location, notes } = req.body;

  const stmt = db.prepare(`
    INSERT INTO plants (name, species, planting_date, emergence_start, emergence_end, location, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, planting_date, emergence_start, emergence_end, location, notes);

  const newPlant = db.prepare('SELECT * FROM plants WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newPlant);
});

// Delete plant
router.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM plants WHERE id = ?');
  stmt.run(req.params.id);
  res.status(204).end();
});

module.exports = router;