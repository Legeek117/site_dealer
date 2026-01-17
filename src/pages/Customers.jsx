import React, { useState } from 'react';
import { MOCK_CUSTOMERS, MOCK_SALES, MOCK_IPHONES } from '../data/mockData';
import { User, Phone, ShoppingBag, Plus, Search, MessageSquare, History } from 'lucide-react';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="customers-page">
            <header className="flex-between" style={{ marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Base Clients</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{MOCK_CUSTOMERS.length} clients enregistrés</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={20} /> Nouveau Client
                </button>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
                {/* Left: Customer List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Rechercher un client..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '10px',
                                    color: 'white'
                                }}
                            />
                        </div>
                    </div>

                    <div className="customer-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {filteredCustomers.map(customer => (
                            <div
                                key={customer.id}
                                onClick={() => setSelectedCustomer(customer)}
                                className="glass-card"
                                style={{
                                    padding: '15px',
                                    cursor: 'pointer',
                                    border: selectedCustomer?.id === customer.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                                        <User size={20} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600' }}>{customer.name}</h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{customer.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Customer Detail & History */}
                <div className="customer-detail">
                    {selectedCustomer ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '30px' }}>
                                <div className="flex-between" style={{ marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                                            <span style={{ fontSize: '24px', fontWeight: '800' }}>{selectedCustomer.name[0]}</span>
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>{selectedCustomer.name}</h2>
                                            <p style={{ color: 'var(--text-secondary)' }}>Client depuis Janvier 2024</p>
                                        </div>
                                    </div>
                                    <button onClick={() => window.open(`https://wa.me/${selectedCustomer.phone}`, '_blank')} className="glass-card" style={{ padding: '10px 20px', color: '#25D366', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <MessageSquare size={18} /> WhatsApp
                                    </button>
                                </div>

                                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                    <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Téléphone</p>
                                        <p style={{ fontWeight: '600' }}>{selectedCustomer.phone}</p>
                                    </div>
                                    <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Crédit Global</p>
                                        <p style={{ fontWeight: '600', color: 'var(--danger)' }}>400$</p>
                                    </div>
                                </div>

                                {selectedCustomer.notes && (
                                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,159,10,0.05)', borderRadius: '12px', border: '1px solid var(--warning)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: '600' }}>NOTE INTERNE</p>
                                        <p style={{ fontSize: '14px' }}>{selectedCustomer.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="glass-card" style={{ padding: '30px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <History size={20} color="var(--primary)" /> Historique des achats
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).map(sale => {
                                        const iphone = MOCK_IPHONES.find(i => i.id === sale.iphoneId);
                                        return (
                                            <div key={sale.id} className="flex-between" style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                                <div>
                                                    <p style={{ fontWeight: '600' }}>{iphone?.model}</p>
                                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(sale.date).toLocaleDateString()} • {sale.paymentType}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ fontWeight: '700' }}>{sale.totalAmount}$</p>
                                                    <span style={{ fontSize: '11px' }} className={`status-badge status-${sale.status.toLowerCase().replace(' ', '') === 'payé' ? 'available' : 'reparation'}`}>
                                                        {sale.status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyCenter: 'center', textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
                            <User size={60} opacity={0.2} style={{ marginBottom: '20px' }} />
                            <p>Sélectionnez un client pour voir son historique complet et ses crédits en cours.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customers;
