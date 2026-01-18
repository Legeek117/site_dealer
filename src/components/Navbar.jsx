import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, ShoppingBag, Search, User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Boutique', path: '/catalog' },
        { name: 'Budget', path: '/budget' },
    ];
    // Navigation Links Definition

    const isAuthPage = location.pathname.startsWith('/admin') || location.pathname === '/login';
    if (isAuthPage) return null;

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Smartphone size={28} color="var(--primary)" />
                    <span className="logo-text" style={{ fontWeight: '800', letterSpacing: '-1px', fontSize: '20px' }}>DEALER<span className="text-primary">PRO</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-menu desktop-only">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    <button
                        className="navbar-icon-btn mobile-only"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay slide-down">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="mobile-nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    padding: 0 5%;
                }
                .navbar-scrolled {
                    height: 70px;
                    background: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .navbar-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    color: white;
                    white-space: nowrap;
                }
                .navbar-menu {
                    display: flex;
                    gap: 30px;
                }
                .nav-link {
                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 15px;
                    font-weight: 500;
                    transition: var(--transition);
                }
                .nav-link:hover, .nav-link.active {
                    color: var(--primary);
                }
                .navbar-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .navbar-icon-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: var(--transition);
                }
                .navbar-icon-btn:hover {
                    color: var(--primary);
                    transform: translateY(-2px);
                }
                .mobile-menu-overlay {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background: rgba(10, 10, 10, 0.98);
                    display: flex;
                    flex-direction: column;
                    padding: 20px 5%;
                    gap: 20px;
                    z-index: 999;
                }
                .mobile-nav-link {
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                    text-decoration: none;
                }
                @media (max-width: 768px) {
                    .navbar {
                        height: 64px;
                        padding: 0 16px;
                    }
                    .navbar-scrolled {
                        height: 64px;
                        border-bottom: none;
                    }
                    .navbar-logo span {
                        font-size: 18px;
                    }
                    .mobile-menu-overlay {
                        top: 64px;
                        padding: 16px;
                    }
                    .mobile-nav-link {
                        font-size: 20px;
                    }
                    
                    /* Explicitly handle visibility in component styles */
                    .desktop-only { display: none !important; }
                    .mobile-only { display: flex !important; }
                    
                    /* Hide logo text on very small screens to prevent overlap */
                    @media (max-width: 380px) {
                        .logo-text { display: none; }
                    }
                }
                
                /* Desktop styles (outside media query) */
                @media (min-width: 769px) {
                    .mobile-only { display: none !important; }
                    .desktop-only { display: flex !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
