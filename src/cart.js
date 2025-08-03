import React, { useState, useEffect } from 'react';
import { cartAPI } from './api';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.updateItem({ item_id: itemId, quantity });
      loadCart();
    } catch (error) {
      alert('Failed to update item');
    }
  };
 const checkout = async () => {
  try {
    console.log('Calling checkout API...'); // Debug
    const response = await cartAPI.checkout(); // This was missing!
    console.log('Checkout response:', response.data); // Debug
    alert(`Order placed successfully! Order ID: ${response.data.order_id}`);
    loadCart();
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Checkout failed');
  }
};


  const removeItem = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      loadCart();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '10px'
        }}>
          🛒 Shopping Cart
        </h1>
        <p style={{
          color: '#6c757d',
          fontSize: '16px'
        }}>
          Review your items before checkout
        </p>
      </div>

      {cart.order_items?.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>Your cart is empty</h3>
          <p style={{ color: '#adb5bd' }}>Add some products to get started!</p>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Cart Items */}
          <div style={{ marginBottom: '30px' }}>
            {cart.order_items?.map(item => (
              <div 
                key={item.id} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: '1px solid #f1f3f4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Product Image */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  {item.product.image ? (
                    <img 
                      src={`http://127.0.0.1:8000${item.product.image}`} 
                      alt={item.product.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{
                    display: item.product.image ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: '24px',
                    color: '#dee2e6'
                  }}>
                    📦
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px'
                  }}>
                    {item.product.title}
                  </h4>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#28a745',
                    marginBottom: '5px'
                  }}>
                    ${item.product.price} each
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#6c757d'
                  }}>
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: item.quantity <= 1 ? '#e9ecef' : '#dc3545',
                      color: item.quantity <= 1 ? '#6c757d' : 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (item.quantity > 1) {
                        e.target.style.backgroundColor = '#c82333';
                        e.target.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (item.quantity > 1) {
                        e.target.style.backgroundColor = '#dc3545';
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    −
                  </button>
                  
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: '#28a745',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#218838';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#28a745';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
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
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary & Checkout */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '1px solid #f1f3f4',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              Total Items: {cart.order_items?.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            
            <button 
              onClick={checkout}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '15px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#218838';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
              }}
            >
              💳 Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
