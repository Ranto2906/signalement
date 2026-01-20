
# TODO LIST - Projet Cloud S5 : Gestion Travaux Routiers

## 📋 Répartition des Tâches




| Categorie | Module | Taches | Type | Qui | Estimation (h)                                         |Temps passé |Reste à faire|Avancement|
|-----------|--------|--------|------|-----|----------------|
| **API AUTH** | Setup Docker | Configuration environnement | Integration | ETU003103 | 8 |
| API AUTH | Setup Docker | Base de données PostgreSQL | Integration | ETU003103 | 6 |
| API AUTH | Setup Docker | Configuration Firebase | Integration | ETU003103 | 8 |
| API AUTH | Inscription | Endpoint POST /register | Metier | ETU003103 | 10 |
| API AUTH | Inscription | Validation données | Metier | ETU003103 | 6 |
| API AUTH | Inscription | Hash mot de passe | Metier | ETU003103 | 4 |
| API AUTH | Connexion | Endpoint POST /login | Metier | ETU003103 | 10 |
| API AUTH | Connexion | Gestion tentatives | Metier | ETU003103 | 8 |
| API AUTH | Connexion | Blocage compte | Metier | ETU003103 | 6 |
| API AUTH | Session | Création token JWT | Metier | ETU003103 | 8 |
| API AUTH | Session | Durée de vie paramétrable | Metier | ETU003103 | 6 |
| API AUTH | Session | Endpoint vérification session | Metier | ETU003103 | 5 |
| API AUTH | Déblocage | Endpoint POST /unlock | Metier | ETU003103 | 5 |
| API AUTH | Modification | Endpoint PUT /user | Metier | ETU003103 | 8 |
| API AUTH | Swagger | Documentation API | Documentation | ETU003103 | 10 |
| API AUTH | Firebase Sync | Sync auth Firebase/Local | Integration | ETU003103 | 12 |
| **CARTES** | Serveur Tuiles | Installation OpenMapTiles Docker | Integration | ETU003300 | 15 |
| CARTES | Serveur Tuiles | Téléchargement carte Antananarivo | Integration | ETU003300 | 10 |
| CARTES | Serveur Tuiles | Configuration serveur | Integration | ETU003300 | 8 |
| CARTES | Serveur Tuiles | Tests et optimisation | Integration | ETU003300 | 6 |
| **WEB** | Setup Projet | Configuration React/Vue | Integration | ETU003248 | 6 |
| WEB | Setup Projet | Structure dossiers | Integration | ETU003248 | 4 |
| WEB | Login/Register | Page connexion | Affichage | ETU003248 | 8 |
| WEB | Login/Register | Page inscription | Affichage | ETU003248 | 8 |
| WEB | Login/Register | Appel API Auth | Integration | ETU003248 | 10 |
| WEB | Login/Register | Gestion erreurs/blocage | Affichage | ETU003248 | 6 |
| WEB | Carte Visiteur | Intégration Leaflet | Affichage | ETU003248 | 10 |
| WEB | Carte Visiteur | Affichage markers signalements | Affichage | ETU003248 | 8 |
| WEB | Carte Visiteur | Popup info au survol | Affichage | ETU003248 | 8 |
| WEB | Carte Visiteur | Style markers par statut | Affichage | ETU003248 | 5 |
| WEB | Tableau Recap | Interface tableau récap | Affichage | ETU003248 | 8 |
| WEB | Tableau Recap | Calcul statistiques | Metier | ETU003248 | 6 |
| WEB | Tableau Recap | Avancement en pourcentage | Metier | ETU003248 | 4 |
| WEB | Manager Dashboard | Interface gestion signalements | Affichage | ETU003659 | 12 |
| WEB | Manager Dashboard | Liste signalements | Affichage | ETU003659 | 8 |
| WEB | Manager Dashboard | Formulaire édition | Affichage | ETU003659 | 10 |
| WEB | Manager Dashboard | Modification statut | Metier | ETU003659 | 6 |
| WEB | Manager Dashboard | Ajout surface/budget/entreprise | Metier | ETU003659 | 8 |
| WEB | Manager Sync | Bouton synchronisation | Affichage | ETU003659 | 4 |
| WEB | Manager Sync | Récupération données Firebase | Integration | ETU003659 | 12 |
| WEB | Manager Sync | Envoi données vers Firebase | Integration | ETU003659 | 12 |
| WEB | Manager Sync | Gestion conflits sync | Metier | ETU003659 | 8 |
| WEB | API Backend | CRUD Signalements | Metier | ETU003659 | 15 |
| WEB | API Backend | CRUD Entreprises | Metier | ETU003659 | 8 |
| WEB | API Backend | API Statistiques recap | Metier | ETU003659 | 6 |
| **MOBILE** | Setup Projet | Configuration React Native/Flutter | Integration | ETU003300 | 8 |
| MOBILE | Setup Projet | Configuration Firebase | Integration | ETU003300 | 6 |
| MOBILE | Login | Écran connexion | Affichage | ETU003300 | 8 |
| MOBILE | Login | Auth Firebase en ligne | Integration | ETU003300 | 10 |
| MOBILE | Login | Gestion session | Metier | ETU003300 | 6 |
| MOBILE | Carte | Intégration Leaflet/MapView | Affichage | ETU003300 | 12 |
| MOBILE | Carte | Affichage signalements | Affichage | ETU003300 | 8 |
| MOBILE | Carte | Popup info signalement | Affichage | ETU003300 | 6 |
| MOBILE | Signalement | Écran création signalement | Affichage | ETU003300 | 10 |
| MOBILE | Signalement | Localisation GPS | Metier | ETU003300 | 8 |
| MOBILE | Signalement | Capture photo | Metier | ETU003300 | 8 |
| MOBILE | Signalement | Envoi vers Firebase | Integration | ETU003300 | 10 |
| MOBILE | Tableau Recap | Interface tableau | Affichage | ETU003300 | 6 |
| MOBILE | Filtre | Filtre mes signalements | Metier | ETU003300 | 6 |
| MOBILE | Build | Génération APK | Integration | ETU003300 | 8 |
| **DOCS** | MCD | Création diagramme MCD | Documentation | ETU003248 | 6 |
| DOCS | Scénarios | Scénario Visiteur + captures | Documentation | ETU003248 | 8 |
| DOCS | Scénarios | Scénario Manager + captures | Documentation | ETU003659 | 8 |
| DOCS | Scénarios | Scénario Mobile + captures | Documentation | ETU003300 | 8 |
| DOCS | Technique | README projet | Documentation | ETU003103 | 6 |
| DOCS | Technique | Guide installation Docker | Documentation | ETU003103 | 6 |
| **DEVOPS** | Docker | docker-compose global | Integration | ETU003103 | 10 |
| DEVOPS | Git | Setup repository GitHub/GitLab | Integration | ETU003248 | 4 |
| DEVOPS | Git | Structure branches | Integration | ETU003248 | 3 |

