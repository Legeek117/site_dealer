import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_IPHONES } from '../data/mockData';
import ProductDetail from './ProductDetail';

const ProductDetailWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = MOCK_IPHONES.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="flex-center flex-column" style={{ padding: '100px' }}>
                <h2>Produit non trouvé</h2>
                <button onClick={() => navigate('/catalog')} className="btn-primary" style={{ marginTop: '20px' }}>
                    Retour au catalogue
                </button>
            </div>
        );
    }

    return <ProductDetail product={product} onBack={() => navigate('/catalog')} />;
};

export default ProductDetailWrapper;
