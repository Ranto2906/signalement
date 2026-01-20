-- ============================================
-- SCHEMA BASE DE DONNEES COMPLET
-- Projet: Gestion des Travaux Routiers
-- ============================================
copy script.sql database\

-- Table des types d'utilisateurs (Visiteur, Utilisateur, Manager)
CREATE TABLE TypeUser(
   Id_type_user COUNTER,
   libelle VARCHAR(50) NOT NULL,  -- 'Visiteur', 'Utilisateur', 'Manager'
   PRIMARY KEY(Id_type_user)
);

-- Table des villes
CREATE TABLE Ville(
   Id_Ville COUNTER,
   nom VARCHAR(50) NOT NULL,
   latitude DECIMAL(10,8),
   longitude DECIMAL(11,8),
   PRIMARY KEY(Id_Ville)
);

-- Table des statuts des signalements
CREATE TABLE Status(
   Id_Status COUNTER,
   libelle VARCHAR(50) NOT NULL,  -- 'Nouveau', 'En cours', 'Terminé'
   couleur VARCHAR(7),  -- Code couleur hexadécimal pour affichage carte (#FF0000)
   PRIMARY KEY(Id_Status)
);

-- Table des routes/rues
CREATE TABLE Route(
   Id_Route COUNTER,
   nom VARCHAR(100) NOT NULL,
   Id_Ville INT NOT NULL,
   PRIMARY KEY(Id_Route),
   FOREIGN KEY(Id_Ville) REFERENCES Ville(Id_Ville)
);

-- Table des utilisateurs
CREATE TABLE User_(
   Id_user COUNTER,
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50),
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,  -- Hash du mot de passe
   firebase_uid VARCHAR(128),  -- UID Firebase pour synchronisation
   date_creation DATETIME DEFAULT NOW(),
   est_bloque BOOLEAN DEFAULT FALSE,
   Id_type_user INT NOT NULL,
   PRIMARY KEY(Id_user),
   FOREIGN KEY(Id_type_user) REFERENCES TypeUser(Id_type_user)
);

-- Table des paramètres par type d'utilisateur (sessions et sécurité)
CREATE TABLE Parametre(
   Id_parametre COUNTER,
   nom VARCHAR(50) NOT NULL,
   limite_tentatives INT NOT NULL DEFAULT 3,  -- Nombre max de tentatives de connexion
   duree_session INT NOT NULL DEFAULT 3600,  -- Durée session en secondes (1h par défaut)
   Id_type_user INT NOT NULL UNIQUE,  -- Unique: un seul paramètre par type
   PRIMARY KEY(Id_parametre),
   FOREIGN KEY(Id_type_user) REFERENCES TypeUser(Id_type_user)
);

-- Table des tentatives de connexion (pour le blocage)
CREATE TABLE TentativeConnexion(
   Id_tentative COUNTER,
   Id_user INT NOT NULL,
   date_tentative DATETIME DEFAULT NOW(),
   succes BOOLEAN DEFAULT FALSE,
   adresse_ip VARCHAR(45),  -- IPv4 ou IPv6
   PRIMARY KEY(Id_tentative),
   FOREIGN KEY(Id_user) REFERENCES User_(Id_user)
);

-- Table des sessions actives
CREATE TABLE Session(
   Id_session COUNTER,
   Id_user INT NOT NULL,
   token VARCHAR(255) UNIQUE NOT NULL,
   date_creation DATETIME DEFAULT NOW(),
   date_expiration DATETIME NOT NULL,
   est_active BOOLEAN DEFAULT TRUE,
   PRIMARY KEY(Id_session),
   FOREIGN KEY(Id_user) REFERENCES User_(Id_user)
);

-- Table des entreprises de construction
CREATE TABLE Entreprise(
   Id_Entreprise COUNTER,
   nom VARCHAR(100) NOT NULL,
   telephone VARCHAR(20),
   email VARCHAR(100),
   adresse TEXT,
   PRIMARY KEY(Id_Entreprise)
);

