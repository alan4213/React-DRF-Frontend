import React, { useState, useEffect } from 'react';
import { productAPI, cartAPI } from './api';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (search = '') => {
    try {
      const response = await productAPI.getProducts(search);
      console.log('Product data:', response.data.results[0]); // Debug: check first product
      setProducts(response.data.results);
    } catch (error) {
      console.error('Failed to load products');
    }
  };

  const handleSearch = () => {
    loadProducts(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    loadProducts();
  };
  const addToCart = async (productId) => {
    try {
      await cartAPI.addToCart({ product_id: productId, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Our Products
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '16px',
          marginBottom: '30px'
        }}>
          Discover our amazing collection of products
        </p>
      </div>
      
      {/* Search Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            fontSize: '16px',
            width: '350px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button 
          onClick={handleSearch} 
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Search
        </button>
        <button 
          onClick={clearSearch} 
          style={{
            padding: '12px 25px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Clear
        </button>
      </div>
      
      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.map(product => (
          <div 
            key={product.id} 
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: '1px solid #f1f3f4'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            {/* Product Image */}
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {product.image ? (
                <img 
                  src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} 
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div style={{
                display: product.image ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                fontSize: '48px',
                color: '#dee2e6'
              }}>
                📦
              </div>
            </div>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '10px',
              lineHeight: '1.4'
            }}>
              {product.title}
            </h3>
            
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#28a745',
              marginBottom: '15px'
            }}>
              ${product.price}
            </div>
            
            <p style={{
              color: '#6c757d',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px',
              minHeight: '60px'
            }}>
              {product.description}
            </p>
            
            <button 
              onClick={() => addToCart(product.id)}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#218838';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6c757d'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
          <h3 style={{ marginBottom: '10px' }}>No products found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}

export default Products;
