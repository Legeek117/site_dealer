import React from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { ShieldCheck, Clock, CheckCircle2, Search } from 'lucide-react';

const Warranty = () => {
    // Mock claims data
    const claims = [
        { id: 'cl1', saleId: 's1', issue: 'Batterie chauffe anormalement', status: 'En attente', date: '2024-01-20' },
        { id: 'cl2', saleId: 's2', issue: 'Écran scintille', status: 'Résolu', date: '2024-01-18' }
    ];

    // Lookups for performance
    const salesMap = React.useMemo(() => MOCK_SALES.reduce((acc, s) => ({ ...acc, [s.id]: s }), {}), []);
    const iphonesMap = React.useMemo(() => MOCK_IPHONES.reduce((acc, i) => ({ ...acc, [i.id]: i }), {}), []);
    const customersMap = React.useMemo(() => MOCK_CUSTOMERS.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}), []);

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Garanties & SAV</h1>
                    <p className="text-secondary">Suivi des réclamations et gestion des retours</p>
                </div>
            </header>

            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>Garanties Actives</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--success)' }}>12</p>
                </div>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>En Cours</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--warning)' }}>3</p>
                </div>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>Délai Moyen</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--primary)' }}>48h</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div className="flex-between" style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '18px' }}>Dernières Réclamations</h3>
                    <div className="search-input-wrapper" style={{ width: '300px' }}>
                        <Search size={16} className="search-icon" />
                        <input type="text" placeholder="Rechercher..." className="search-input" style={{ padding: '8px 8px 8px 35px' }} />
                    </div>
                </div>

                <div>
                    {claims.map((claim) => {
                        const sale = salesMap[claim.saleId];
                        const iphone = iphonesMap[sale?.iphoneId];
                        const customer = customersMap[sale?.customerId];
                        const isResolved = claim.status === 'Résolu';

                        return (
                            <div key={claim.id} className="flex-between" style={{ padding: '25px', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}>
                                <div className="flex-center gap-20">
                                    <div className="flex-center" style={{
                                        width: '54px',
                                        height: '54px',
                                        borderRadius: '16px',
                                        backgroundColor: isResolved ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 159, 10, 0.1)',
                                        color: isResolved ? 'var(--success)' : 'var(--warning)',
                                        border: `1px solid ${isResolved ? 'rgba(52, 199, 89, 0.05)' : 'rgba(255, 159, 10, 0.05)'}`
                                    }}>
                                        {isResolved ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                    </div>

                                    <div>
                                        <div className="flex-center gap-10" style={{ marginBottom: '6px', justifyContent: 'flex-start' }}>
                                            <h4 style={{ fontWeight: '700', fontSize: '17px' }}>{iphone?.model || 'Modèle Inconnu'}</h4>
                                            <span className="text-secondary">•</span>
                                            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--primary)' }}>{customer?.name}</span>
                                        </div>

                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', lineHeight: '1.4' }}>{claim.issue}</p>

                                        <div className="flex-center gap-15" style={{ justifyContent: 'flex-start' }}>
                                            <div className="flex-center gap-5" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Clock size={12} /> {claim.date}
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>Ouvrir le dossier</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <span className={`status-badge ${isResolved ? 'status-available' : 'status-reparation'}`} style={{ padding: '8px 16px' }}>
                                        {claim.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Warranty;
