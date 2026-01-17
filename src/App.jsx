import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Sales from './pages/Sales';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import './App.css';
import { User, Shield } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('admin'); // 'admin' or 'client'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderContent = () => {
    // Client View Logic
    if (viewMode === 'client') {
      if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
      }
      return <Catalog onSelectProduct={(p) => setSelectedProduct(p)} />;
    }

    // Admin View Logic
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stock':
        return <Stock />;
      case 'sales':
        return <Sales />;
      case 'customers':
        return <div className="placeholder" style={{ padding: '40px', textAlign: 'center' }}><h2>Gestion Clients (À venir)</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      {viewMode === 'admin' && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}

      <main style={{
        marginLeft: viewMode === 'admin' ? '300px' : '0',
        flex: 1,
        padding: '20px',
        maxWidth: viewMode === 'admin' ? '1400px' : '1200px',
        margin: viewMode === 'client' ? '0 auto' : '0',
        width: '100%',
        transition: 'var(--transition)'
      }}>
        {/* View Mode Toggle (For demo purposes) */}
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setViewMode(viewMode === 'admin' ? 'client' : 'admin');
              setSelectedProduct(null);
            }}
            className="glass-card"
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,113,227,0.3)',
              fontWeight: '600'
            }}
          >
            {viewMode === 'admin' ? <User size={20} /> : <Shield size={20} />}
            {viewMode === 'admin' ? 'Voir coté Client' : 'Retour Admin'}
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;
