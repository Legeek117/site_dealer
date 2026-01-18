import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ShieldCheck, Zap, Smartphone, ArrowRight } from 'lucide-react';

const Home = () => {
    const [isHeroLoaded, setIsHeroLoaded] = React.useState(false);
    const [isShowcaseLoaded, setIsShowcaseLoaded] = React.useState(false);

    return (
        <div className="home-container">
            {/* Hero Section with 3D */}
            <section className="hero-3d">
                <div className="hero-content fade-in">
                    <div className="badge-premium">
                        <Zap size={14} /> L'avenir est entre vos mains
                    </div>
                    <h1 className="hero-title">
                        Découvrez la <span className="text-gradient">Perfection</span> Mobile.
                    </h1>
                    <p className="hero-subtitle">
                        Vente de smartphones premium reconditionnés et neufs. Qualité certifiée et garantie.
                    </p>
                    <div className="hero-btns">
                        <Link to="/catalog" className="btn-primary-large">
                            Explorer le Stock <ArrowRight size={20} />
                        </Link>
                        <Link to="/budget" className="btn-secondary-large">
                            💸 Assistant Budget
                        </Link>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="sketchfab-embed-wrapper-hero">
                        {/* Placeholder / Loading State */}
                        <div className={`hero-placeholder ${isHeroLoaded ? 'fade-out' : ''}`}>
                            <div className="placeholder-content">
                                <div className="loading-spinner"></div>
                                <span className="loading-text">Chargement 3D...</span>
                            </div>
                        </div>

                        <iframe
                            title="iPhone 17 Pro"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
                            style={{ opacity: isHeroLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
                            onLoad={() => setIsHeroLoaded(true)}
                            src="https://sketchfab.com/models/e88c8489a48b494bb4db178c2907f737/embed?autostart=1&autospin=0.2&transparent=1&ui_hint=0&ui_infos=0&ui_controls=0&ui_watermark=0&ui_stop=0"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <section id="features" className="features-section">
                <div className="grid-3 container">
                    <FeatureCard
                        icon={<Star size={32} color="var(--primary)" />}
                        title="Qualité Certifiée"
                        desc="Chaque appareil subit 40 points de contrôle rigoureux avant la mise en vente."
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={32} color="var(--success)" />}
                        title="Garantie"
                        desc="Partez l'esprit tranquille avec notre garantie complète sur tous les modèles."
                    />
                    <FeatureCard
                        icon={<Zap size={32} color="var(--warning)" />}
                        title="Service Express"
                        desc="Livraison rapide et support client réactif via WhatsApp."
                    />
                </div>
            </section>

            {/* Secondary 3D Showcase */}
            <section className="showcase-section" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* 3D Background */}
                <div className="showcase-visual-bg">
                    <div className="sketchfab-embed-wrapper-small">
                        {/* Placeholder for showcase */}
                        <div className={`showcase-placeholder ${isShowcaseLoaded ? 'fade-out' : ''}`}>
                            <div className="placeholder-content">
                                <div className="loading-spinner"></div>
                                <span className="loading-text">Chargement 3D...</span>
                            </div>
                        </div>

                        <iframe
                            title="Apple iPhone 15 Pro and Pro Max all colors"
                            frameBorder="0"
                            allowFullScreen
                            loading="lazy"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            style={{ opacity: isShowcaseLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
                            onLoad={() => setIsShowcaseLoaded(true)}
                            src="https://sketchfab.com/models/fd64970de2b148b9a69de9aa1e9381c1/embed?autospin=0.5&autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_stop=0"
                        ></iframe>
                    </div>
                </div>

                {/* Text Content (on top) */}
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="showcase-text text-center">
                        <h2 className="home-showcase-title" style={{ fontSize: '56px', marginBottom: '20px', lineHeight: '1.1' }}>Le choix sans compromis.</h2>
                        <p className="text-secondary home-showcase-subtitle" style={{ marginBottom: '30px', fontSize: '20px' }}>
                            Que vous cherchiez la puissance pure de l'iPhone 15 Pro ou l'élégance de nos modèles reconditionnés.
                        </p>
                        <div className="spec-list flex-center flex-column">
                            <div className="spec-item"><ChevronRight size={20} color="var(--primary)" /> Batteries certifiées &gt; 85%</div>
                            <div className="spec-item"><ChevronRight size={20} color="var(--primary)" /> État cosmétique irréprochable</div>
                            <div className="spec-item"><ChevronRight size={20} color="var(--primary)" /> Accessoires inclus</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-banner">
                <div className="container text-center">
                    <h2 className="home-cta-title" style={{ fontSize: '48px', marginBottom: '20px' }}>Prêt à changer de dimension ?</h2>
                    <p className="text-secondary home-cta-subtitle" style={{ marginBottom: '40px', fontSize: '20px' }}>Votre prochain smartphone vous attend à partir de 150 000 CFA.</p>
                    <Link to="/catalog" className="btn-primary-large" style={{ display: 'inline-flex' }}>
                        Voir tout le stock maintenant
                    </Link>
                </div>
            </section>

            <style>{`
                .home-container {
                    padding-top: 80px;
                }
                .hero-3d {
                    min-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center; /* Center horizontally */
                    padding: 0 5%;
                    overflow: hidden;
                    position: relative;
                    text-align: center; /* Center text */
                }
                .hero-content {
                    flex: 1;
                    max-width: 600px;
                    z-index: 2;
                }
                .hero-visual {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 0;
                    opacity: 0.6; /* Lower opacity for readability since it's behind text */
                    pointer-events: none;
                }
                .hero-title {
                    font-size: 72px;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 25px;
                    letter-spacing: -3px;
                }
                .text-gradient {
                    background: linear-gradient(to right, #2997ff, #00d2ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hero-subtitle {
                    font-size: 20px;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 40px;
                    line-height: 1.5;
                }
                .hero-btns {
                    display: flex;
                    gap: 20px;
                    justify-content: center; /* Center buttons */
                    margin-top: 30px;
                }
                .btn-primary-large {
                    padding: 18px 40px;
                    background: var(--primary);
                    color: white;
                    border-radius: 40px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 10px 30px var(--primary-glow);
                    transition: var(--transition);
                }
                .btn-primary-large:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px var(--primary-glow);
                }
                .btn-secondary-large {
                    padding: 18px 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    border-radius: 40px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 18px;
                    transition: var(--transition);
                }
                .btn-secondary-large:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .sketchfab-embed-wrapper-hero {
                    width: 100%; /* Full width */
                    max-width: 1200px;
                    height: 800px; /* Taller */
                    overflow: hidden;
                    position: relative;
                }
                .sketchfab-embed-wrapper-hero iframe {
                    width: 100%;
                    height: 140%; /* Increase height to push UI bars out */
                    position: absolute;
                    top: -20%; /* Shift up to center */
                    left: 0;
                    pointer-events: none; /* Disables interaction for background feel */
                }
                .sketchfab-embed-wrapper-small {
                    width: 100%;
                    max-width: 1200px;
                    height: 700px;
                    overflow: hidden;
                    position: relative;
                    border-radius: 30px;
                }
                .sketchfab-embed-wrapper-small iframe {
                    width: 100%;
                    height: 140%;
                    position: absolute;
                    top: -20%;
                    left: 0;
                    pointer-events: none;
                }
                .badge-premium {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(41, 151, 255, 0.1);
                    color: var(--primary);
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 25px;
                }
                .features-section {
                    padding: 100px 0;
                    background: rgba(255, 255, 255, 0.02);
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                .showcase-visual-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 0;
                    opacity: 0.5;
                    pointer-events: none;
                }
                .showcase-section {
                    padding: 120px 0;
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .spec-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .spec-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                }
                .cta-banner {
                    padding: 150px 0;
                    background: linear-gradient(180deg, transparent, rgba(41, 151, 255, 0.05));
                }

                @media (max-width: 1024px) {
                    .hero-3d {
                        flex-direction: column;
                        padding-top: 100px;
                        padding-bottom: 50px;
                        text-align: center;
                        min-height: auto;
                    }
                    .hero-title { font-size: 48px; }
                    /* Keep Hero visual as background (absolute) */
                    .hero-visual {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        opacity: 0.4;
                    }
                    .sketchfab-embed-wrapper-hero { 
                        width: 100%; 
                        height: 50vh;
                        max-height: 500px;
                    }
                    /* Only widen the secondary showcase */
                    .sketchfab-embed-wrapper-small { 
                        width: 100%; 
                        max-width: 1200px;
                        height: 60vh;
                        max-height: 600px;
                    } 
                    .mobile-column { flex-direction: column; text-align: center; gap: 40px; }
                    .hero-btns { justify-content: center; }
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 36px; }
                    .hero-subtitle { font-size: 16px; }
                    .hero-btns { flex-direction: column; align-items: center; gap: 15px; width: 100%; }
                    .btn-primary-large, .btn-secondary-large { width: 100%; justify-content: center; padding: 15px 20px; font-size: 16px; }

                    /* Keep secondary showcase visible on mobile */
                    .sketchfab-embed-wrapper-small {
                        height: 50vh !important;
                    }
                    .home-showcase-title { font-size: 32px; }
                    .home-showcase-subtitle { font-size: 16px; }
                    .home-cta-title { font-size: 32px; }
                    .home-cta-subtitle { font-size: 16px; }
                }

                /* Loading State Styles */
                .hero-placeholder, .showcase-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 140%;
                    top: -20%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* Static Poster Image */
                    background-size: cover !important;
                    background-position: center !important;
                    z-index: 1;
                    transition: opacity 0.8s ease; /* Slower fade for smoothness */
                }

                .hero-placeholder {
                    background: url('https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1200');
                }

                .showcase-placeholder {
                    background: url('https://images.unsplash.com/photo-1696446702371-92f7495b5254?auto=format&fit=crop&q=80&w=1000');
                }

                .placeholder-content {
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(10px);
                    padding: 15px 25px;
                    border-radius: 30px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .hero-placeholder.fade-out, .showcase-placeholder.fade-out {
                    opacity: 0;
                    pointer-events: none;
                }
                
                .loading-text {
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .loading-spinner {
                    width: 24px;
                    height: 24px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    border-top-color: var(--primary);
                    animation: spin 0.8s ease-in-out infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>{title}</h3>
        <p className="text-secondary">{desc}</p>
    </div>
);

export default Home;