---

## 📊 Récapitulatif par Membre

| Qui | Nb Tâches | Total Estimation (h) | Modules Principaux |
|-----|-----------|----------------------|-------------------|
| **ETU003103** | 18 | **142** | API Auth, Docker, DevOps |
| **ETU003248** | 17 | **120** | Web Frontend (Visiteur), Docs |
| **ETU003659** | 12 | **117** | Web Backend, Manager Dashboard |
| **ETU003300** | 16 | **157** | Mobile, Serveur Cartes |

---

## 📈 Récapitulatif par Module

| Module | Total Estimation (h) |
|--------|---------------------|
| API Authentification | 120 |
| Serveur Cartes | 39 |
| Application Web | 182 |
| Application Mobile | 120 |
| Documentation | 42 |
| DevOps | 17 |
| **TOTAL PROJET** | **520** |

---

## 🎯 Planning Suggéré (4 Semaines)

### Semaine 1 : Fondations
- [ ] ETU003103 : Setup Docker + Base de données + Début API Auth
- [ ] ETU003300 : Serveur de cartes + Setup Mobile
- [ ] ETU003248 : Setup Web + Pages Login/Register
- [ ] ETU003659 : Structure API Backend Web

### Semaine 2 : Core Features
- [ ] ETU003103 : API Auth complet (sessions, blocage, déblocage)
- [ ] ETU003300 : Mobile Login + Carte
- [ ] ETU003248 : Carte Leaflet + Markers + Tableau Recap
- [ ] ETU003659 : Dashboard Manager + CRUD Signalements

### Semaine 3 : Intégration
- [ ] ETU003103 : Sync Firebase/Local + Swagger
- [ ] ETU003300 : Signalement Mobile + GPS + Photo
- [ ] ETU003248 : Intégration API Auth Web
- [ ] ETU003659 : Synchronisation Firebase Web

### Semaine 4 : Finalisation
- [ ] ETU003103 : Tests API + Docker compose final
- [ ] ETU003300 : Build APK + Tests Mobile
- [ ] ETU003248 : Documentation + Tests Web
- [ ] ETU003659 : Tests Manager + Scénarios

---

## ✅ Checklist Livrables

- [ ] Code sur GitHub/GitLab public
- [ ] API REST Authentification fonctionnel
- [ ] Documentation Swagger
- [ ] Application Web (Visiteur + Manager)
- [ ] Application Mobile (APK)
- [ ] Serveur de cartes Docker
- [ ] docker-compose.yml complet
- [ ] Documentation technique (MCD + Scénarios)
- [ ] Suivi des tâches visible