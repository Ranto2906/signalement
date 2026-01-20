@echo off
echo ========================================
echo  EXPORT TODOLIST VERS EXCEL
echo ========================================
echo.

echo Verification de Python...
python --version
if errorlevel 1 (
    echo ERREUR: Python n'est pas installe!
    pause
    exit /b 1
)

echo.
echo Choisissez la methode d'export:
echo [1] Export CSV simple (pas de dependances)
echo [2] Export Excel complet (necessite pandas et openpyxl)
echo.
set /p choix="Votre choix (1 ou 2): "

if "%choix%"=="1" (
    echo.
    echo Lancement de l'export CSV...
    python export_simple.py
    if errorlevel 1 (
        echo ERREUR lors de l'export!
        pause
        exit /b 1
    )
) else if "%choix%"=="2" (
    echo.
    echo Installation des dependances necessaires...
    echo Cela peut prendre quelques minutes...
    pip install pandas openpyxl --quiet
    
    echo.
    echo Lancement de l'export Excel...
    python export_todo_to_excel.py
    if errorlevel 1 (
        echo ERREUR lors de l'export!
        pause
        exit /b 1
    )
) else (
    echo Choix invalide!
    pause
    exit /b 1
)

echo.
echo ========================================
echo  EXPORT TERMINE!
echo ========================================
pause
