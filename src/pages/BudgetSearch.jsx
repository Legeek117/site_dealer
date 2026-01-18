import React, { useState, useMemo } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowRight, Filter, Wallet } from 'lucide-react';

const BudgetSearch = () => {
    const navigate = useNavigate();
    const [budget, setBudget] = useState(300000);
    const [filterBrand, setFilterBrand] = useState('All');

    // Filter logic
    const filteredPhones = useMemo(() => {
        return MOCK_IPHONES.filter(phone => {
            const matchesBudget = phone.sellingPrice <= budget;
            const matchesBrand = filterBrand === 'All' || phone.brand === filterBrand;
            return matchesBudget && matchesBrand;
        }).sort((a, b) => b.sellingPrice - a.sellingPrice); // Best phones first
    }, [budget, filterBrand]);

    const handleBudgetChange = (e) => {
        setBudget(Number(e.target.value));
    };

    return (
        <div className="page-content slide-up" style={{ paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>

                {/* Header Section */}
                <div className="text-center" style={{ marginBottom: '40px' }}>
                    <div className="badge-premium" style={{ margin: '0 auto 20px', display: 'inline-flex' }}>
                        <Wallet size={16} /> Assistant Budget
                    </div>
                    <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Quel est votre budget ?</h1>
                    <p className="text-secondary">Trouvez le meilleur smartphone adapté à vos finances.</p>
                </div>

                {/* Wizard Controls */}
                <div className="glass-card" style={{ padding: '30px', marginBottom: '40px' }}>

                    {/* Price Display & Input */}
                    <div className="flex-center flex-column" style={{ marginBottom: '30px' }}>
                        <div className="flex-center" style={{ alignItems: 'baseline', gap: '5px' }}>
                            <input
                                type="number"
                                value={budget}
                                onChange={handleBudgetChange}
                                className="budget-manual-input"
                                step="5000"
                            />
                            <span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: '600' }}>CFA</span>
                        </div>
                        <p className="text-secondary" style={{ fontSize: '13px' }}>Budget Maximum</p>
                    </div>

                    {/* Slider */}
                    <input
                        type="range"
                        min="50000"
                        max="1500000"
                        step="10000"
                        value={budget}
                        onChange={handleBudgetChange}
                        className="budget-slider"
                    />
                    <div className="flex-between" style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                        <span>50 000 CFA</span>
                        <span>1 500 000+ CFA</span>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex-center gap-10" style={{ marginTop: '30px', flexWrap: 'wrap' }}>
                        {['All', 'Apple', 'Samsung', 'Google'].map(brand => (
                            <button
                                key={brand}
                                onClick={() => setFilterBrand(brand)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: filterBrand === brand ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                    background: filterBrand === brand ? 'rgba(0, 113, 227, 0.1)' : 'transparent',
                                    color: filterBrand === brand ? 'var(--primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {brand === 'All' ? 'Tout' : brand}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <h3 style={{ marginBottom: '20px' }}>
                    {filteredPhones.length} {filteredPhones.length > 1 ? 'modèles trouvés' : 'modèle trouvé'}
                </h3>

                {/* Results Grid */}
                <div className="grid-3 grid-mobile-2col" style={{ gap: '15px' }}>
                    {filteredPhones.map(phone => (
                        <div
                            key={phone.id}
                            className="glass-card fade-in"
                            onClick={() => navigate(`/product/${phone.id}`)}
                            style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                        >
                            <div style={{ height: '180px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={phone.images[0]}
                                    alt={phone.model}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '15px' }}>
                                <div className="flex-between" style={{ marginBottom: '5px' }}>
                                    <h4 style={{ fontSize: '15px' }}>{phone.model}</h4>
                                    <span className={`status-badge status-${phone.status.toLowerCase()}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                                        {phone.status === 'Disponible' ? 'En Stock' : phone.status}
                                    </span>
                                </div>
                                <p className="text-secondary" style={{ fontSize: '12px', marginBottom: '10px' }}>
                                    {phone.capacity} • {phone.condition}
                                </p>
                                <div className="flex-between">
                                    <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                                        {phone.sellingPrice.toLocaleString()} CFA
                                    </span>
                                    <div style={{ padding: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPhones.length === 0 && (
                        <div className="glass-card flex-center flex-column" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center' }}>
                            <Smartphone size={40} style={{ opacity: 0.3, marginBottom: '15px' }} />
                            <p>Aucun appareil trouvé pour ce budget.</p>
                            <button
                                onClick={() => setBudget(budget + 50000)}
                                className="text-primary"
                                style={{ background: 'none', border: 'none', marginTop: '10px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Augmenter le budget (+50 000)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                /* Specific Overrides for this page */
                @media (max-width: 480px) {
                    .container { padding: 20px 15px; }
                    .budget-manual-input { font-size: 36px; width: 160px; }
                    h1 { font-size: 26px !important; }
                }
            `}</style>
        </div>
    );
};

export default BudgetSearch;
