const express = require('express');
const cors = require('cors');
const plantRoutes = require('./routes/plants');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/plants', plantRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});