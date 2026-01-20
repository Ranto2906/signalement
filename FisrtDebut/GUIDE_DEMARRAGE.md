# Guide de Démarrage - Projet Travaux Routiers

## 🚀 Étapes pour Commencer

### 1. Organisation de l'Équipe (4 personnes)

**Répartition suggérée :**
- **Personne 1** : API REST Authentification + Base de données
- **Personne 2** : Application Web (Frontend + intégration carte)
- **Personne 3** : Application Mobile Android
- **Personne 4** : Serveur de cartes Docker + DevOps (Docker, déploiement)

### 2. Choix des Technologies

#### Backend (API)
```
Option recommandée : Node.js + Express
- Facile à dockeriser
- Bon support Firebase Admin SDK
- Rapide à développer
```

Alternatives : Java Spring Boot, .NET Core, PHP MVC

#### Base de Données
```
- PostgreSQL (base locale dans Docker)
- Firebase Firestore/Realtime Database (synchronisation)
```

#### Frontend Web
```
- React.js ou Vue.js
- Leaflet.js pour la carte
- Axios pour appels API
```

#### Mobile
```
Option recommandée : React Native
- Code partagé avec le web
- Bon support Firebase
- Déploiement APK facile
```

Alternative : Flutter, Android natif (Kotlin)

### 3. Setup Initial

#### A. Créer le Repository Git
```bash
mkdir projet-travaux-routiers
cd projet-travaux-routiers
git init
git remote add origin <URL_VOTRE_REPO>
```

#### B. Structure du Projet
```
projet-travaux-routiers/
├── api/                    # API REST Authentification
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── web/                    # Application Web
│   ├── src/
│   ├── public/
│   └── package.json
├── mobile/                 # Application Mobile
│   ├── android/
│   ├── src/
│   └── package.json
├── database/               # Scripts SQL
│   ├── schema.sql
│   └── seed.sql
├── docker/                 # Configuration Docker
│   ├── docker-compose.yml
│   └── tile-server/        # Serveur de cartes
├── docs/                   # Documentation
│   ├── MCD.md
│   ├── API.md
│   └── scenarios.md
└── README.md
```

#### C. Docker Compose Initial
```yaml
version: '3.8'

services:
  # Base de données PostgreSQL
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: travaux_routiers
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - ./database:/docker-entrypoint-initdb.d
      - postgres_data:/var/lib/postgresql/data

  # API REST
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://admin:password@postgres:5432/travaux_routiers
      FIREBASE_CONFIG: ${FIREBASE_CONFIG}
    depends_on:
      - postgres

  # Serveur de cartes (OpenStreetMap)
  tile-server:
    image: overv/openstreetmap-tile-server
    ports:
      - "8080:80"
    volumes:
      - osm_data:/var/lib/postgresql/12/main
      - ./maps:/data/maps

volumes:
  postgres_data:
  osm_data:
```

### 4. Configuration Firebase

1. Créer un projet Firebase : https://console.firebase.google.com/
2. Activer Authentication (Email/Password)
3. Créer une base Firestore ou Realtime Database
4. Télécharger le fichier de configuration :
   - **Web/Mobile** : `firebaseConfig`
   - **API** : Service Account JSON

**Structure Firestore suggérée :**
```
signalements/
  {id}/
    - description
    - latitude
    - longitude
    - photo_url
    - date_signalement
    - user_id
    - status
    - surface_m2 (optionnel)
    - budget (optionnel)
    - entreprise (optionnel)
```

### 5. Télécharger la Carte d'Antananarivo

```bash
# Méthode 1 : Geofabrik
wget https://download.geofabrik.de/africa/madagascar-latest.osm.pbf

# Méthode 2 : BBBike (plus précis pour Antananarivo)
# Aller sur https://extract.bbbike.org/
# Sélectionner la zone d'Antananarivo
# Télécharger au format OSM/PBF
```

### 6. Roadmap de Développement

#### Sprint 1 (Semaine 1) - Fondations
- [ ] Setup base de données (schema.sql)
- [ ] API : Inscription + Connexion (base locale)
- [ ] Intégration Firebase Authentication
- [ ] Dockerfile API + docker-compose
- [ ] Documentation Swagger basique

#### Sprint 2 (Semaine 2) - Core Features
- [ ] API : Gestion sessions + blocage tentatives
- [ ] Web : Page de connexion/inscription
- [ ] Web : Affichage carte Leaflet + markers
- [ ] Mobile : Setup + écran de connexion
- [ ] Serveur de cartes offline Docker

#### Sprint 3 (Semaine 3) - Fonctionnalités Métier
- [ ] Mobile : Signalement sur carte (GPS + photo)
- [ ] Web : Interface Manager (tableau de bord)
- [ ] Web : Modification signalements (surface, budget, entreprise)
- [ ] Synchronisation Firebase ↔ Base locale
- [ ] Tableau récapitulatif (visiteur)

#### Sprint 4 (Semaine 4) - Finalisation
- [ ] Web : Gestion des statuts + historique
- [ ] Mobile : Filtre "Mes signalements"
- [ ] Tests end-to-end
- [ ] Build APK
- [ ] Documentation technique complète
- [ ] Préparation soutenance

### 7. Outils de Suivi

**Recommandations :**
- **Trello** : https://trello.com/ (gratuit, simple)
- **GitHub Projects** : Intégré au repository
- **Notion** : Documentation partagée

**Créer des colonnes :**
- 📋 Backlog
- 🏃 En cours
- 👀 En revue
- ✅ Terminé

### 8. Points d'Attention

#### ⚠️ Serveur de Cartes Offline
- Prend beaucoup de ressources (RAM, stockage)
- Temps de setup initial long
- Alternative : utiliser Mapbox offline ou OpenMapTiles

#### ⚠️ Synchronisation Firebase
- Gérer les conflits (même signalement modifié web + mobile)
- Solution : utiliser Firebase Timestamps + merge strategy

#### ⚠️ Sécurité
- TOUJOURS hasher les mots de passe (bcrypt, argon2)
- Ne jamais commit les clés Firebase dans Git (.gitignore)
- Utiliser HTTPS en production

### 9. Ressources Utiles

**Documentation :**
- Firebase : https://firebase.google.com/docs
- Leaflet : https://leafletjs.com/
- Swagger/OpenAPI : https://swagger.io/

**Tutoriels :**
- Serveur de tuiles OSM : https://switch2osm.org/serving-tiles/
- React + Leaflet : https://react-leaflet.js.org/
- Firebase Authentication : https://firebase.google.com/docs/auth

**Outils :**
- Postman : Test API REST
- Android Studio : Build APK
- QGIS : Visualiser les données OSM

### 10. Checklist Avant Rendu

- [ ] Code sur GitHub/GitLab public
- [ ] README avec instructions de démarrage
- [ ] Documentation technique (MCD + scénarios + captures)
- [ ] Documentation API (Swagger accessible)
- [ ] APK mobile fonctionnel
- [ ] Docker compose qui lance tout
- [ ] Données de test (signalements, users)
- [ ] Compte Manager par défaut créé
- [ ] Suivi des tâches visible (Trello/GitHub Projects)
- [ ] Vidéo démo (optionnel mais apprécié)

---

## 📞 Support

Si vous avez des questions durant le développement :
1. Documenter le problème
2. Chercher sur Stack Overflow
3. Consulter la documentation officielle
4. Demander au professeur

**Bon courage ! 🚀**
