"""
Script pour exporter la TodoList en fichier Excel
Usage: python export_todo_to_excel.py
"""

import pandas as pd
import re
from datetime import datetime

def parse_markdown_table(file_path):
    """Parse le fichier markdown et extrait les données du tableau"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Trouver le tableau principal des tâches
    lines = content.split('\n')
    
    # Données pour le tableau principal
    tasks = []
    in_main_table = False
    
    for i, line in enumerate(lines):
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
            # Nettoyer et extraire les colonnes
            cols = [col.strip() for col in line.split('|')[1:-1]]
            if len(cols) == 6 and cols[0] not in ['Categorie', '']:
                # Nettoyer les marqueurs Markdown (**, etc.)
                categorie = cols[0].replace('**', '').strip()
                module = cols[1].strip()
                taches = cols[2].strip()
                type_tache = cols[3].strip()
                qui = cols[4].strip()
                
                # Extraire l'estimation (nombre)
                estimation_str = cols[5].strip()
                try:
                    estimation = int(estimation_str)
                except:
                    estimation = 0
                
                if categorie and module:  # Ignorer les lignes vides
                    tasks.append({
                        'Categorie': categorie,
                        'Module': module,
                        'Taches': taches,
                        'Type': type_tache,
                        'Qui': qui,
                        'Estimation': estimation
                    })
    
    return tasks

def create_summary_by_member(df):
    """Crée un résumé par membre"""
    summary = df.groupby('Qui').agg({
        'Estimation': 'sum',
        'Taches': 'count'
    }).reset_index()
    summary.columns = ['Qui', 'Total Heures', 'Nombre de Taches']
    summary = summary.sort_values('Total Heures', ascending=False)
    return summary

def create_summary_by_module(df):
    """Crée un résumé par module"""
    summary = df.groupby('Categorie').agg({
        'Estimation': 'sum',
        'Taches': 'count'
    }).reset_index()
    summary.columns = ['Module', 'Total Heures', 'Nombre de Taches']
    summary = summary.sort_values('Total Heures', ascending=False)
    return summary

def create_summary_by_type(df):
    """Crée un résumé par type"""
    summary = df.groupby('Type').agg({
        'Estimation': 'sum',
        'Taches': 'count'
    }).reset_index()
    summary.columns = ['Type', 'Total Heures', 'Nombre de Taches']
    summary = summary.sort_values('Total Heures', ascending=False)
    return summary

def export_to_excel(tasks, output_file):
    """Exporte les données vers Excel avec plusieurs feuilles"""
    
    # Créer le DataFrame principal
    df = pd.DataFrame(tasks)
    
    # Créer le fichier Excel avec plusieurs feuilles
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Feuille 1: Toutes les tâches
        df.to_excel(writer, sheet_name='Toutes les Taches', index=False)
        
        # Feuille 2: Résumé par membre
        summary_member = create_summary_by_member(df)
        summary_member.to_excel(writer, sheet_name='Resume par Membre', index=False)
        
        # Feuille 3: Résumé par module
        summary_module = create_summary_by_module(df)
        summary_module.to_excel(writer, sheet_name='Resume par Module', index=False)
        
        # Feuille 4: Résumé par type
        summary_type = create_summary_by_type(df)
        summary_type.to_excel(writer, sheet_name='Resume par Type', index=False)
        
        # Feuille 5: Tâches par membre (séparé)
        for member in df['Qui'].unique():
            if member:  # Ignorer les valeurs vides
                member_tasks = df[df['Qui'] == member]
                sheet_name = f'Taches {member}'[:31]  # Limite Excel: 31 caractères
                member_tasks.to_excel(writer, sheet_name=sheet_name, index=False)
        
        # Formater les feuilles
        workbook = writer.book
        
        # Formater la feuille principale
        worksheet = writer.sheets['Toutes les Taches']
        for column in worksheet.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)
            worksheet.column_dimensions[column_letter].width = adjusted_width
    
    print(f"✅ Fichier Excel créé avec succès: {output_file}")
    print(f"📊 Total de tâches exportées: {len(df)}")
    print(f"👥 Membres: {', '.join(df['Qui'].unique())}")
    print(f"⏱️  Total heures estimées: {df['Estimation'].sum()}h")

def main():
    # Chemins des fichiers
    input_file = 'TodoList.md'
    output_file = f'TodoList_Export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx'
    
    print("🚀 Début de l'export...")
    print(f"📄 Lecture du fichier: {input_file}")
    
    # Parser le fichier markdown
    tasks = parse_markdown_table(input_file)
    
    if not tasks:
        print("❌ Aucune tâche trouvée dans le fichier!")
        return
    
    # Exporter vers Excel
    export_to_excel(tasks, output_file)
    print(f"\n✨ Export terminé! Ouvrez le fichier: {output_file}")

if __name__ == "__main__":
    main()
