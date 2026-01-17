import React, { useEffect } from 'react';
import { Smartphone, Battery, ShieldCheck, ArrowLeft, MessageCircle, Share2, Info, ChevronRight } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const ProductDetail = ({ product, onBack }) => {
    const [viewMode, setViewMode] = React.useState('photos'); // 'photos' or '3d'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 3D Model mapping
    const getSketchfabId = (model) => {
        const m = model.toLowerCase();
        if (m.includes('15 pro max')) return '090e561ffd49437ab5185ed9d07903b2';
        if (m.includes('15 pro')) return '090e561ffd49437ab5185ed9d07903b2';
        if (m.includes('17 pro')) return 'e88c8489a48b494bb4db178c2907f737';
        if (m.includes('x') || m.includes('11') || m.includes('12')) return '02f12869e95e4695a15e3a611398742b';
        return null;
    };

    const sketchfabId = getSketchfabId(product.model);

    if (!product) return null;

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`Bonjour ! Je suis intéressé par l'${product.model} (${product.capacity}) au prix de ${product.sellingPrice.toLocaleString()} CFA. Puis-je avoir plus d'infos ? IMEI: ${product.imei}`);
        window.open(`https://wa.me/+221770000000?text=${text}`, '_blank');
    };

    return (
        <div className="product-detail-page fade-in" style={{ paddingBottom: '50px' }}>
            <button
                onClick={onBack}
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    marginBottom: '30px',
                    padding: '12px 20px',
                    borderRadius: '30px',
                    transition: 'var(--transition)'
                }}
                className="back-btn"
            >
                <ArrowLeft size={20} /> Retour au catalogue
            </button>

            <div className="grid-3 detail-layout">
                {/* Left: Interactive Media */}
                <div className="sticky-sidebar">
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>{product.brand}</span>
                            <span className="text-secondary">•</span>
                            <span className="text-secondary" style={{ fontSize: '14px' }}>Réf: #{product.id}{product.imei.slice(-4)}</span>
                        </div>
                        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px', letterSpacing: '-2px' }}>{product.model}</h1>
                        <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{product.capacity} • {product.color} • {product.condition}</p>
                    </div>

                    <div className="flex-center gap-10" style={{ marginBottom: '20px' }}>
                        <button
                            onClick={() => setViewMode('photos')}
                            className={`view-toggle ${viewMode === 'photos' ? 'active' : ''}`}
                        >
                            Photos
                        </button>
                        {sketchfabId && (
                            <button
                                onClick={() => setViewMode('3d')}
                                className={`view-toggle ${viewMode === '3d' ? 'active' : ''}`}
                            >
                                Vue 3D
                            </button>
                        )}
                    </div>

                    {viewMode === 'photos' ? (
                        <ImageCarousel images={product.images} />
                    ) : (
                        <div className="sketchfab-viewer glass-card">
                            <iframe
                                title={product.model}
                                frameBorder="0"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
                                src={`https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&transparent=1&ui_infos=0&ui_controls=0&ui_watermark=0&ui_stop=0`}
                            ></iframe>
                        </div>
                    )}

                    <div className="glass-card" style={{ marginTop: '30px', padding: '20px', display: 'flex', gap: '15px', alignItems: 'flex-start', borderLeft: '4px solid var(--primary)' }}>
                        <Info color="var(--primary)" size={14} style={{ flexShrink: 0, marginTop: '4px' }} />
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Inspection Certifiée</p>
                            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                                Cet appareil a passé avec succès nos 30 points de contrôle technique. Les photos sont 100% réelles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Info & Conversion */}
                <div className="flex-column gap-30">
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div className="flex-between" style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '20px' }}>Spécifications</h3>
                            <span className="status-badge status-available">{product.condition}</span>
                        </div>

                        <div className="flex-column gap-20">
                            <SpecRow icon={<Battery size={20} color="var(--success)" />} label="État Batterie" value={`${product.batteryLevel}%`} />
                            <SpecRow icon={<Smartphone size={20} color="var(--primary)" />} label="Face ID / Biométrie" value={product.faceId === 'OK' ? 'Fonctionnel' : 'Non fonctionnel'} />
                            <SpecRow icon={<ShieldCheck size={20} color="var(--primary)" />} label="Garantie DealerPro" value="6 mois inclus" />
                        </div>

                        <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--glass-border)' }}>
                            <div className="flex-between" style={{ marginBottom: '10px' }}>
                                <span className="text-secondary">Prix de vente</span>
                                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{product.sellingPrice.toLocaleString()} CFA</span>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--success)', fontWeight: '600', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <ChevronRight size={16} /> Disponible immédiatement
                            </p>

                            <button
                                onClick={handleWhatsApp}
                                className="btn-primary flex-center"
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    fontSize: '18px',
                                    gap: '12px',
                                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                                    marginBottom: '15px'
                                }}
                            >
                                <MessageCircle size={22} /> Commander via WhatsApp
                            </button>

                            <button className="glass-card flex-center gap-10" style={{ width: '100%', padding: '15px', fontSize: '15px', cursor: 'pointer' }}>
                                <Share2 size={18} /> Partager cette offre
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h4 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Avantages DealerPro</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <BenefitItem text="Zéro défaut caché (transparence totale)" />
                            <BenefitItem text="SAV réactif 7j/7" />
                            <BenefitItem text="Possibilité de reprise de votre ancien tel" />
                        </ul>
                    </div>

                    <div style={{ padding: '0 10px' }}>
                        <p className="text-secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                            * Le prix affiché est un prix cash. Des facilités de paiement peuvent être discutées en magasin.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .product-detail-page { padding-top: 10px; }
                    .back-btn { margin-bottom: 20px; }
                    .sketchfab-viewer { height: 350px; }
                    .detail-layout { grid-template-columns: 1fr !important; gap: 40px; }
                    .sticky-sidebar { position: relative !important; top: 0 !important; }
                }
                .detail-layout {
                    grid-template-columns: minmax(300px, 1.5fr) 1fr;
                    gap: 40px;
                }
                .sticky-sidebar {
                    position: sticky;
                    top: 20px;
                }
                .view-toggle {
                    padding: 8px 20px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                    transition: var(--transition);
                }
                .view-toggle.active {
                    background: var(--primary);
                    border-color: var(--primary);
                    box-shadow: 0 4px 15px var(--primary-glow);
                }
                .sketchfab-viewer {
                    width: 100%;
                    height: 500px;
                    overflow: hidden;
                    border-radius: 20px;
                    position: relative;
                }
                .sketchfab-viewer iframe {
                    width: 100%;
                    height: 140%; /* Crop top/bottom bars */
                    position: absolute;
                    top: -20%;
                    left: 0;
                }
            `}</style>
        </div>
    );
};

const SpecRow = ({ icon, label, value }) => (
    <div className="flex-between" style={{ padding: '12px 15px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
        <div className="flex-center gap-15" style={{ justifyContent: 'flex-start' }}>
            {icon}
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{label}</span>
        </div>
        <span style={{ fontWeight: '700', fontSize: '14px' }}>{value}</span>
    </div>
);

const BenefitItem = ({ text }) => (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
        {text}
    </li>
);

export default ProductDetail;