-- Table des signalements de problèmes routiers (créé par Utilisateur)
CREATE TABLE Signalement(
   Id_Signalement COUNTER,
   description TEXT,
   latitude DECIMAL(10,8) NOT NULL,
   longitude DECIMAL(11,8) NOT NULL,
   photo_url VARCHAR(255),  -- URL ou chemin de la photo
   date_signalement DATETIME DEFAULT NOW(),
   firebase_id VARCHAR(128),  -- ID du document Firebase
   est_synchronise BOOLEAN DEFAULT FALSE,  -- Synchronisé avec Firebase
   Id_user INT NOT NULL,  -- Utilisateur qui a signalé
   Id_Route INT,
   Id_Status INT NOT NULL,  -- Statut de la réparation
   PRIMARY KEY(Id_Signalement),
   FOREIGN KEY(Id_Status) REFERENCES Status(Id_Status),
   FOREIGN KEY(Id_user) REFERENCES User_(Id_user),
   FOREIGN KEY(Id_Route) REFERENCES Route(Id_Route)
);

-- Table des réparations (créé par Manager pour un Signalement)
CREATE TABLE Reparation(
   Id_Reparation COUNTER,
   surface_m2 DECIMAL(10,2) NOT NULL,  -- Surface en m²
   budget DECIMAL(15,2) NOT NULL,  -- Budget en Ariary
   date_debut DATE,  -- Date début prévue des travaux
   date_fin_prevue DATE,  -- Date fin prévue des travaux
   date_fin_reelle DATE,  -- Date réelle de fin des travaux
   commentaire TEXT,  -- Commentaires du manager
   date_creation DATETIME DEFAULT NOW(),
   date_modification DATETIME,
   Id_Signalement INT NOT NULL,  -- Signalement concerné
   Id_Entreprise INT NOT NULL,  -- Entreprise assignée
   Id_Status INT NOT NULL,  -- Statut de la réparation
   Id_user INT NOT NULL,  -- Manager qui a créé la réparation
   PRIMARY KEY(Id_Reparation),
   FOREIGN KEY(Id_Signalement) REFERENCES Signalement(Id_Signalement),
   FOREIGN KEY(Id_Entreprise) REFERENCES Entreprise(Id_Entreprise),
   FOREIGN KEY(Id_Status) REFERENCES Status(Id_Status),
   FOREIGN KEY(Id_user) REFERENCES User_(Id_user)
);

-- Table d'historique des modifications de statut des réparations
CREATE TABLE HistoriqueStatus(
   Id_Historique COUNTER,
   Id_Reparation INT NOT NULL,
   Id_Status_Ancien INT,
   Id_Status_Nouveau INT NOT NULL,
   Id_user INT NOT NULL,  -- Manager qui a modifié
   date_modification DATETIME DEFAULT NOW(),
   commentaire TEXT,
   PRIMARY KEY(Id_Historique),
   FOREIGN KEY(Id_Reparation) REFERENCES Reparation(Id_Reparation),
   FOREIGN KEY(Id_Status_Ancien) REFERENCES Status(Id_Status),
   FOREIGN KEY(Id_Status_Nouveau) REFERENCES Status(Id_Status),
   FOREIGN KEY(Id_user) REFERENCES User_(Id_user)
);

-- ============================================
-- DONNEES INITIALES
-- ============================================

-- Types d'utilisateurs
INSERT INTO TypeUser (libelle) VALUES 
   ('Visiteur'),
   ('Utilisateur'),
   ('Manager');

-- Statuts
INSERT INTO Status (libelle, couleur) VALUES 
   ('Nouveau', '#FF0000'),      -- Rouge
   ('En cours', '#FFA500'),     -- Orange
   ('Terminé', '#00FF00');      -- Vert

-- Ville par défaut
INSERT INTO Ville (nom, latitude, longitude) VALUES 
   ('Antananarivo', -18.8792, 47.5079);

