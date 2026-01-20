import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const profile = await authService.getProfile();
            setUser(profile);
        } catch {
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        }
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const token = authService.getToken();
            if (token) {
                const isValid = await authService.verifySession();
                if (isValid) {
                    const savedUser = authService.getUser();
                    if (savedUser) {
                        setUser(savedUser);
                    } else {
                        await refreshUser();
                    }
                } else {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [refreshUser]);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await authService.login(credentials);
        if (response.success && response.user) {
            setUser(response.user);
        }
        return response;
    };

    const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        return authService.register(credentials);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
}
