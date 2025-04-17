# Films - Plateforme de Recherche de Séries

Une application web moderne permettant de rechercher et découvrir des séries TV en utilisant l'API OMDB.

## Fonctionnalités

- 🔍 Recherche de séries en temps réel
- 🌙 Mode sombre/clair
- 🎬 Détails complets des séries

## Technologies Utilisées

- HTML
- CSS 
- JavaScript
- API OMDB

## Installation

1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
cd films
```

2. Ouvrez le fichier `public/js/script.js` et assurez-vous que la clé API OMDB est configurée :
```javascript
const OMDB_API_KEY = 'be69aad';
```

3. Ouvrez votre navigateur et accédez à :
```
http://localhost:8000
```

## Structure du Projet

```
public/
├── css/
│   └── style.css
├── js/
│   └── script.js
└── index.html
```

## Utilisation

1. Entrez le nom d'une série dans la barre de recherche
2. Cliquez sur le bouton de recherche ou appuyez sur Entrée
3. Parcourez les résultats avec la pagination
4. Cliquez sur "Plus de détails" pour voir les informations complètes d'une série
5. Utilisez le bouton thème pour basculer entre le mode clair et sombre

## Fonctionnalités Détaillées

### Recherche
- Recherche instantanée
- Gestion des erreurs
- Affichage d'un spinner pendant le chargement

## Crédits
- API : [OMDB API](https://www.omdbapi.com/)
- Icônes : [Font Awesome](https://fontawesome.com/)
- Police : [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

## Licence

© 2024 Films. Tous droits réservés. 
