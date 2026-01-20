# 📚 Documentation API - Gestion des Travaux Routiers

---

## 🔐 Module Authentification

**Base URL:** `/api/auth`

---

### POST `/register`

Inscription d'un nouvel utilisateur.

**Paramètres d'entrée:**
- `nom` (string) - Nom de l'utilisateur
- `prenom` (string) - Prénom de l'utilisateur
- `email` (string) - Adresse email unique
- `password` (string) - Mot de passe
- `Id_type_user` (number) - Type d'utilisateur

**Retour:** `{ user: User, token: string }`

**Tables utilisées:**
- `User_` - Création de l'utilisateur
- `TypeUser` - Validation du type
- `Session` - Création de la session

---

### POST `/login`

Connexion d'un utilisateur existant.

**Paramètres d'entrée:**
- `email` (string) - Adresse email
- `password` (string) - Mot de passe

**Retour:** `{ user: User, token: string }`

**Tables utilisées:**
- `User_` - Vérification des identifiants
- `Session` - Création de la session
- `TentativeConnexion` - Enregistrement de la tentative
- `Parametre` - Vérification des limites

---

### POST `/logout`

Déconnexion de l'utilisateur.

**Paramètres d'entrée:**
- `token` (string) - Token de session

**Retour:** `{ success: boolean }`

**Tables utilisées:**
- `Session` - Invalidation de la session

---

### GET `/me`

Récupération des informations de l'utilisateur connecté.

**Headers requis:**
- `Authorization: Bearer <token>`

**Retour:** `{ user: User }`

**Tables utilisées:**
- `User_` - Données utilisateur
- `Session` - Validation du token
- `TypeUser` - Informations du type

---

### POST `/refresh`

Renouvellement du token de session.

**Paramètres d'entrée:**
- `token` (string) - Token actuel

**Retour:** `{ newToken: string }`

**Tables utilisées:**
- `Session` - Mise à jour de la session
- `Parametre` - Durée de session

---

## 👔 Module Administration / Manager

**Base URL:** `/api/admin`

---

### GET `/signalements`

Liste de tous les signalements avec filtres optionnels.

**Paramètres de requête (optionnels):**
- `status` (number) - Filtrer par statut
- `date_debut` (date) - Date de début
- `date_fin` (date) - Date de fin

**Retour:** `Signalement[]`

**Tables utilisées:**
- `Signalement` - Liste des signalements
- `Status` - Libellés des statuts
- `User_` - Informations des auteurs

---

### GET `/signalements/non-traites`

Liste des signalements sans réparation assignée.

**Retour:** `Signalement[]`

**Vues utilisées:**
- `v_signalements_non_traites`

---

### GET `/signalements/:id`

Détails complets d'un signalement.

**Paramètres de route:**
- `id` (number) - Identifiant du signalement

**Retour:** `SignalementDetails`

**Vues utilisées:**
- `v_signalements_details`

---

### POST `/reparations`

Création d'une nouvelle réparation pour un signalement.

**Paramètres d'entrée:**
- `Id_Signalement` (number) - Signalement concerné
- `surface_m2` (decimal) - Surface en m²
- `budget` (decimal) - Budget en Ariary
- `date_debut` (date) - Date de début prévue
- `date_fin_prevue` (date) - Date de fin prévue
- `Id_Entreprise` (number) - Entreprise assignée
- `commentaire` (string, optionnel) - Commentaires

**Retour:** `Reparation`

**Tables utilisées:**
- `Reparation` - Création de la réparation
- `Signalement` - Mise à jour du statut
- `Entreprise` - Validation de l'entreprise
- `Status` - Attribution du statut

---

### PUT `/reparations/:id`

Modification d'une réparation existante.

**Paramètres de route:**
- `id` (number) - Identifiant de la réparation

