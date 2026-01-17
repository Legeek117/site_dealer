import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin();
        } else {
            setError('Identifiants invalides. Veuillez réessayer.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #1c1c1e 0%, #000000 100%)'
        }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'rgba(0,113,227,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}>
                        <Shield color="var(--primary)" size={32} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Accès Administration</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Entrez vos accès pour gérer le stock</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px 15px 15px 45px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px 15px 15px 45px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            padding: '15px',
                            fontSize: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        Se connecter <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    &copy; 2024 DealerPro Dashboard. Tous droits réservés.
                </p>
            </div>
        </div>
    );
};

export default Login;
