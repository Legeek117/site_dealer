import React, { useState } from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { ShieldCheck, AlertCircle, Clock, CheckCircle2, Search, Smartphone } from 'lucide-react';

const Warranty = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock claims data
    const claims = [
        { id: 'cl1', saleId: 's1', issue: 'Batterie chauffe anormalement', status: 'En attente', date: '2024-01-20' },
        { id: 'cl2', saleId: 's2', issue: 'Écran scintille', status: 'Résolu', date: '2024-01-18' }
    ];

    return (
        <div className="warranty-page">
            <header className="flex-between" style={{ marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Garanties & Réclamations</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Suivi des services après-vente et retours</p>
                </div>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Garanties Actives</h3>
                    <p style={{ fontSize: '32px', fontWeight: '800', color: 'var(--success)' }}>12</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Réclamations En cours</h3>
                    <p style={{ fontSize: '32px', fontWeight: '800', color: 'var(--warning)' }}>3</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Délai Moyen Réparation</h3>
                    <p style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>48h</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '18px' }}>Réclamations récentes</h3>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                        <input type="text" placeholder="Rechercher..." style={{ padding: '8px 8px 8px 35px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
                    </div>
                </div>

                <div className="claims-list">
                    {claims.map((claim) => {
                        const sale = MOCK_SALES.find(s => s.id === claim.saleId);
                        const iphone = MOCK_IPHONES.find(i => i.id === sale?.iphoneId);
                        const customer = MOCK_CUSTOMERS.find(c => c.id === sale?.customerId);

                        return (
                            <div key={claim.id} style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '20px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    backgroundColor: claim.status === 'Résolu' ? 'rgba(52,199,89,0.1)' : 'rgba(255,159,10,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyCenter: 'center',
                                    flexShrink: 0
                                }}>
                                    {claim.status === 'Résolu' ? <CheckCircle2 color="var(--success)" /> : <Clock color="var(--warning)" />}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div className="flex-between" style={{ marginBottom: '5px' }}>
                                        <h4 style={{ fontWeight: '700' }}>{iphone?.model} - {customer?.name}</h4>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{claim.date}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>{claim.issue}</p>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer' }}>Voir détails transaction</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>•</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>IMEI: {iphone?.imei}</span>
                                    </div>
                                </div>

                                <div style={{ alignSelf: 'center' }}>
                                    <span className={`status-badge status-${claim.status === 'Résolu' ? 'available' : 'reparation'}`}>
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
