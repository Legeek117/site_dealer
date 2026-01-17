import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ShieldCheck, Zap, Smartphone, ArrowRight } from 'lucide-react';

const Home = () => {
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
                        Le leader de la vente de smartphones premium reconditionnés et neufs.
                        Qualité certifiée, prix imbattables et garantie DealerPro.
                    </p>
                    <div className="hero-btns">
                        <Link to="/catalog" className="btn-primary-large">
                            Explorer le Stock <ArrowRight size={20} />
                        </Link>
                        <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary-large">
                            En savoir plus
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="sketchfab-embed-wrapper-hero">
                        <iframe
                            title="iPhone 17 Pro"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
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
            <section className="showcase-section">
                <div className="container flex-center mobile-column">
                    <div className="showcase-visual">
                        <div className="sketchfab-embed-wrapper-small">
                            <iframe
                                title="iPhone 15 Pro Max"
                                frameBorder="0"
                                allowFullScreen loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
                                src="https://sketchfab.com/models/090e561ffd49437ab5185ed9d07903b2/embed?autostart=1&autospin=0.1&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_stop=0"
                            ></iframe>
                        </div>
                    </div>
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
                    max-width: 500px;
                    height: 500px;
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
                    pointer-events: none; /* Disables interaction for cleaner look */
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
                .showcase-section {
                    padding: 120px 0;
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
                        padding-top: 100px; /* More space for fixed navbar */
                        padding-bottom: 50px;
                        text-align: center;
                        min-height: auto; /* Allow content to dictate height */
                    }
                    .hero-title { font-size: 48px; }
                    /* Make visual full width but shorter on mobile to not take too much vertical space */
                    .sketchfab-embed-wrapper-hero { 
                        width: 100%; 
                        height: 50vh; /* Half screen height on mobile */
                        max-height: 500px;
                    } 
                    .hero-visual {
                        position: relative; /* Stack normally on tablets/mobile? Or keep absolute? */
                        /* Let's keep absolute but maybe adjust opacity or position */
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        opacity: 0.4; /* Fade it out more on mobile */
                    }
                    .mobile-column { flex-direction: column; text-align: center; gap: 40px; }
                    .hero-btns { justify-content: center; }
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 36px; }
                    .hero-subtitle { font-size: 16px; }
                    .btn-primary-large { padding: 15px 30px; font-size: 16px; }
                    .sketchfab-embed-wrapper-hero { height: 60vh; top: 0; }
                    .hero-visual { opacity: 0.3; }
                    .home-showcase-title { font-size: 32px; }
                    .home-showcase-subtitle { font-size: 16px; }
                    .home-cta-title { font-size: 32px; }
                    .home-cta-subtitle { font-size: 16px; }
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