**Paramètres d'entrée:**
- `surface_m2` (decimal, optionnel)
- `budget` (decimal, optionnel)
- `date_fin_prevue` (date, optionnel)
- `Id_Status` (number, optionnel)
- `commentaire` (string, optionnel)

**Retour:** `Reparation`

**Tables utilisées:**
- `Reparation` - Mise à jour
- `HistoriqueStatus` - Traçabilité des changements
- `Status` - Nouveau statut

---

### PUT `/reparations/:id/status`

Changement de statut d'une réparation.

**Paramètres de route:**
- `id` (number) - Identifiant de la réparation

**Paramètres d'entrée:**
- `Id_Status` (number) - Nouveau statut
- `commentaire` (string, optionnel) - Justification

**Retour:** `Reparation`

**Tables utilisées:**
- `Reparation` - Mise à jour du statut
- `HistoriqueStatus` - Enregistrement du changement
- `Status` - Validation du statut

---

### GET `/reparations`

Liste de toutes les réparations.

**Paramètres de requête (optionnels):**
- `status` (number) - Filtrer par statut
- `entreprise` (number) - Filtrer par entreprise

**Retour:** `Reparation[]`

**Tables utilisées:**
- `Reparation` - Liste des réparations
- `Signalement` - Informations du signalement
- `Entreprise` - Informations de l'entreprise
- `Status` - Libellés des statuts

---

### GET `/reparations/:id`

Détails complets d'une réparation.

**Paramètres de route:**
- `id` (number) - Identifiant de la réparation

**Retour:** `ReparationDetails`

**Tables utilisées:**
- `Reparation` - Données de la réparation
- `Signalement` - Signalement associé
- `Entreprise` - Entreprise assignée
- `Status` - Statut actuel
- `HistoriqueStatus` - Historique des modifications

---

### GET `/recapitulatif`

Tableau récapitulatif global des travaux.

**Retour:**
- `nb_signalements` (number) - Nombre total de signalements
- `nb_reparations` (number) - Nombre de réparations
- `surface_totale` (decimal) - Surface totale en m²
- `budget_total` (decimal) - Budget total en Ariary
- `avancement_pct` (decimal) - Pourcentage d'avancement

**Vues utilisées:**
- `v_recapitulatif`

---

### GET `/entreprises`

Liste de toutes les entreprises.

**Retour:** `Entreprise[]`

**Tables utilisées:**
- `Entreprise`

---

### POST `/entreprises`

Création d'une nouvelle entreprise.

**Paramètres d'entrée:**
- `nom` (string) - Nom de l'entreprise
- `telephone` (string, optionnel) - Numéro de téléphone
- `email` (string, optionnel) - Adresse email
- `adresse` (string, optionnel) - Adresse postale

**Retour:** `Entreprise`

**Tables utilisées:**
- `Entreprise` - Création

---

### GET `/users`

Liste de tous les utilisateurs.

**Paramètres de requête (optionnels):**
- `type` (number) - Filtrer par type d'utilisateur

**Retour:** `User[]`

**Tables utilisées:**
- `User_` - Liste des utilisateurs
- `TypeUser` - Types d'utilisateurs

---

### PUT `/users/:id/block`

Blocage d'un compte utilisateur.

**Paramètres de route:**
- `id` (number) - Identifiant de l'utilisateur

**Retour:** `{ success: boolean }`

**Tables utilisées:**
- `User_` - Mise à jour du champ `est_bloque`

---

### PUT `/users/:id/unblock`

Déblocage d'un compte utilisateur.

**Paramètres de route:**
- `id` (number) - Identifiant de l'utilisateur

**Retour:** `{ success: boolean }`

**Tables utilisées:**
- `User_` - Mise à jour du champ `est_bloque`

---

## 🔥 Module Firebase Sync

**Base URL:** `/api/firebase`

---

### POST `/sync/signalements`

Synchronisation des signalements depuis Firebase.

**Retour:** `{ synced: number }`

