import { apiRequest } from './api';
import type { User } from '../types/auth.types';

export interface AdminUser extends User {
    blocked: boolean;
    loginAttempts: number;
    createdAt: string;
    lastLogin?: string;
}

export interface AdminParameters {
    id: string;
    type: string;
    value: unknown;
}

export const adminService = {
    // Liste des utilisateurs
    async getUsers(): Promise<AdminUser[]> {
        const response = await apiRequest<{ users: AdminUser[] }>('/admin/users', {
            method: 'GET',
        });
        return response.users;
    },

    // Utilisateurs bloqués
    async getBlockedUsers(): Promise<AdminUser[]> {
        const response = await apiRequest<{ users: AdminUser[] }>('/admin/users/blocked', {
            method: 'GET',
        });
        return response.users;
    },

    // Bloquer un utilisateur
    async blockUser(userId: string): Promise<void> {
        await apiRequest(`/admin/users/${userId}/block`, {
            method: 'POST',
        });
    },

    // Débloquer un utilisateur
    async unblockUser(userId: string): Promise<void> {
        await apiRequest(`/admin/users/${userId}/unblock`, {
            method: 'POST',
        });
    },

    // Réinitialiser les tentatives de connexion
    async resetLoginAttempts(userId: string): Promise<void> {
        await apiRequest(`/admin/users/${userId}/reset-attempts`, {
            method: 'POST',
        });
    },

    // Paramètres de configuration
    async getParameters(): Promise<AdminParameters[]> {
        const response = await apiRequest<{ parameters: AdminParameters[] }>('/admin/parameters', {
            method: 'GET',
        });
        return response.parameters;
    },

    // Modifier un paramètre
    async updateParameter(typeUserId: string, value: unknown): Promise<AdminParameters> {
        const response = await apiRequest<{ parameter: AdminParameters }>(`/admin/parameters/${typeUserId}`, {
            method: 'PUT',
            body: { value },
        });
        return response.parameter;
    },
};
