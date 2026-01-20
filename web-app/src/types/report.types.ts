// Types pour les signalements routiers

export type ReportStatus = 'new' | 'in_progress' | 'completed';

export interface Report {
    id: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    status: ReportStatus;
    surfaceArea: number; // en m²
    budget?: number;
    company?: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    photos?: string[];
}

export interface ReportSummary {
    totalReports: number;
    totalSurface: number;
    totalBudget: number;
    progressPercentage: number;
    newCount: number;
    inProgressCount: number;
    completedCount: number;
}

export interface ReportFormData {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    surfaceArea: number;
    budget?: number;
    company?: string;
    photos?: File[];
}
