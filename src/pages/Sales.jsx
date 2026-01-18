import React, { useState } from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { Receipt, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Sales = () => {
    const [sales] = useState(MOCK_SALES);
    const [selectedSale, setSelectedSale] = useState(null);

    // Optimization: Create lookup maps for fast access instead of using .find() in loops O(1)
    const customersMap = React.useMemo(() => MOCK_CUSTOMERS.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}), []);
    const iphonesMap = React.useMemo(() => MOCK_IPHONES.reduce((acc, i) => ({ ...acc, [i.id]: i }), {}), []);

    const handleGenerateReceipt = (sale) => {
        setSelectedSale(sale);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0071e3', '#34c759', '#ffffff']
        });
    };

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Ventes & Crédits</h1>
                    <p className="text-secondary">Historique des transactions et gestion des impayés</p>
                </div>
            </header>

            <div className="grid-3 sales-layout">
                {/* Sales List */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="glass-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Client</th>
                                    <th>Appareil</th>
                                    <th>Total</th>
                                    <th>Statut</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => {
                                    const customer = customersMap[sale.customerId];
                                    const iphone = iphonesMap[sale.iphoneId];
                                    const isPaid = sale.status.toLowerCase().replace(/\s/g, '') === 'payé';

                                    return (
                                        <tr key={sale.id}>
                                            <td style={{ whiteSpace: 'nowrap' }}>{new Date(sale.date).toLocaleDateString()}</td>
                                            <td style={{ fontWeight: '600' }}>{customer?.name}</td>
                                            <td>{iphone?.model}</td>
                                            <td style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                                                {sale.totalAmount.toLocaleString()} CFA
                                            </td>
                                            <td>
                                                <span className={`status-badge ${isPaid ? 'status-available' : 'status-reparation'}`}>
                                                    {sale.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleGenerateReceipt(sale)}
                                                    className="btn-icon"
                                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'background 0.2s' }}
                                                    title="Générer reçu"
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <Receipt size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Receipt Sidebar / Details */}
                <div className="receipt-section">
                    {selectedSale ? (
                        <div className="glass-card receipt-preview" style={{ padding: '30px', position: 'sticky', top: '30px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', pb: '20px' }}>
                                <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                    <Receipt size={24} color="white" />
                                </div>
                                <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>REÇU DE VENTE</h2>
                                <p className="text-secondary" style={{ fontSize: '11px', mt: '5px' }}>DealerPro Premium Mobile Solutions</p>
                            </div>

                            <div className="flex-column gap-20">
                                <div className="flex-between">
                                    <span className="text-secondary" style={{ fontSize: '13px' }}>N° Transaction</span>
                                    <span style={{ fontWeight: '700', fontSize: '13px' }}>#TRX-{selectedSale.id}</span>
                                </div>

                                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <p className="text-secondary" style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Informations Client</p>
                                    <p style={{ fontWeight: '600', fontSize: '15px' }}>{customersMap[selectedSale.customerId]?.name}</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', mt: '4px' }}>{customersMap[selectedSale.customerId]?.phone}</p>
                                </div>

                                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <p className="text-secondary" style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Détails Appareil</p>
                                    <p style={{ fontWeight: '600', fontSize: '15px' }}>{iphonesMap[selectedSale.iphoneId]?.model}</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', mt: '4px' }}>IMEI: {iphonesMap[selectedSale.iphoneId]?.imei}</p>
                                </div>

                                <div style={{ marginTop: '10px', padding: '20px', backgroundColor: 'rgba(0,113,227,0.05)', borderRadius: '16px' }}>
                                    <div className="flex-between" style={{ marginBottom: '12px' }}>
                                        <span className="text-secondary">Montant Total</span>
                                        <span style={{ fontWeight: '700' }}>{selectedSale.totalAmount.toLocaleString()} CFA</span>
                                    </div>
                                    <div className="flex-between" style={{ marginBottom: '12px', color: 'var(--success)' }}>
                                        <span style={{ fontSize: '14px' }}>Montant Payé</span>
                                        <span style={{ fontWeight: '600' }}>-{selectedSale.paidAmount.toLocaleString()} CFA</span>
                                    </div>
                                    {selectedSale.remainingAmount > 0 && (
                                        <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', pt: '12px', mt: '12px' }}>
                                            <div className="flex-between" style={{ color: 'var(--danger)' }}>
                                                <span style={{ fontWeight: '600' }}>Reste à payer</span>
                                                <span style={{ fontSize: '20px', fontWeight: '800' }}>{(selectedSale.totalAmount - selectedSale.paidAmount).toLocaleString()} CFA</span>
                                            </div>
                                            <div style={{ textAlign: 'right', mt: '5px' }}>
                                                <span style={{ fontSize: '11px', px: '8px', py: '3px', borderRadius: '4px', backgroundColor: 'rgba(255,59,48,0.1)', color: 'var(--danger)' }}> Échéance: {new Date(selectedSale.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="btn-primary"
                                    style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px' }}
                                    onClick={() => window.open(`https://wa.me/${customersMap[selectedSale.customerId]?.phone}?text=Bonjour, voici votre reçu pour l'achat de votre ${iphonesMap[selectedSale.iphoneId]?.model}...`, '_blank')}
                                >
                                    <Share2 size={18} /> Partager via WhatsApp
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card flex-center flex-column fade-in" style={{ padding: '60px 30px', gap: '20px', textAlign: 'center', color: 'var(--text-secondary)', minHeight: '400px' }}>
                            <div style={{ opacity: 0.1 }}>
                                <Receipt size={80} />
                            </div>
                            <p style={{ fontSize: '15px' }}>Sélectionnez une vente dans la liste pour générer et partager le reçu officiel.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sales;
