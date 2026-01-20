# Projet Cloud S5 - Système de Gestion des Travaux Routiers

## 📋 Vue d'ensemble
Créer un système complet de gestion et signalement des travaux routiers à Antananarivo avec :
- **API REST** : Authentification (fournisseur d'identité)
- **Application Web** : Gestion des signalements (Manager) et visualisation (Visiteur)
- **Application Mobile** : Signalement des problèmes routiers par les utilisateurs

---

## 🏗️ Architecture du Projet

### 1️⃣ Module Authentification (API REST)
**Technologies** : PHP MVC / Java / .Net / Node.js + Docker

#### Fonctionnalités :
- ✅ **Inscription** : Créer un compte utilisateur
- ✅ **Connexion** : Authentification avec Firebase (en ligne) ou base locale (hors ligne)
- ✅ **Modification** : Mise à jour des informations utilisateur
- ✅ **Gestion des sessions** : Durée de vie configurable
- ✅ **Sécurité** : 
  - Limite de tentatives de connexion (3 par défaut, paramétrable)
  - Blocage automatique du compte
  - API pour débloquer un compte
- ✅ **Documentation** : Swagger/OpenAPI

**Endpoints principaux** :
```
POST /api/auth/register        - Inscription
POST /api/auth/login           - Connexion
PUT  /api/auth/user/:id        - Modifier infos
POST /api/auth/unlock/:id      - Débloquer compte
GET  /api/auth/session/check   - Vérifier session
```

---

### 2️⃣ Module Cartes
**Technologies** : OpenStreetMap + Leaflet + Docker

#### Fonctionnalités :
- 🗺️ Serveur de cartes **offline** sur Docker
- 🗺️ Carte d'Antananarivo avec les rues téléchargées
- 🗺️ Affichage et manipulation avec Leaflet.js

---

### 3️⃣ Module Web (Application Frontend)
**Objectif** : Gérer et visualiser les travaux routiers

#### 👥 3 Types d'utilisateurs :

##### A. **Visiteur** (sans compte)
- Voir la carte avec les points des problèmes routiers
- Survol d'un point → afficher :
  - Date de signalement
  - Statut (Nouveau / En cours / Terminé)
  - Surface en m²
  - Budget estimé
  - Entreprise responsable
- Tableau de récapitulation :
  - Nombre total de signalements
  - Surface totale (m²)
  - Avancement global (%)
  - Budget total

##### B. **Utilisateur** (compte créé)
- Toutes les fonctionnalités Visiteur
- (Réservé principalement pour le mobile)

##### C. **Manager** (compte par défaut)
- **Synchronisation Firebase** :
  - Récupérer les signalements depuis Firebase (mobile → web)
  - Envoyer les mises à jour vers Firebase (web → mobile)
- **Gestion des signalements** :
  - Ajouter surface (m²)
  - Définir budget
  - Assigner une entreprise
  - Modifier le statut (Nouveau → En cours → Terminé)

---

### 4️⃣ Module Mobile (Android APK)
**Utilisateurs** : Utilisateurs connectés

#### Fonctionnalités :
- 📱 Connexion via Firebase
- 📍 **Signaler un problème** :
  - Cliquer sur la carte (Leaflet + OpenStreetMap en ligne)
  - Enregistrer localisation GPS
  - Photo (optionnel)
- 🗺️ Voir la carte avec tous les signalements
- 📊 Tableau récapitulatif
- 🔍 **Filtre** : "Mes signalements uniquement"

---

## 🗄️ Base de Données

### Tables principales :
1. **TypeUser** : Types d'utilisateurs (Visiteur, Utilisateur, Manager)
2. **User_** : Comptes utilisateurs
3. **Parametre** : Configuration par utilisateur (limite tentatives, durée session)
4. **Ville** : Villes (Antananarivo)
5. **Route** : Routes/Rues d'Antananarivo
6. **Status** : Statuts des signalements (Nouveau, En cours, Terminé)
7. **Signalement** : Problèmes routiers signalés
8. **Entreprise** : Entreprises de construction
9. **TentativeConnexion** : Suivi des tentatives de connexion

---

## 🔄 Flux de Travail

### Scénario 1 : Utilisateur Mobile signale un problème
1. Utilisateur se connecte via Firebase (mobile)
2. Ouvre la carte → clique sur un point
3. Enregistre le signalement → envoyé à Firebase
4. Manager synchronise → récupère dans l'application web
5. Manager ajoute infos (surface, budget, entreprise)
6. Manager modifie statut → synchronise vers Firebase
7. Utilisateur mobile voit la mise à jour

### Scénario 2 : Visiteur consulte les travaux
1. Visiteur ouvre l'application web (sans connexion)
2. Voit la carte avec tous les points
3. Survole un point → voit les détails
4. Consulte le tableau récapitulatif

---

## 📦 Livrables

### Code :
- ✅ GitHub/GitLab public
- ✅ API REST (pas d'interface)
- ✅ Application Web
- ✅ Application Mobile (APK)

### Documentation :
- ✅ **Documentation Technique** :
  - MCD (Modèle Conceptuel de Données)
  - Scénarios d'utilisation avec captures d'écran
  - Liste des membres (Nom, Prénom, NumETU)
- ✅ Documentation API (Swagger)

### Gestion de projet :
- ✅ Suivi des tâches (Trello, Jira, GitHub Projects...)

### Notation :
- Fonctionnalités
- Qualité du code
- Design
- Suivi des tâches
- Documentation

---

## 🛠️ Technologies Suggérées

### Backend (API) :
- **Option 1** : Node.js + Express + Firebase Admin SDK
- **Option 2** : Java Spring Boot
- **Option 3** : .NET Core
- **Option 4** : PHP (framework MVC personnalisé)

### Base de données :
- PostgreSQL / MySQL (local Docker)
- Firebase Realtime Database / Firestore (en ligne)

### Frontend Web :
- React / Vue.js / Angular
- Leaflet.js pour la carte

### Mobile :
- React Native / Flutter / Android natif (Java/Kotlin)
- Leaflet Mobile ou Google Maps SDK

### Docker :
- API + Base de données
- Serveur de cartes (tile server) : OpenMapTiles, OSM Tile Server

---

## 🎯 Points Clés à Retenir

1. **Dual mode** : Firebase (en ligne) + Base locale (hors ligne)
2. **Synchronisation** : Manager fait le pont entre Web et Mobile
3. **Sécurité** : Blocage après tentatives, gestion des sessions
4. **Cartes offline** : Serveur de tuiles dans Docker
5. **3 profils** : Visiteur, Utilisateur, Manager (créer par défaut)
6. **API uniquement** : Pas d'interface pour le module authentification

---

## ⚠️ Défis Potentiels (Aléas)

- Configuration serveur de cartes offline
- Synchronisation Firebase ↔ Base locale
- Gestion des sessions et sécurité
- Performance de la carte avec beaucoup de points
- Test de l'APK sur différents appareils
