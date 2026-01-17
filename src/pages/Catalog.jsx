import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, ShoppingCart, MessageCircle, ChevronRight, Star } from 'lucide-react';
import IPhoneViewer from '../components/iPhoneViewer';

const Catalog = ({ onSelectProduct }) => {
    const [filter, setFilter] = useState('Tous');
    const availableStock = MOCK_IPHONES.filter(i => i.status === 'Disponible');

    const models = ['Tous', ...new Set(availableStock.map(i => i.model.split(' ')[0] + ' ' + (i.model.split(' ')[1] || '')))];

    return (
        <div className="catalog-container" style={{ padding: '0px 0 100px 0' }}>
            {/* Hero Section */}
            <section className="hero" style={{
                height: '400px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #0071e3 0%, #000000 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                marginBottom: '60px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
                        Trouvez l'iPhone de vos rêves.
                    </h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '30px' }}>
                        Inspectez nos téléphones en 3D avant d'acheter. Qualité garantie, prix imbattables.
                    </p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn-primary" style={{ padding: '15px 30px' }}>Voir tout le stock</button>
                        <button className="glass-card" style={{ padding: '15px 30px', border: '1px solid white' }}>Promotions</button>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: '-100px', top: '50%;', transform: 'translateY(-50%)', opacity: 0.2, fontSize: '200px', fontWeight: '900', userSelect: 'none' }}>
                    IPHONE
                </div>
            </section>

            {/* Filters */}
            <div className="flex-between" style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {models.map(m => (
                        <button
                            key={m}
                            onClick={() => setFilter(m)}
                            style={{
                                padding: '10px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                backgroundColor: filter === m ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'var(--transition)'
                            }}
                        >
                            {m}
                        </button>
                    ))}
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Search size={18} opacity={0.5} />
                    <input type="text" placeholder="Rechercher..." style={{ border: 'none', background: 'none', color: 'white', outline: 'none' }} />
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid-3">
                {availableStock.filter(i => filter === 'Tous' || i.model.includes(filter)).map(iphone => (
                    <div
                        key={iphone.id}
                        className="glass-card product-card"
                        onClick={() => onSelectProduct(iphone)}
                        style={{
                            padding: '0',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            height: '300px',
                            background: 'radial-gradient(circle, #2c2c2e 0%, #000000 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}>
                            {/* Static preview or animated mesh */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '10px' }}>
                                    <Star size={24} fill="currentColor" />
                                </div>
                                <h3 style={{ fontSize: '24px', fontWeight: '700' }}>{iphone.model}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{iphone.capacity} • {iphone.color}</p>
                            </div>
                        </div>

                        <div style={{ padding: '25px' }}>
                            <div className="flex-between" style={{ marginBottom: '15px' }}>
                                <span className="status-badge status-available">{iphone.condition}</span>
                                <span style={{ fontWeight: '800', fontSize: '20px' }}>{iphone.sellingPrice}$</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                <span>Batterie: {iphone.batteryLevel}%</span>
                                <span>•</span>
                                <span>{iphone.faceId === 'OK' ? 'Face ID ✅' : 'No Face ID'}</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Inspecter en 3D <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
