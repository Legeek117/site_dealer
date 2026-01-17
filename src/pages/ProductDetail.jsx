import React, { useEffect } from 'react';
import { Smartphone, Battery, ShieldCheck, ArrowLeft, MessageCircle, Share2, Info, ChevronRight } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const ProductDetail = ({ product, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

            <div className="grid-3" style={{ gridTemplateColumns: 'minmax(300px, 1.5fr) 1fr', gap: '40px' }}>
                {/* Left: Interactive Media */}
                <div style={{ position: 'sticky', top: '20px' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>{product.brand}</span>
                            <span className="text-secondary">•</span>
                            <span className="text-secondary" style={{ fontSize: '14px' }}>Réf: #{product.id}{product.imei.slice(-4)}</span>
                        </div>
                        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px', letterSpacing: '-2px' }}>{product.model}</h1>
                        <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{product.capacity} • {product.color} • {product.condition}</p>
                    </div>

                    <ImageCarousel images={product.images} />

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
