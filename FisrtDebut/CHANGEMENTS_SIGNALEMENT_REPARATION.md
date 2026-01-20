# Nouveau Modèle de Données - Signalement et Réparation

## 🔄 Changements Apportés

### Séparation Signalement / Réparation

**Ancienne structure** : Une seule table Signalement avec tout mélangé

**Nouvelle structure** : Deux tables distinctes

---

## 📋 Nouvelle Architecture

### 1️⃣ Table **Signalement** (Créée par Utilisateur)
```
- Id_Signalement
- description
- latitude, longitude
- photo_url
- date_signalement
- firebase_id
- Id_user (utilisateur qui signale)
- Id_Route
```

**Rôle** : Stocker uniquement les signalements des problèmes routiers par les utilisateurs

---

### 2️⃣ Table **Reparation** (Créée par Manager)
```
- Id_Reparation
- Id_Signalement (FK) → lien vers le signalement
- surface_m2
- budget
- date_debut
- date_fin_prevue
- date_fin_reelle
- commentaire
- Id_Entreprise (FK)
- Id_Status (FK) → Nouveau, En cours, Terminé
- Id_user (FK) → Manager qui a créé la réparation
```

**Rôle** : Gérer les réparations attribuées par le manager avec budget, entreprise, dates, etc.

---

## 🔄 Flux de Travail

### Scénario Complet

1. **Utilisateur Mobile** signale un problème
   ```
   INSERT INTO Signalement 
   (description, latitude, longitude, photo_url, Id_user, Id_Route)
   VALUES ('Nid de poule', -18.8792, 47.5079, 'photo.jpg', 5, 12)
   ```

2. **Manager Web** voit le signalement (vue `v_signalements_non_traites`)

3. **Manager** crée une réparation pour ce signalement
   ```
   INSERT INTO Reparation 
   (Id_Signalement, surface_m2, budget, date_debut, date_fin_prevue, 
    Id_Entreprise, Id_Status, Id_user)
   VALUES (1, 25.5, 5000000, '2026-01-20', '2026-02-10', 3, 1, 1)
   ```

4. **Manager** modifie le statut de la réparation
   ```
   UPDATE Reparation 
   SET Id_Status = 2, date_modification = NOW()
   WHERE Id_Reparation = 1
   ```

5. **Manager** marque la réparation comme terminée
   ```
   UPDATE Reparation 
   SET Id_Status = 3, date_fin_reelle = NOW()
   WHERE Id_Reparation = 1
   ```

---

## 📊 Vues Disponibles

### `v_recapitulatif`
Tableau récapitulatif global :
- Nombre de signalements
- Nombre de réparations
- Surface totale (m²)
- Budget total
- Avancement (%)

### `v_signalements_details`
Tous les signalements avec leurs réparations (si existantes)

### `v_signalements_non_traites`
Liste des signalements **sans réparation** → À traiter par le Manager

---

## 🔍 Requêtes Utiles

### Signalements en attente d'attribution
```sql
SELECT * FROM v_signalements_non_traites;
```

### Réparations en cours
```sql
SELECT * FROM Reparation 
WHERE Id_Status = 2;  -- En cours
```

### Signalements d'un utilisateur spécifique
```sql
SELECT s.*, r.* 
FROM Signalement s
LEFT JOIN Reparation r ON s.Id_Signalement = r.Id_Signalement
WHERE s.Id_user = 5;
```

### Réparations par entreprise
```sql
SELECT e.nom, COUNT(*) as nb_reparations, SUM(r.budget) as total_budget
FROM Reparation r
JOIN Entreprise e ON r.Id_Entreprise = e.Id_Entreprise
GROUP BY e.nom;
```

### Statistiques complètes
```sql
SELECT * FROM v_recapitulatif;
```

---

## ✅ Avantages du Nouveau Modèle

1. **Séparation des responsabilités**
   - Signalement = action de l'utilisateur
   - Réparation = gestion par le manager

2. **Un signalement peut avoir plusieurs réparations** (optionnel)
   - Si nécessaire, on peut modifier pour permettre plusieurs réparations par signalement

3. **Traçabilité améliorée**
   - Qui a créé la réparation
   - Dates de début/fin prévues vs réelles

4. **Statut clair**
   - Le statut concerne la réparation, pas le signalement
   - Un signalement peut exister sans réparation

5. **Meilleure gestion**
   - Vue des signalements non traités
   - Historique des modifications de statut

---

## 🔧 Relation entre les Tables

```
Signalement (1) ←→ (0,N) Reparation
```

- Un signalement peut avoir 0 ou plusieurs réparations
- Une réparation concerne un seul signalement

**Note** : Si vous voulez qu'un signalement ait UNE SEULE réparation, ajoutez :
```sql
CREATE UNIQUE INDEX idx_unique_reparation 
ON Reparation(Id_Signalement);
```
