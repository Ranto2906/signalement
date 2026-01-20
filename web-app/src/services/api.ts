const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.88.228:3001/api';

interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    headers?: Record<string, string>;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const { method, body, headers = {} } = options;

    // Récupérer le token d'authentification
    const token = localStorage.getItem('auth_token');

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        credentials: 'include',
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
}
