const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Clé API OMDB (à garder secrète)
const OMDB_API_KEY = 'be69aad';

// Serveur statique pour les fichiers HTML, CSS et JS
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la recherche de séries
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ Error: 'Le paramètre de requête est requis' });
    }
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        if (data.Error) {
            return res.status(404).json({ Error: data.Error });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: 'Erreur interne du serveur' });
    }
});

// Route pour les détails d'une série
app.get('/api/details', async (req, res) => {
    const imdbID = req.query.id;
    if (!imdbID) {
        return res.status(400).json({ Error: 'Le paramètre ID est requis' });
    }
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        if (data.Error) {
            return res.status(404).json({ Error: data.Error });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: 'Erreur interne du serveur' });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
