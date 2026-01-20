import { apiRequest } from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/auth.types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiRequest<AuthResponse>('/auth/login', {
            method: 'POST',
            body: credentials,
        });

        if (response.token) {
            localStorage.setItem(TOKEN_KEY, response.token);
        }
        if (response.user) {
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        }

        return response;
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const { confirmPassword, ...registerData } = credentials;
        const response = await apiRequest<AuthResponse>('/auth/register', {
            method: 'POST',
            body: registerData,
        });

        return response;
    },

    async logout(): Promise<void> {
        try {
            await apiRequest('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    },

    async getProfile(): Promise<User> {
        const response = await apiRequest<{ user: User }>('/auth/me', {
            method: 'GET',
        });
        return response.user;
    },

    async verifySession(): Promise<boolean> {
        try {
            await apiRequest('/auth/verify-session', { method: 'GET' });
            return true;
        } catch {
            return false;
        }
    },

    async updateProfile(data: Partial<User>): Promise<User> {
        const response = await apiRequest<{ user: User }>('/auth/update', {
            method: 'PUT',
            body: data,
        });
        if (response.user) {
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        }
        return response.user;
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUser(): User | null {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
