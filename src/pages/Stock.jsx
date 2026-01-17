import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, Plus, Battery, Smartphone, ShieldCheck, X, Camera, Save, Upload, Trash2, Edit } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const Stock = () => {
    const [selectedIPhone, setSelectedIPhone] = useState(MOCK_IPHONES[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing

    // Form state
    const initialProductState = {
        model: '',
        brand: 'Apple',
        capacity: '128GB',
        color: '',
        imei: '',
        batteryLevel: 100,
        condition: 'Scellé',
        purchasePrice: '',
        sellingPrice: '',
        images: ['']
    };

    const [newProduct, setNewProduct] = useState(initialProductState);

    const filteredStock = MOCK_IPHONES.filter(item =>
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.imei.includes(searchTerm)
    );

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct(prev => ({
                    ...prev,
                    images: [...prev.images.filter(img => img !== ''), reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct({ ...newProduct, images: updatedImages.length ? updatedImages : [] });
    };

    const handleEditProduct = () => {
        setNewProduct(selectedIPhone);
        setIsEditing(true);
        setIsAddModalOpen(true);
    };

    const handleDeleteProduct = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'${selectedIPhone.model} ?`)) {
            // In a real app, this would delete from the backend
            alert('Produit supprimé (Simulation)');
            setSelectedIPhone(null);
        }
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        if (isEditing) {
            alert('Produit modifié avec succès ! (Simulation)');
            // Update the selected product with the new values locally to show immediate feedback
            setSelectedIPhone({ ...newProduct });
        } else {
            alert('Nouveau produit ajouté ! (Simulation)');
        }
        setIsAddModalOpen(false);
        setNewProduct(initialProductState); // Reset form
        setIsEditing(false);
    };

    const openAddModal = () => {
        setNewProduct(initialProductState);
        setIsEditing(false);
        setIsAddModalOpen(true);
    };

    return (
        <div className="page-content slide-up">
            <header className="page-header">
                <div>
                    <h1>Gestion du Stock</h1>
                    <p className="text-secondary">{MOCK_IPHONES.length} appareils au total • {MOCK_IPHONES.filter(i => i.status === 'Disponible').length} disponibles</p>
                </div>
                <button onClick={openAddModal} className="btn-primary flex-center gap-10">
                    <Plus size={20} /> Ajouter un Produit
                </button>
            </header>

            <div className="grid-3 stock-layout">
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
                                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '800' }}>{item.sellingPrice.toLocaleString()} CFA</span>
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
                                    <div className="flex-center gap-10">
                                        <button
                                            onClick={handleEditProduct}
                                            className="text-primary flex-center gap-5"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            <Edit size={16} /> Modifier
                                        </button>
                                        <button
                                            onClick={handleDeleteProduct}
                                            className="text-danger flex-center gap-5"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            <Trash2 size={16} /> Supprimer
                                        </button>
                                    </div>
                                </div>

                                <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                    <div className="flex-column gap-15">
                                        <InfoRow label="IMEI" value={selectedIPhone.imei} />
                                        <InfoRow label="Modèle" value={selectedIPhone.model} />
                                        <InfoRow label="Capacité" value={selectedIPhone.capacity} />
                                        <InfoRow label="Couleur" value={selectedIPhone.color} />
                                    </div>
                                    <div className="flex-column gap-15">
                                        <InfoRow label="Prix d'achat" value={`${selectedIPhone.purchasePrice.toLocaleString()} CFA`} color="var(--danger)" />
                                        <InfoRow label="Prix de vente" value={`${selectedIPhone.sellingPrice.toLocaleString()} CFA`} color="var(--success)" weight="800" />
                                        <InfoRow label="Date d'entrée" value={new Date(selectedIPhone.createdAt).toLocaleDateString()} />
                                        <InfoRow label="Marge brute" value={`${(selectedIPhone.sellingPrice - selectedIPhone.purchasePrice).toLocaleString()} CFA`} />
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
                            <h2>{isEditing ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form className="flex-column gap-20" onSubmit={handleSaveProduct}>
                            <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <FormGroup label="Marque">
                                    <select value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} className="form-input">
                                        <option>Apple</option>
                                        <option>Samsung</option>
                                        <option>Google</option>
                                        <option>Redmi</option>
                                        <option>Techno</option>
                                        <option>Infinix</option>
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
                                <FormGroup label="Prix d'achat (CFA)">
                                    <input type="number" className="form-input" value={newProduct.purchasePrice} onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Prix de vente (CFA)">
                                    <input type="number" className="form-input" value={newProduct.sellingPrice} onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} />
                                </FormGroup>
                            </div>

                            <FormGroup label="Images du Produit">
                                <div className="flex-column gap-15">
                                    <label className="upload-zone">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <Upload size={32} color="var(--primary)" />
                                        <p style={{ marginTop: '10px', fontWeight: '600' }}>Cliquez pour uploader des images</p>
                                        <p className="text-secondary" style={{ fontSize: '12px', marginTop: '5px' }}>JPG, PNG, WEBP (Max 5MB par image)</p>
                                    </label>

                                    {newProduct.images.filter(img => img).length > 0 && (
                                        <div className="image-preview-grid">
                                            {newProduct.images.filter(img => img).map((img, index) => (
                                                <div key={index} className="image-preview-item">
                                                    <img src={img} alt={`Preview ${index + 1}`} />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="remove-image-btn"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </FormGroup>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                                <button type="submit" className="btn-primary flex-center gap-10" style={{ flex: 1, padding: '15px' }}>
                                    <Save size={20} /> {isEditing ? 'Sauvegarder les modifications' : 'Enregistrer le produit'}
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
                .stock-layout {
                    grid-template-columns: minmax(300px, 1fr) 2fr;
                    align-items: start;
                }
                @media (max-width: 1024px) {
                    .stock-layout {
                        grid-template-columns: 1fr;
                    }
                }
                
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
                .upload-zone {
                    border: 2px dashed rgba(41, 151, 255, 0.3);
                    border-radius: 15px;
                    padding: 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: var(--transition);
                    background: rgba(41, 151, 255, 0.03);
                }
                .upload-zone:hover {
                    border-color: var(--primary);
                    background: rgba(41, 151, 255, 0.08);
                }
                .image-preview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 15px;
                }
                .image-preview-item {
                    position: relative;
                    aspect-ratio: 1;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 2px solid rgba(255,255,255,0.1);
                }
                .image-preview-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .remove-image-btn {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(255, 69, 58, 0.9);
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    transition: var(--transition);
                }
                .remove-image-btn:hover {
                    background: var(--danger);
                    transform: scale(1.1);
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
