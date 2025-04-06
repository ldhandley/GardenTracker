// backend/src/routes/plants.js
const express = require('express');
const router = express.Router();

// Temp in-memory data store
let plants = [];

router.get('/', (req, res) => {
  res.json(plants);
});

router.post('/', (req, res) => {
  const newPlant = req.body;
  newPlant.id = Date.now(); // Simple unique ID
  plants.push(newPlant);
  res.status(201).json(newPlant);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  plants = plants.filter(p => p.id !== id);
  res.status(204).end();
});

module.exports = router;