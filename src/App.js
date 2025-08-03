import React, { useState } from 'react';
import Login from './login';
import Products from './products';
import Cart from './cart';
import OrderHistory from './order_history';
function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('products');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <nav style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0',
        position: 'sticky',
        top: '0',
        zIndex: '1000'
      }}>
        {/* Logo/Brand Section */}
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#2c3e50',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🛒 ProKart
        </div>
        
        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => setCurrentView('products')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentView === 'products' ? '#007bff' : 'transparent',
              color: currentView === 'products' ? 'white' : '#495057',
              border: '2px solid #007bff',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (currentView !== 'products') {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (currentView !== 'products') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#495057';
              }
            }}
          >
            📦 Products
          </button>
          
          <button 
            onClick={() => setCurrentView('cart')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentView === 'cart' ? '#28a745' : 'transparent',
              color: currentView === 'cart' ? 'white' : '#495057',
              border: '2px solid #28a745',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (currentView !== 'cart') {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (currentView !== 'cart') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#495057';
              }
            }}
          >
            🛒 Cart
          </button>
          
          <button 
            onClick={() => setCurrentView('orders')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentView === 'orders' ? '#ffc107' : 'transparent',
              color: currentView === 'orders' ? '#212529' : '#495057',
              border: '2px solid #ffc107',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (currentView !== 'orders') {
                e.target.style.backgroundColor = '#ffc107';
                e.target.style.color = '#212529';
              }
            }}
            onMouseOut={(e) => {
              if (currentView !== 'orders') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#495057';
              }
            }}
          >
            📋 Orders
          </button>
        </div>
        
        {/* User Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{
            color: '#495057',
            fontSize: '14px',
            fontWeight: '500',
            padding: '8px 15px',
            backgroundColor: '#e9ecef',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            👋 Welcome, {user.username}!
          </span>
          
          <button 
            onClick={logout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#c82333';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#dc3545';
              e.target.style.transform = 'scale(1)';
            }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>
      
      <div style={{ padding: '20px' }}>
        {currentView === 'products' && <Products />}
        {currentView === 'cart' && <Cart />}
        {currentView === 'orders' && <OrderHistory />}
      </div>
    </div>
  );
}

export default App;
