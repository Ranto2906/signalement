"""
Script simple pour exporter la TodoList en Excel (sans dépendances externes)
Usage: python export_simple.py
"""

import csv
import re
from datetime import datetime

def parse_markdown_table(file_path):
    """Parse le fichier markdown et extrait les données du tableau"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    tasks = []
    in_main_table = False
    
    for line in lines:
        # Détecter le début du tableau principal
        if '| Categorie | Module | Taches | Type | Qui | Estimation (h) |' in line:
            in_main_table = True
            continue
        
        # Détecter la fin du tableau principal
        if in_main_table and line.strip() and not line.startswith('|'):
            in_main_table = False
            continue
        
        # Parser les lignes du tableau
        if in_main_table and line.startswith('|') and '---' not in line:
            cols = [col.strip() for col in line.split('|')[1:-1]]
            if len(cols) == 6 and cols[0] not in ['Categorie', '']:
                categorie = cols[0].replace('**', '').strip()
                module = cols[1].strip()
                taches = cols[2].strip()
                type_tache = cols[3].strip()
                qui = cols[4].strip()
                
                try:
                    estimation = int(cols[5].strip())
                except:
                    estimation = 0
                
                if categorie and module:
                    tasks.append([categorie, module, taches, type_tache, qui, estimation])
    
    return tasks

def export_to_csv(tasks, output_file):
    """Exporte les données vers un fichier CSV (compatible Excel)"""
    
    with open(output_file, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f, delimiter=';')  # Excel préfère le point-virgule
        
        # En-têtes
        writer.writerow(['Categorie', 'Module', 'Taches', 'Type', 'Qui', 'Estimation'])
        
        # Données
        writer.writerows(tasks)
    
    print(f"✅ Fichier CSV créé: {output_file}")
    print(f"📊 Total de tâches: {len(tasks)}")
    
    # Statistiques
    total_heures = sum(task[5] for task in tasks)
    membres = set(task[4] for task in tasks if task[4])
    
    print(f"👥 Membres: {', '.join(sorted(membres))}")
    print(f"⏱️  Total heures: {total_heures}h")
    
    # Résumé par membre
    print("\n📋 Résumé par membre:")
    for membre in sorted(membres):
        heures = sum(task[5] for task in tasks if task[4] == membre)
        nb_taches = len([task for task in tasks if task[4] == membre])
        print(f"  {membre}: {nb_taches} tâches, {heures}h")

def main():
    input_file = 'TodoList.md'
    output_file = f'TodoList_Export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
    
    print("🚀 Début de l'export CSV...")
    print(f"📄 Lecture: {input_file}")
    
    tasks = parse_markdown_table(input_file)
    
    if not tasks:
        print("❌ Aucune tâche trouvée!")
        return
    
    export_to_csv(tasks, output_file)
    print(f"\n✨ Terminé! Ouvrez {output_file} avec Excel")
    print("💡 Astuce: Double-cliquez sur le fichier .csv pour l'ouvrir dans Excel")

if __name__ == "__main__":
    main()