-- Manager par défaut (mot de passe: admin123 - à hasher)
INSERT INTO User_ (nom, prenom, email, password, Id_type_user) VALUES 
   ('Admin', 'Manager', 'manager@example.com', 'hash_du_mot_de_passe', 3);

-- Paramètres par type d'utilisateur
INSERT INTO Parametre (nom, limite_tentatives, duree_session, Id_type_user) VALUES 
   ('Paramètres Visiteur', 3, 3600, 1),      -- 1h de session
   ('Paramètres Utilisateur', 3, 7200, 2),   -- 2h de session
   ('Paramètres Manager', 5, 14400, 3);      -- 4h de session, 5 tentatives

-- ============================================
-- INDEX POUR PERFORMANCES
-- ============================================

CREATE INDEX idx_user_email ON User_(email);
CREATE INDEX idx_user_firebase ON User_(firebase_uid);
CREATE INDEX idx_signalement_user ON Signalement(Id_user);
CREATE INDEX idx_signalement_firebase ON Signalement(firebase_id);
CREATE INDEX idx_reparation_signalement ON Reparation(Id_Signalement);
CREATE INDEX idx_reparation_status ON Reparation(Id_Status);
CREATE INDEX idx_reparation_entreprise ON Reparation(Id_Entreprise);
CREATE INDEX idx_session_token ON Session(token);
CREATE INDEX idx_session_user ON Session(Id_user);
CREATE INDEX idx_tentative_user ON TentativeConnexion(Id_user);

-- ============================================
-- VUES UTILES
-- ============================================

-- Vue pour le tableau récapitulatif
CREATE VIDISTINCT s.Id_Signalement) as nb_signalements,
   COUNT(r.Id_Reparation) as nb_reparations,
   SUM(r.surface_m2) as surface_totale,
   SUM(r.budget) as budget_total,
   ROUND(COUNT(CASE WHEN r.Id_Status = 3 THEN 1 END) * 100.0 / NULLIF(COUNT(r.Id_Reparation), 0), 2) as avancement_pct
FROM Signalement s
LEFT JOIN Reparation r ON s.Id_Signalement = r.Id_Signalement;

-- Vue pour les signalements avec détails
CREATE VIEW v_signalements_details AS
SELECT 
   s.Id_Signalement,
   s.description,
   s.latitude,
   s.longitude,
   s.photo_url,
   s.date_signalement,
   u.nom as nom_utilisateur,
   u.prenom as prenom_utilisateur,
   r.nom as nom_route,
   rep.Id_Reparation,
   rep.surface_m2,
   rep.budget,
   rep.date_debut,
   rep.date_fin_prevue,
   rep.date_fin_reelle,
   st.libelle as statut_reparation,
   st.couleur as couleur_statut,
   e.nom as nom_entreprise
FROM Signalement s
LEFT JOIN User_ u ON s.Id_user = u.Id_user
LEFT JOIN Route r ON s.Id_Route = r.Id_Route
LEFT JOIN Reparation rep ON s.Id_Signalement = rep.Id_Signalement
LEFT JOIN Status st ON rep.Id_Status = st.Id_Status
LEFT JOIN Entreprise e ON rep.Id_Entreprise = e.Id_Entreprise;

-- Vue pour les signalements sans réparation (à traiter par Manager)
CREATE VIEW v_signalements_non_traites AS
SELECT 
   s.Id_Signalement,
   s.description,
   s.latitude,
   s.longitude,
   s.photo_url,
   s.date_signalement,
   u.nom as nom_utilisateur,
   u.prenom as prenom_utilisateur,
   r.nom as nom_route
FROM Signalement s
LEFT JOIN User_ u ON s.Id_user = u.Id_user
LEFT JOIN Route r ON s.Id_Route = r.Id_Route
LEFT JOIN Reparation rep ON s.Id_Signalement = rep.Id_Signalement
WHERE rep.Id_Reparation IS NULL
LEFT JOIN Entreprise e ON s.Id_Entreprise = e.Id_Entreprise
LEFT JOIN Route r ON s.Id_Route = r.Id_Route;
