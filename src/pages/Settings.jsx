import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Palette, Globe, ChevronRight } from 'lucide-react';

const Settings = () => {
    const settingsSections = [
        { icon: User, label: 'Profil Admin', desc: 'Gérer votre compte et vos accès' },
        { icon: Bell, label: 'Notifications', desc: 'Préférences d\'alertes et emails' },
        { icon: Lock, label: 'Sécurité', desc: 'Mot de passe et 2FA' },
        { icon: Palette, label: 'Apparence', desc: 'Thèmes et affichage' },
        { icon: Globe, label: 'Langue & Région', desc: 'Français (FR) • CFA' },
    ];

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Paramètres</h1>
                    <p className="text-secondary">Configuration générale de l'application</p>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '40px' }}>
                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {settingsSections.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="glass-card" style={{
                                padding: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '25px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                background: 'rgba(255,255,255,0.02)'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            >
                                <div className="flex-center" style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(0,113,227,0.1)' }}>
                                    <Icon size={26} color="var(--primary)" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>{item.label}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</p>
                                </div>
                                <ChevronRight size={18} className="text-secondary" style={{ opacity: 0.5 }} />
                            </div>
                        );
                    })}
                </div>

                <div className="flex-center flex-column" style={{ marginTop: '80px', opacity: 0.3 }}>
                    <div style={{ padding: '20px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.02)', mb: '15px' }}>
                        <SettingsIcon size={32} />
                    </div>
                    <p style={{ fontSize: '12px', letterSpacing: '1px' }}>VERSION 1.0.4 • PREMISYS TECHNOLOGY</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
