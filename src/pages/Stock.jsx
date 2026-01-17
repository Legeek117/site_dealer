import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, Plus, Battery, Smartphone, ShieldCheck, X, Camera, Save } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const Stock = () => {
    const [selectedIPhone, setSelectedIPhone] = useState(MOCK_IPHONES[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form state correctly handling multiple images
    const [newProduct, setNewProduct] = useState({
        model: '',
        brand: 'Apple',
        capacity: '128GB',
        color: '',
        imei: '',
        batteryLevel: 100,
        condition: 'Scellé',
        purchasePrice: '',
        sellingPrice: '',
        images: [''] // Start with one empty string for the first image URL
    });

    const filteredStock = MOCK_IPHONES.filter(item =>
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.imei.includes(searchTerm)
    );

    const handleAddImageUrl = () => {
        setNewProduct({ ...newProduct, images: [...newProduct.images, ''] });
    };

    const handleImageUrlChange = (index, value) => {
        const updatedImages = [...newProduct.images];
        updatedImages[index] = value;
        setNewProduct({ ...newProduct, images: updatedImages });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct({ ...newProduct, images: updatedImages.length ? updatedImages : [''] });
    };

    return (
        <div className="page-content slide-up">
            <header className="page-header">
                <div>
                    <h1>Gestion du Stock</h1>
                    <p className="text-secondary">{MOCK_IPHONES.length} appareils au total • {MOCK_IPHONES.filter(i => i.status === 'Disponible').length} disponibles</p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex-center gap-10">
                    <Plus size={20} /> Ajouter un Produit
                </button>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr', alignItems: 'start' }}>
                {/* Sidebar: List */}
                <div className="flex-column gap-20">
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Modèle, Marque ou IMEI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="flex-column gap-10" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', paddingRight: '5px' }}>
                        {filteredStock.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedIPhone(item)}
                                className="glass-card"
                                style={{
                                    padding: '15px',
                                    cursor: 'pointer',
                                    border: selectedIPhone.id === item.id ? '1px solid var(--primary)' : 'var(--glass-border)',
                                    background: selectedIPhone.id === item.id ? 'var(--bg-hover)' : 'var(--bg-card)',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <div className="flex-between" style={{ marginBottom: '5px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{item.model}</h4>
                                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '800' }}>{item.sellingPrice}$</span>
                                </div>
                                <div className="flex-between">
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.brand} • {item.capacity} • {item.imei.slice(-6)}</p>
                                    <span className={`status-badge status-${item.status.toLowerCase()}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main: Product Details & Management */}
                <div className="flex-column gap-20">
                    {selectedIPhone ? (
                        <>
                            <div style={{ height: '400px' }}>
                                <ImageCarousel images={selectedIPhone.images} />
                            </div>

                            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                <SpecCard icon={<Battery size={20} color="var(--success)" />} label="Santé" value={`${selectedIPhone.batteryLevel}%`} />
                                <SpecCard icon={<Smartphone size={20} color="var(--primary)" />} label="Identité" value={selectedIPhone.brand} />
                                <SpecCard icon={<ShieldCheck size={20} color="var(--warning)" />} label="État" value={selectedIPhone.condition} />
                            </div>

                            <div className="glass-card" style={{ padding: '30px' }}>
                                <div className="flex-between" style={{ marginBottom: '25px' }}>
                                    <h3>Informations Techniques</h3>
                                    <button className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Modifier</button>
                                </div>

                                <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                    <div className="flex-column gap-15">
                                        <InfoRow label="IMEI" value={selectedIPhone.imei} />
                                        <InfoRow label="Modèle" value={selectedIPhone.model} />
                                        <InfoRow label="Capacité" value={selectedIPhone.capacity} />
                                        <InfoRow label="Couleur" value={selectedIPhone.color} />
                                    </div>
                                    <div className="flex-column gap-15">
                                        <InfoRow label="Prix d'achat" value={`${selectedIPhone.purchasePrice}$`} color="var(--danger)" />
                                        <InfoRow label="Prix de vente" value={`${selectedIPhone.sellingPrice}$`} color="var(--success)" weight="800" />
                                        <InfoRow label="Date d'entrée" value={new Date(selectedIPhone.createdAt).toLocaleDateString()} />
                                        <InfoRow label="Marge brute" value={`${selectedIPhone.sellingPrice - selectedIPhone.purchasePrice}$`} />
                                    </div>
                                </div>

                                {selectedIPhone.defects.length > 0 && (
                                    <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'rgba(255,69,58,0.05)', borderRadius: '12px', border: '1px solid rgba(255,69,58,0.2)' }}>
                                        <h4 style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            ⚠️ Défauts Signalés
                                        </h4>
                                        <p style={{ fontSize: '14px' }}>{selectedIPhone.defects.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="glass-card flex-center flex-column" style={{ height: '400px', gap: '20px' }}>
                            <Smartphone size={60} style={{ opacity: 0.1 }} />
                            <p className="text-secondary">Sélectionnez un appareil pour voir ses détails</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '40px' }}>
                        <div className="flex-between" style={{ marginBottom: '30px' }}>
                            <h2>Ajouter un Nouveau Produit</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form className="flex-column gap-20">
                            <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <FormGroup label="Marque">
                                    <select value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} className="form-input">
                                        <option>Apple</option>
                                        <option>Samsung</option>
                                        <option>Google</option>
                                        <option>Autre</option>
                                    </select>
                                </FormGroup>
                                <FormGroup label="Modèle">
                                    <input type="text" placeholder="ex: iPhone 15 Pro" className="form-input" value={newProduct.model} onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })} />
                                </FormGroup>
                            </div>

                            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                <FormGroup label="Capacité">
                                    <select className="form-input" value={newProduct.capacity} onChange={(e) => setNewProduct({ ...newProduct, capacity: e.target.value })}>
                                        <option>64GB</option>
                                        <option>128GB</option>
                                        <option>256GB</option>
                                        <option>512GB</option>
                                        <option>1TB</option>
                                    </select>
                                </FormGroup>
                                <FormGroup label="Couleur">
                                    <input type="text" placeholder="Noir, Titane..." className="form-input" value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Batterie (%)">
                                    <input type="number" className="form-input" value={newProduct.batteryLevel} onChange={(e) => setNewProduct({ ...newProduct, batteryLevel: e.target.value })} />
                                </FormGroup>
                            </div>

                            <FormGroup label="IMEI">
                                <input type="text" placeholder="Numéro IMEI" className="form-input" value={newProduct.imei} onChange={(e) => setNewProduct({ ...newProduct, imei: e.target.value })} />
                            </FormGroup>

                            <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <FormGroup label="Prix d'achat ($)">
                                    <input type="number" className="form-input" value={newProduct.purchasePrice} onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Prix de vente ($)">
                                    <input type="number" className="form-input" value={newProduct.sellingPrice} onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} />
                                </FormGroup>
                            </div>

                            <FormGroup label="Images (URLs)">
                                <div className="flex-column gap-10">
                                    {newProduct.images.map((url, index) => (
                                        <div key={index} className="flex-center gap-10">
                                            <input
                                                type="text"
                                                placeholder="Lien de l'image"
                                                className="form-input"
                                                style={{ flex: 1 }}
                                                value={url}
                                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                            />
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="btn-icon" style={{ padding: '10px' }}>
                                                <X size={18} color="var(--danger)" />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddImageUrl} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', width: 'fit-content' }}>
                                        + Ajouter une autre image
                                    </button>
                                </div>
                            </FormGroup>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                                <button type="button" className="btn-primary flex-center gap-10" style={{ flex: 1, padding: '15px' }}>
                                    <Save size={20} /> Enregistrer le produit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="glass-card"
                                    style={{ flex: 1, padding: '15px', cursor: 'pointer' }}
                                >
                                    Fermer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .form-input {
                    width: 100%;
                    padding: 12px 15px;
                    border-radius: 10px;
                    background-color: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    outline: none;
                    transition: var(--transition);
                }
                .form-input:focus {
                    border-color: var(--primary);
                }
                .btn-icon:hover {
                    background-color: rgba(255,255,255,0.05);
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

const SpecCard = ({ icon, label, value }) => (
    <div className="glass-card flex-center" style={{ padding: '20px', gap: '15px', justifyContent: 'flex-start' }}>
        <div style={{ padding: '10px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>{icon}</div>
        <div>
            <p className="text-secondary" style={{ fontSize: '11px', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontWeight: '700' }}>{value}</p>
        </div>
    </div>
);

const InfoRow = ({ label, value, color = 'var(--text-main)', weight = '600' }) => (
    <div className="flex-between">
        <span className="text-secondary" style={{ fontSize: '14px' }}>{label}</span>
        <span style={{ color, fontWeight: weight, fontSize: '14px' }}>{value}</span>
    </div>
);

const FormGroup = ({ label, children }) => (
    <div className="flex-column gap-8">
        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>{label.toUpperCase()}</label>
        {children}
    </div>
);

export default Stock;
