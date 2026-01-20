export const APP_NAME = 'SignalRoute';

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    MAP: '/map',
    REPORTS: '/reports',
    NEW_REPORT: '/reports/new',
    REPORT_DETAIL: '/reports/:id',
    SYNC: '/sync',
    USERS: '/users',
    PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    REPORTS: {
        LIST: '/reports',
        CREATE: '/reports',
        DETAIL: (id: string) => `/reports/${id}`,
        UPDATE: (id: string) => `/reports/${id}`,
        DELETE: (id: string) => `/reports/${id}`,
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/profile',
    },
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'user_data',
    THEME: 'app_theme',
} as const;

export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
