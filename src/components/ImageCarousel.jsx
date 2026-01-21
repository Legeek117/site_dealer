import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const ImageCarousel = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="glass-card flex-center flex-column" style={{ height: '400px', backgroundColor: '#0a0a0a' }}>
                <p className="text-secondary">Aucune image disponible</p>
            </div>
        );
    }

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="carousel-container glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '100%', minHeight: '400px', backgroundColor: '#000' }}>
                <img
                    src={images[currentIndex]}
                    alt={`Product ${currentIndex + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => setIsFullScreen(true)}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800';
                    }}
                />

                {images.length > 1 && (
                    <>
                        <button className="carousel-btn prev" onClick={prevImage} style={{ left: '15px' }}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className="carousel-btn next" onClick={nextImage} style={{ right: '15px' }}>
                            <ChevronRight size={24} />
                        </button>

                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}

                <button
                    className="carousel-fullscreen-btn"
                    onClick={() => setIsFullScreen(true)}
                    style={{ position: 'absolute', top: '15px', right: '15px', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    <Maximize2 size={18} />
                </button>
            </div>

            <div className="carousel-thumbnails" style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: idx === currentIndex ? '2px solid var(--primary)' : '2px solid transparent',
                            transition: 'var(--transition)',
                            flexShrink: 0
                        }}
                    >
                        <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                ))}
            </div>

            {/* Fullscreen Overlay */}
            {isFullScreen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => setIsFullScreen(false)}
                >
                    <button
                        onClick={() => setIsFullScreen(false)}
                        style={{ position: 'absolute', top: '30px', right: '30px', backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={images[currentIndex]}
                        alt="Fullscreen"
                        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                    />
                    {images.length > 1 && (
                        <>
                            <button className="carousel-btn prev" onClick={prevImage} style={{ left: '40px', width: '50px', height: '50px' }}>
                                <ChevronLeft size={32} />
                            </button>
                            <button className="carousel-btn next" onClick={nextImage} style={{ right: '40px', width: '50px', height: '50px' }}>
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}
                </div>
            )}

            <style>{`
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
        }
        .carousel-btn:hover {
          background-color: rgba(255,255,255,0.2);
          transform: translateY(-50%) scale(1.1);
        }
        .carousel-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: var(--transition);
        }
        .dot.active {
          background-color: white;
          width: 24px;
          border-radius: 4px;
        }
        .carousel-thumbnails::-webkit-scrollbar {
          height: 4px;
        }
        .carousel-thumbnails::-webkit-scrollbar-thumb {
          background: var(--bg-hover);
          border-radius: 2px;
        }
      `}</style>
        </>
    );
};

export default ImageCarousel;
