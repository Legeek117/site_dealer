import React, { useState } from 'react';
import { MOCK_CUSTOMERS, MOCK_SALES, MOCK_IPHONES } from '../data/mockData';
import { User, Plus, Search, MessageSquare, History } from 'lucide-react';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Filter Logic
    const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    // Pre-calculate sales for history to avoid .filter() in render
    const iphonesMap = React.useMemo(() => MOCK_IPHONES.reduce((acc, i) => ({ ...acc, [i.id]: i }), {}), []);

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Base Clients</h1>
                    <p className="text-secondary">{MOCK_CUSTOMERS.length} clients enregistrés</p>
                </div>
                <button className="btn-primary flex-center gap-10">
                    <Plus size={20} /> Nouveau Client
                </button>
            </header>

            <div className="grid-3 customers-layout">
                {/* Left: Customer List */}
                <div className="flex-column gap-20">
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Rechercher un client..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="flex-column gap-10" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', paddingRight: '5px' }}>
                        {filteredCustomers.map(customer => (
                            <div
                                key={customer.id}
                                onClick={() => setSelectedCustomer(customer)}
                                className="glass-card"
                                style={{
                                    padding: '20px',
                                    cursor: 'pointer',
                                    border: selectedCustomer?.id === customer.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                    background: selectedCustomer?.id === customer.id ? 'rgba(0,113,227,0.1)' : 'var(--bg-card)',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                                    <div className="flex-center" style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                        <User size={22} color={selectedCustomer?.id === customer.id ? 'var(--primary)' : 'var(--text-secondary)'} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', fontSize: '15px', color: selectedCustomer?.id === customer.id ? 'var(--primary)' : 'var(--text-main)' }}>{customer.name}</h4>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{customer.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Customer Detail & History */}
                <div className="customer-details-section">
                    {selectedCustomer ? (
                        <div className="flex-column gap-20 fade-in">
                            <div className="glass-card" style={{ padding: '30px' }}>
                                <div className="flex-between" style={{ marginBottom: '40px' }}>
                                    <div className="flex-center gap-20">
                                        <div className="flex-center" style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, var(--primary), #0077ed)', boxShadow: '0 8px 25px var(--primary-glow)' }}>
                                            <span style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>{selectedCustomer.name[0]}</span>
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: '28px' }}>{selectedCustomer.name}</h2>
                                            <div className="flex-center gap-10" style={{ justifyContent: 'flex-start', mt: '4px' }}>
                                                <span className="status-badge status-available" style={{ fontSize: '10px' }}>Client VIP</span>
                                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Dernier achat: 12 Jan 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.open(`https://wa.me/${selectedCustomer.phone}`, '_blank')}
                                        className="btn-primary"
                                        style={{ backgroundColor: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <MessageSquare size={18} /> WhatsApp
                                    </button>
                                </div>

                                <div className="grid-responsive-filters" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' }}>
                                    <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', mb: '8px' }}>Téléphone</p>
                                        <p style={{ fontWeight: '700', fontSize: '15px' }}>{selectedCustomer.phone}</p>
                                    </div>
                                    <div style={{ padding: '20px', backgroundColor: 'rgba(255,59,48,0.05)', borderRadius: '16px', border: '1px solid rgba(255,59,48,0.1)' }}>
                                        <p style={{ fontSize: '11px', color: 'var(--danger)', textTransform: 'uppercase', fontWeight: '700', mb: '8px' }}>Crédit Total</p>
                                        <p style={{ fontWeight: '800', color: 'var(--danger)', fontSize: '20px' }}>400 000 CFA</p>
                                    </div>
                                    <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', mb: '8px' }}>Localisation</p>
                                        <p style={{ fontWeight: '700', fontSize: '15px' }}>Dakar, Sénégal</p>
                                    </div>
                                </div>

                                {selectedCustomer.notes && (
                                    <div className="glass-card" style={{ padding: '20px', backgroundColor: 'rgba(255,159,10,0.05)', borderRadius: '16px', border: '1px solid rgba(255,159,10,0.15)' }}>
                                        <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start', mb: '10px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></div>
                                            <p style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: '700', textTransform: 'uppercase' }}>Note Interne</p>
                                        </div>
                                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>{selectedCustomer.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="glass-card" style={{ padding: '30px' }}>
                                <div className="flex-between" style={{ marginBottom: '25px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <History size={22} color="var(--primary)" /> Historique des Achats
                                    </h3>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).length} transactions</span>
                                </div>
                                <div className="flex-column gap-15">
                                    {MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).map(sale => {
                                        const iphone = iphonesMap[sale.iphoneId];
                                        const isPaid = sale.status.toLowerCase().replace(/\s/g, '') === 'payé';

                                        return (
                                            <div key={sale.id} className="flex-between" style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'var(--transition)' }}>
                                                <div className="flex-center gap-15" style={{ justifyContent: 'flex-start' }}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Smartphone size={20} color="var(--primary)" />
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: '700', fontSize: '15px' }}>{iphone?.model}</p>
                                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', mt: '2px' }}>{new Date(sale.date).toLocaleDateString()} • {sale.paymentType}</p>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ fontWeight: '800', fontSize: '16px', mb: '5px' }}>{sale.totalAmount.toLocaleString()} CFA</p>
                                                    <span className={`status-badge ${isPaid ? 'status-available' : 'status-reparation'}`}>
                                                        {sale.status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).length === 0 && (
                                        <div className="flex-center flex-column" style={{ padding: '60px 20px', opacity: 0.3 }}>
                                            <History size={40} style={{ mb: '15px' }} />
                                            <p>Aucun achat n'a été enregistré pour ce client.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card flex-center flex-column fade-in" style={{ height: '600px', textAlign: 'center', color: 'var(--text-secondary)', gap: '25px' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '10px' }}>
                                <User size={48} style={{ opacity: 0.1 }} />
                            </div>
                            <h2 style={{ fontSize: '20px', color: 'var(--text-main)' }}>Prêt pour une consultation ?</h2>
                            <p style={{ maxWidth: '300px', lineHeight: '1.6' }}>Sélectionnez un client à gauche pour gérer ses informations, voir son historique d'achats et ses crédits en cours.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customers;
