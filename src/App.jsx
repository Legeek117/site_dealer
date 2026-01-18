import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Warranty from './pages/Warranty';
import Catalog from './pages/Catalog';
import ProductDetailWrapper from './pages/ProductDetailWrapper';
import Settings from './pages/Settings';
import Login from './pages/Login';
import BudgetSearch from './pages/BudgetSearch';
import './App.css';
import { Shield, AlertTriangle } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <AlertTriangle size={60} color="var(--danger)" style={{ marginBottom: '20px' }} />
          <h1>Oups ! Quelque chose s'est mal passé.</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Essayez de rafraîchir la page ou vérifiez votre connexion.</p>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '30px' }}>Rafraîchir</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminLayout({ children, activeTab, setActiveTab, onLogout }) {
  return (
    <div className="admin-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="main-content">
        <div key={activeTab} className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isAdminAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    setActiveTab('dashboard'); // Reset tab
  };

  return (
    <Router>
      <ScrollToTop />
      <GlobalErrorBoundary>
        <div className="app-container">
          <Routes>
            {/* Public Routes - With Navbar */}
            <Route path="*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={
                    <div className="page-container">
                      <Catalog />
                    </div>
                  } />
                  <Route path="/budget" element={<BudgetSearch />} />
                  <Route path="/product/:id" element={
                    <div className="page-container">
                      <ProductDetailWrapper />
                    </div>
                  } />
                  {/* Admin Route - Without Navbar */}
                  <Route path="/admin" element={
                    !isAuthenticated ? (
                      <Login onLogin={handleLogin} />
                    ) : (
                      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
                        {activeTab === 'dashboard' && <Dashboard />}
                        {activeTab === 'stock' && <Stock />}
                        {activeTab === 'sales' && <Sales />}
                        {activeTab === 'customers' && <Customers />}
                        {activeTab === 'warranty' && <Warranty />}
                        {activeTab === 'settings' && <Settings />}
                      </AdminLayout>
                    )
                  } />
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </GlobalErrorBoundary>
    </Router>
  );
}

export default App;
