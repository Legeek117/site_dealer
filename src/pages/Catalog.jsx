import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, ChevronRight, Star, Image as ImageIcon, Filter, DollarSign, Smartphone, Zap, Battery } from 'lucide-react';

const Catalog = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('Tous');
    const [selectedStorage, setSelectedStorage] = useState('Tous');
    const [selectedCondition, setSelectedCondition] = useState('Tous');
    const [budget, setBudget] = useState(2000000); // Default high budget in CFA
    const [isBudgetMode, setIsBudgetMode] = useState(false);

    const productGridRef = useRef(null);

    const availableStock = MOCK_IPHONES.filter(i => i.status === 'Disponible');

    // Filter Logic
    const filteredProducts = availableStock.filter(item => {
        const matchesSearch = item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'Tous' || item.brand === selectedBrand;
        const matchesStorage = selectedStorage === 'Tous' || item.capacity === selectedStorage;
        const matchesCondition = selectedCondition === 'Tous' || item.condition === selectedCondition;
        const matchesBudget = item.sellingPrice <= budget;

        return matchesSearch && matchesBrand && matchesStorage && matchesCondition && matchesBudget;
    });

    const brands = Array.from(new Set(['Tous', 'Apple', 'Samsung', 'Google', 'Redmi', 'Techno', 'Infinix', ...availableStock.map(i => i.brand)]));
    const storages = ['Tous', '64GB', '128GB', '256GB', '512GB', '1TB'];
    const conditions = ['Tous', 'Scellé', 'Occasion'];

    const scrollToStock = () => {
        productGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="catalog-container" style={{ padding: '0 0 100px 0' }}>
            {/* Hero Section */}
            <section className="hero fade-in catalog-hero" style={{
                minHeight: '450px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #050505 0%, #1c1c1e 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '60px',
                marginBottom: '60px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div className="hero-content-wrapper" style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
                    <div className="badge-new" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 15px', borderRadius: '20px', backgroundColor: 'rgba(41, 151, 255, 0.1)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <Zap size={14} /> Nouveautés Disponibles
                    </div>
                    <h1 style={{ fontWeight: '800', marginBottom: '20px', lineHeight: '1.1', letterSpacing: '-2px' }}>
                        La technologie <span className="text-primary">Premium</span> à votre portée.
                    </h1>
                    <p style={{ opacity: 0.7, marginBottom: '35px', lineHeight: '1.6' }}>
                        Découvrez notre sélection rigoureuse d'appareils Apple et Samsung.
                        Qualité certifiée, garantie incluse et prix imbattables.
                    </p>
                    <div className="hero-actions" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button onClick={scrollToStock} className="btn-primary">
                            Voir tout le stock
                        </button>
                        <button
                            onClick={() => navigate('/budget')}
                            className="glass-card btn-pulse"
                            style={{
                                padding: '12px 20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                borderRadius: '14px',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontWeight: '800', fontSize: '18px' }}>💰</span> Assistant Budget
                        </button>
                    </div>
                </div>

                {/* Abstract Visual Elements */}
                <div className="catalog-hero-visual" style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', opacity: 0.1, zIndex: 1 }}>
                    <Smartphone size={320} strokeWidth={0.5} />
                </div>
            </section>

            {/* Budget Wizard Section */}
            {isBudgetMode && (
                <section id="budget-wizard" className="slide-up" style={{ marginBottom: '40px' }}>
                    <div className="glass-card" style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.05), rgba(0,0,0,0.5))' }}>
                        <div className="flex-between" style={{ marginBottom: '20px' }}>
                            <div>
                                <h2 style={{ marginBottom: '5px', fontSize: '20px' }}>Assistant Budget</h2>
                                <p className="text-primary" style={{ fontSize: '13px', fontWeight: '600' }}>⚠️ Minimum requis : 50 000 CFA</p>
                            </div>
                            <button onClick={() => { setIsBudgetMode(false); setBudget(2000000); }} className="text-secondary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Fermer</button>
                        </div>

                        <div style={{ textAlign: 'center', padding: '10px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={budget === 0 ? '' : budget.toLocaleString()}
                                    placeholder="0"
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/[^0-9]/g, '');
                                        const numValue = rawValue === '' ? 0 : parseInt(rawValue);
                                        setBudget(numValue);
                                    }}
                                    className="budget-manual-input"
                                />
                                <span style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary)' }}>CFA</span>
                            </div>
                            <input
                                type="range"
                                min="50000"
                                max="2000000"
                                step="10000"
                                value={budget > 2000000 ? 2000000 : budget}
                                onChange={(e) => setBudget(parseInt(e.target.value))}
                                className="budget-slider"
                            />
                            <div className="flex-between text-secondary" style={{ fontSize: '14px', marginTop: '10px' }}>
                                <span>50 000 CFA</span>
                                <span>2 000 000 CFA</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                            <button onClick={scrollToStock} className="btn-primary" style={{ padding: '12px 40px' }}>
                                Voir les {filteredProducts.length} résultats
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Advanced Filters */}
            <div ref={productGridRef} className="filters-section slide-up" style={{ marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '25px' }}>
                    <div className="grid-responsive-filters" style={{ display: 'grid', gap: '20px', alignItems: 'end' }}>
                        {/* Brand Filter */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>MARQUE</label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                            >
                                {brands.map(b => <option key={b} value={b} style={{ backgroundColor: '#1c1c1e' }}>{b}</option>)}
                            </select>
                        </div>

                        {/* Storage Filter */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>STOCKAGE</label>
                            <select
                                value={selectedStorage}
                                onChange={(e) => setSelectedStorage(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                            >
                                {storages.map(s => <option key={s} value={s} style={{ backgroundColor: '#1c1c1e' }}>{s}</option>)}
                            </select>
                        </div>

                        {/* Condition Filter */}
                        <div>
                            <label className="text-secondary" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>ÉTAT</label>
                            <select
                                value={selectedCondition}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                            >
                                {conditions.map(c => <option key={c} value={c} style={{ backgroundColor: '#1c1c1e' }}>{c}</option>)}
                            </select>
                        </div>

                        {/* Search Bar */}
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Rechercher un modèle..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {(selectedBrand !== 'Tous' || selectedStorage !== 'Tous' || selectedCondition !== 'Tous' || searchTerm || budget < 2000000) && (
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => {
                                    setSelectedBrand('Tous');
                                    setSelectedStorage('Tous');
                                    setSelectedCondition('Tous');
                                    setSearchTerm('');
                                    setBudget(2000000);
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="flex-between" style={{ marginBottom: '20px', padding: '0 10px' }}>
                <p className="text-secondary">{filteredProducts.length} produits trouvés</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <span className="text-secondary">Trier par:</span>
                    <select style={{ background: 'none', border: 'none', color: 'white', fontWeight: '600', outline: 'none', cursor: 'pointer' }}>
                        <option style={{ backgroundColor: '#1c1c1e' }}>Prix: Croissant</option>
                        <option style={{ backgroundColor: '#1c1c1e' }}>Prix: Décroissant</option>
                        <option style={{ backgroundColor: '#1c1c1e' }}>Plus récents</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid-3 slide-up grid-mobile-2col">
                {filteredProducts.map(iphone => (
                    <div
                        key={iphone.id}
                        className="glass-card product-card"
                        onClick={() => navigate(`/product/${iphone.id}`)}
                        style={{
                            padding: '0',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            position: 'relative'
                        }}
                    >
                        <div className="product-card-image" style={{
                            background: '#0a0a0a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {iphone.images && iphone.images.length > 0 ? (
                                <img
                                    src={iphone.images[0]}
                                    alt={iphone.model}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className="product-image"
                                />
                            ) : (
                                <div className="flex-center flex-column" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.03), rgba(0,0,0,0.4))', color: 'var(--text-secondary)' }}>
                                    <Smartphone size={64} style={{ marginBottom: '15px', opacity: 0.1 }} strokeWidth={1} />
                                    <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.4 }}>Visuel Non Disponible</span>
                                </div>
                            )}

                            {/* Badges */}
                            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: '700' }}>
                                    {iphone.brand}
                                </div>
                                <div style={{ background: 'var(--primary)', padding: '6px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: '700', boxShadow: '0 4px 10px var(--primary-glow)' }}>
                                    {iphone.capacity}
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '25px' }}>
                            <div className="flex-between" style={{ marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{iphone.model}</h3>
                                <span style={{ fontWeight: '800', fontSize: '16px', color: 'var(--primary)' }}>{iphone.sellingPrice.toLocaleString()} CFA</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>{iphone.color} • {iphone.condition}</p>

                            <div className="flex-between" style={{ marginBottom: '25px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <Star size={14} fill="#FFD700" color="#FFD700" />
                                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Certifié</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <Battery size={14} />
                                    <span>{iphone.batteryLevel}%</span>
                                </div>
                            </div>

                            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Voir les détails <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="glass-card flex-center flex-column" style={{ gridColumn: '1 / -1', padding: '100px', gap: '20px' }}>
                        <Smartphone size={60} style={{ opacity: 0.2 }} />
                        <h2 className="text-secondary">Aucun résultat trouvé</h2>
                        <p className="text-secondary">Essayez d'ajuster vos filtres ou votre budget.</p>
                        <button
                            onClick={() => {
                                setSelectedBrand('Tous');
                                setSelectedStorage('Tous');
                                setSelectedCondition('Tous');
                                setSearchTerm('');
                                setBudget(2000000);
                            }}
                            className="btn-primary"
                            style={{ marginTop: '20px' }}
                        >
                            Réinitialiser tout
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                .catalog-container {
                    padding-top: 100px;
                    padding-inline: 5%;
                }
                @media (max-width: 1024px) {
                    .catalog-hero {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 40px 24px;
                    }
                    .catalog-hero h1 {
                        font-size: 42px;
                        line-height: 1.1;
                    }
                    .catalog-hero p {
                        font-size: 16px;
                    }
                }
                @media (max-width: 768px) {
                    .catalog-container {
                        padding-inline: 15px;
                        padding-top: 90px;
                    }
                    .catalog-hero {
                        min-height: auto;
                        margin-bottom: 40px;
                    }
                    .catalog-hero h1 {
                        font-size: 32px;
                        letter-spacing: -1px;
                    }
                    .catalog-hero-visual {
                        display: none;
                    }
                }
            `}</style>
        </div >
    );
};

export default Catalog;
