# Modèle Conceptuel de Données (MCD)

## Entités et Relations

```
┌─────────────────┐
│   TypeUser      │
├─────────────────┤
│ Id_type_user PK │
│ libelle         │
└────────┬────────┘
         │
         │ 1
         │
         │ N
┌────────┴────────┐         ┌──────────────────┐
│     User_       │─────────│   Parametre      │
├─────────────────┤  1   1  ├──────────────────┤
│ Id_user PK      │         │ Id_parametre PK  │
│ nom             │         │ nom              │
│ prenom          │         │ limite_tentatives│
│ email           │         │ duree_session    │
│ password        │         │ Id_user FK       │
│ firebase_uid    │         └──────────────────┘
│ date_creation   │
│ est_bloque      │         ┌──────────────────────┐
│ Id_type_user FK │─────────│ TentativeConnexion   │
└────────┬────────┘  1   N  ├──────────────────────┤
         │                  │ Id_tentative PK      │
         │                  │ Id_user FK           │
         │                  │ date_tentative       │
         │                  │ succes               │
         │                  │ adresse_ip           │
         │                  └──────────────────────┘
         │
         │ 1                ┌──────────────────┐
         │                  │    Session       │
         ├──────────────────├──────────────────┤
         │           1   N  │ Id_session PK    │
         │                  │ Id_user FK       │
         │                  │ token            │
         │                  │ date_creation    │
         │                  │ date_expiration  │
         │                  │ est_active       │
         │                  └──────────────────┘
         │
         │ 1
         │
         │ N
┌────────┴────────────┐
│   Signalement       │
├─────────────────────┤
│ Id_Signalement PK   │          ┌──────────────────┐
│ description         │──────────│    Status        │
│ latitude            │   N   1  ├──────────────────┤
│ longitude           │          │ Id_Status PK     │
│ photo_url           │          │ libelle          │
│ date_signalement    │          │ couleur          │
│ date_modification   │          └──────────────────┘
│ surface_m2          │
│ budget              │
│ firebase_id         │          ┌──────────────────┐
│ est_synchronise     │──────────│   Entreprise     │
│ Id_user FK          │   N   1  ├──────────────────┤
│ Id_Route FK         │          │ Id_Entreprise PK │
│ Id_Status FK        │          │ nom              │
│ Id_Entreprise FK    │          │ telephone        │
└─────────┬───────────┘          │ email            │
          │                      │ adresse          │
          │ N                    └──────────────────┘
          │
          │ 1
┌─────────┴───────┐
│     Route       │              ┌──────────────────┐
├─────────────────┤──────────────│     Ville        │
│ Id_Route PK     │       N   1  ├──────────────────┤
│ nom             │              │ Id_Ville PK      │
│ Id_Ville FK     │              │ nom              │
└─────────────────┘              │ latitude         │
                                 │ longitude        │
          ┌──────────────────────┴──────────────────┘
          │
          │ 1
          │
          │ N
┌─────────┴───────────────┐
│  HistoriqueStatus       │
├─────────────────────────┤
│ Id_Historique PK        │
│ Id_Signalement FK       │
│ Id_Status_Ancien FK     │
│ Id_Status_Nouveau FK    │
│ Id_user FK (Manager)    │
│ date_modification       │
│ commentaire             │
└─────────────────────────┘
```

## Cardinalités

### User_ ↔ TypeUser
- Un TypeUser peut avoir plusieurs Users (1,N)
- Un User a un seul TypeUser (1,1)

### User_ ↔ Parametre
- Un User a un seul Parametre (1,1)
- Un Parametre appartient à un User (1,1)

### User_ ↔ TentativeConnexion
- Un User peut avoir plusieurs TentativeConnexion (1,N)
- Une TentativeConnexion appartient à un User (1,1)

### User_ ↔ Session
- Un User peut avoir plusieurs Sessions (1,N)
- Une Session appartient à un User (1,1)

### User_ ↔ Signalement
- Un User peut créer plusieurs Signalements (1,N)
- Un Signalement est créé par un User (1,1)

### Signalement ↔ Status
- Un Status peut concerner plusieurs Signalements (1,N)
- Un Signalement a un seul Status (1,1)

### Signalement ↔ Entreprise
- Une Entreprise peut être assignée à plusieurs Signalements (0,N)
- Un Signalement peut avoir une Entreprise assignée (0,1)

### Signalement ↔ Route
- Une Route peut avoir plusieurs Signalements (0,N)
- Un Signalement peut être sur une Route (0,1)

### Route ↔ Ville
- Une Ville peut avoir plusieurs Routes (1,N)
- Une Route appartient à une Ville (1,1)

### HistoriqueStatus ↔ Signalement
- Un Signalement peut avoir plusieurs HistoriqueStatus (1,N)
- Un HistoriqueStatus concerne un Signalement (1,1)

### HistoriqueStatus ↔ Status
- Un Status peut apparaître dans plusieurs HistoriqueStatus (1,N)
- Un HistoriqueStatus a un Status ancien et nouveau (2,1)

## Règles de Gestion

1. **Authentification**
   - Un utilisateur bloqué ne peut plus se connecter
   - Après X tentatives échouées (paramétrable), le compte est bloqué
   - Une session expire après la durée définie dans Parametre

2. **Signalement**
   - Seuls les Utilisateurs et Managers peuvent créer des signalements
   - Un signalement créé a le statut "Nouveau" par défaut
   - Seul un Manager peut modifier surface_m2, budget, entreprise, et statut

3. **Synchronisation**
   - Les signalements ont un flag `est_synchronise`
   - Le Manager lance la synchronisation Firebase ↔ Base locale

4. **Historique**
   - Chaque changement de statut est enregistré dans HistoriqueStatus
   - Permet de tracer qui a fait quoi et quand
