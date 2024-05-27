import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Middleware per consentire CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Imposta l'header per consentire a tutti i domini di fare richieste (da modificare per ambienti di produzione)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://evilinsult.com/generate_insult.php?lang=it&type=json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});