import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/ui';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts';
import type { LoginCredentials } from '../../types/auth.types';
import '../../assets/styles/pages/Login.css';

const validateLogin = (values: LoginCredentials) => {
    const errors: Partial<Record<keyof LoginCredentials, string>> = {};

    if (!values.email) {
        errors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!values.password) {
        errors.password = 'Le mot de passe est requis';
    } else if (values.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return errors;
};

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<LoginCredentials>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin,
        onSubmit: async (credentials) => {
            setLoginError(null);
            try {
                const response = await login(credentials);
                if (response.success) {
                    navigate('/dashboard');
                }
            } catch (error) {
                setLoginError(
                    error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion'
                );
            }
        },
    });

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <h1 className="login-title">SignalRoute</h1>
                    <p className="login-subtitle">Signalement et suivi de l'état des routes</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {loginError && (
                        <div className="alert alert-error" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{loginError}</span>
                        </div>
                    )}

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Adresse email"
                        placeholder="exemple@email.com"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        autoComplete="email"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        }
                    />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        label="Mot de passe"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                        autoComplete="current-password"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        }
                    />

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" name="remember" />
                            <span>Se souvenir de moi</span>
                        </label>
                        <a href="#" className="forgot-password">
                            Mot de passe oublié?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                        Se connecter
                    </Button>
                </form>

                <div className="login-footer">
                    <p>
                        Pas encore de compte?{' '}
                        <Link to="/register" className="signup-link">
                            Créer un compte
                        </Link>
                    </p>
                </div>

                <div className="login-features">
                    <div className="feature-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>Signaler un problème</span>
                    </div>
                    <div className="feature-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Suivre l'avancement</span>
                    </div>
                    <div className="feature-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Géolocalisation</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
