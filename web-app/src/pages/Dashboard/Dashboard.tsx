import { useState, useEffect } from 'react';
import { MapView } from '../../components/Map';
import { StatsCard } from '../../components/Stats';
import type { Report, ReportSummary } from '../../types/report.types';
import '../../assets/styles/pages/Dashboard.css';

// Données de démonstration
const mockReports: Report[] = [
    {
        id: '1',
        title: 'Nid de poule Avenue de l\'Indépendance',
        description: 'Large nid de poule causant des dégâts aux véhicules',
        latitude: -18.8792,
        longitude: 47.5079,
        status: 'new',
        surfaceArea: 2.5,
        budget: 500000,
        company: 'COLAS Madagascar',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15'),
        createdBy: 'user1',
    },
    {
        id: '2',
        title: 'Route dégradée Analakely',
        description: 'Affaissement de la chaussée sur 10 mètres',
        latitude: -18.9100,
        longitude: 47.5250,
        status: 'in_progress',
        surfaceArea: 15,
        budget: 2500000,
        company: 'SOGEA-SATOM',
        createdAt: new Date('2026-01-10'),
        updatedAt: new Date('2026-01-18'),
        createdBy: 'user2',
    },
    {
        id: '3',
        title: 'Fissures Route Digue',
        description: 'Fissures importantes le long de la route',
        latitude: -18.8650,
        longitude: 47.4900,
        status: 'completed',
        surfaceArea: 8,
        budget: 1200000,
        company: 'COLAS Madagascar',
        createdAt: new Date('2026-01-05'),
        updatedAt: new Date('2026-01-19'),
        createdBy: 'user1',
    },
    {
        id: '4',
        title: 'Effondrement partiel Ambohijatovo',
        description: 'Partie de la route effondrée après les pluies',
        latitude: -18.9050,
        longitude: 47.5150,
        status: 'in_progress',
        surfaceArea: 20,
        budget: 5000000,
        company: 'RAZEL Madagascar',
        createdAt: new Date('2026-01-12'),
        updatedAt: new Date('2026-01-17'),
        createdBy: 'user3',
    },
    {
        id: '5',
        title: 'Nid de poule Isoraka',
        description: 'Plusieurs nids de poule sur 50m',
        latitude: -18.8850,
        longitude: 47.5200,
        status: 'new',
        surfaceArea: 5,
        budget: 800000,
        createdAt: new Date('2026-01-19'),
        updatedAt: new Date('2026-01-19'),
        createdBy: 'user4',
    },
];

const calculateSummary = (reports: Report[]): ReportSummary => {
    const newCount = reports.filter(r => r.status === 'new').length;
    const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
    const completedCount = reports.filter(r => r.status === 'completed').length;
    const totalSurface = reports.reduce((sum, r) => sum + r.surfaceArea, 0);
    const totalBudget = reports.reduce((sum, r) => sum + (r.budget || 0), 0);
    const progressPercentage = Math.round((completedCount / reports.length) * 100);

    return {
        totalReports: reports.length,
        totalSurface,
        totalBudget,
        progressPercentage,
        newCount,
        inProgressCount,
        completedCount,
    };
};

export function Dashboard() {
    const [reports, setReports] = useState<Report[]>([]);
    const [summary, setSummary] = useState<ReportSummary>({
        totalReports: 0,
        totalSurface: 0,
        totalBudget: 0,
        progressPercentage: 0,
        newCount: 0,
        inProgressCount: 0,
        completedCount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simuler le chargement des données
        setTimeout(() => {
            setReports(mockReports);
            setSummary(calculateSummary(mockReports));
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loader"></div>
                <p>Chargement des données...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">Tableau de bord</h1>
                    <p className="dashboard-subtitle">
                        Suivi des signalements routiers à Antananarivo
                    </p>
                </div>
                <div className="header-actions">
                    <span className="last-update">
                        Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
                    </span>
                </div>
            </header>

            <div className="dashboard-content">
                {/* Section Statistiques */}
                <section className="stats-section">
                    <StatsCard summary={summary} />
                </section>

                {/* Section Carte */}
                <section className="map-section">
                    <div className="section-header">
                        <h2 className="section-title">Carte des signalements</h2>
                        <p className="section-subtitle">
                            Survolez les marqueurs pour voir les détails
                        </p>
                    </div>
                    <div className="map-wrapper">
                        <MapView
                            reports={reports}
                            center={[-18.8792, 47.5079]}
                            zoom={13}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
