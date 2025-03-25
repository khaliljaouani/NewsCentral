#  News Central - Application MERN

News Central est une application fullstack MERN (MongoDB, Express.js, React.js, Node.js) permettant :
- de rechercher des actualités via 3 APIs externes (NewsAPI, GNews, NYTimes),
- de filtrer dynamiquement les résultats,
- d’enregistrer les consultations dans MongoDB,
- de consulter l’historique avec une interface moderne.

---

##  Technologies utilisées

- Backend : Node.js, Express.js, MongoDB Atlas, Axios
- Frontend : React.js, React Router, CSS classique
- Connexion API : NewsAPI, NYTimes, GNews

##  Structure du projet

- `backend/` → serveur Express + base MongoDB + logique API
- `frontend/` → interface React + filtres dynamiques + pagination

##  Configuration backend

1. Crée un fichier `.env` (inspiré de `.env.example`)
2. Installe les dépendances :
```bash
cd backend
npm install