**Tables utilisées:**
- `Signalement` - Import/mise à jour
- `User_` - Association utilisateur

---

### POST `/sync/users`

Synchronisation des utilisateurs depuis Firebase.

**Retour:** `{ synced: number }`

**Tables utilisées:**
- `User_` - Import/mise à jour

---

### GET `/status`

Vérification de la connexion Firebase.

**Retour:** `{ connected: boolean }`

---

## ⚙️ Services Internes

---

### UserService

**`createUser`**
- Entrée: `{ nom, prenom, email, password, Id_type_user }`
- Sortie: `Promise<User>`
- Tables: `User_`, `TypeUser`

**`findByEmail`**
- Entrée: `email: string`
- Sortie: `Promise<User | null>`
- Tables: `User_`

**`findById`**
- Entrée: `id: number`
- Sortie: `Promise<User | null>`
- Tables: `User_`, `TypeUser`

**`updateUser`**
- Entrée: `id: number, data: Partial<User>`
- Sortie: `Promise<User>`
- Tables: `User_`

**`blockUser`**
- Entrée: `id: number`
- Sortie: `Promise<void>`
- Tables: `User_`

**`unblockUser`**
- Entrée: `id: number`
- Sortie: `Promise<void>`
- Tables: `User_`

**`validatePassword`**
- Entrée: `password: string, hash: string`
- Sortie: `Promise<boolean>`
- Tables: Aucune

---

### SessionService

**`createSession`**
- Entrée: `userId: number`
- Sortie: `Promise<Session>`
- Tables: `Session`, `Parametre`

**`validateSession`**
- Entrée: `token: string`
- Sortie: `Promise<Session | null>`
- Tables: `Session`

**`invalidateSession`**
- Entrée: `token: string`
- Sortie: `Promise<void>`
- Tables: `Session`

**`invalidateAllUserSessions`**
- Entrée: `userId: number`
- Sortie: `Promise<void>`
- Tables: `Session`

**`getSessionDuration`**
- Entrée: `typeUserId: number`
- Sortie: `Promise<number>`
- Tables: `Parametre`

---

### LoginAttemptService

**`recordAttempt`**
- Entrée: `userId: number, success: boolean, ip: string`
- Sortie: `Promise<void>`
- Tables: `TentativeConnexion`

**`getRecentAttempts`**
- Entrée: `userId: number`
- Sortie: `Promise<TentativeConnexion[]>`
- Tables: `TentativeConnexion`

**`shouldBlockUser`**
- Entrée: `userId: number`
- Sortie: `Promise<boolean>`
- Tables: `TentativeConnexion`, `Parametre`, `User_`

**`clearAttempts`**
- Entrée: `userId: number`
- Sortie: `Promise<void>`
- Tables: `TentativeConnexion`

---

## 🛡️ Middleware

---

### Authentification

**`authenticate`**
- Vérifie la validité du token de session
- Injecte l'utilisateur dans la requête

**`requireRole`**
- Entrée: `roles: string[]`
- Vérifie que l'utilisateur possède un des rôles requis

**`requireManager`**
- Accès réservé aux utilisateurs de type Manager

---

## 📊 Schéma de Base de Données

### Tables Principales

- **TypeUser** - Types d'utilisateurs (Visiteur, Utilisateur, Manager)
- **User_** - Comptes utilisateurs
- **Session** - Sessions actives
- **Parametre** - Configuration par type d'utilisateur
- **TentativeConnexion** - Historique des tentatives de connexion
- **Status** - Statuts des signalements/réparations
- **Signalement** - Signalements de problèmes routiers
- **Reparation** - Travaux de réparation
- **Entreprise** - Entreprises de construction
- **HistoriqueStatus** - Traçabilité des changements de statut

### Vues

- **v_recapitulatif** - Statistiques globales
- **v_signalements_details** - Signalements avec toutes les informations
- **v_signalements_non_traites** - Signalements en attente de traitement