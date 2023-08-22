const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Le port sur lequel le serveur écoutera

// Utilisez '__dirname' pour obtenir le chemin absolu du dossier contenant le script
// Servez les fichiers statiques depuis le dossier des images
app.use('/assets/images', express.static(path.join(__dirname, 'src/assets/images')));

// Point d'entrée racine, vous pouvez personnaliser si nécessaire
app.get('/', (req, res) => {
  res.send('Serveur de fichiers en cours d\'exécution');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur de fichiers en cours d'exécution sur le port ${PORT}`);
});