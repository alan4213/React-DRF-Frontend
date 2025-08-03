import React, { useState, useEffect } from 'react';
import { orderAPI } from './api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderHistory();
  }, []);

 const loadOrderHistory = async () => {
  try {
    console.log('Loading order history...');
    const response = await orderAPI.getHistory();
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    console.log('Data length:', response.data.length);
    setOrders(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.status);
    console.error('Error data:', error.response?.data);
  }
  setLoading(false);
};

  if (loading) return <div>Loading orders...</div>;

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
          📋 Order History
        </h1>
        <p style={{
          color: '#6c757d',
          fontSize: '16px'
        }}>
          Track your previous orders and purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No orders yet</h3>
          <p style={{ color: '#adb5bd' }}>Your order history will appear here once you make a purchase!</p>
        </div>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {orders.map(order => {
            const getStatusColor = (status) => {
              switch(status?.toLowerCase()) {
                case 'confirmed': return '#28a745';
                case 'processed': return '#007bff';
                case 'delivered': return '#28a745';
                case 'rejected': return '#dc3545';
                default: return '#ffc107';
              }
            };
            
            const getStatusIcon = (status) => {
              switch(status?.toLowerCase()) {
                case 'confirmed': return '✅';
                case 'processed': return '⚙️';
                case 'delivered': return '🚚';
                case 'rejected': return '❌';
                default: return '⏳';
              }
            };

            return (
              <div 
                key={order.id} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '25px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: '1px solid #f1f3f4',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                {/* Order Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#2c3e50',
                      marginBottom: '5px'
                    }}>
                      🛍️ Order #{order.id}
                    </h3>
                    <p style={{
                      color: '#6c757d',
                      fontSize: '14px',
                      margin: '0'
                    }}>
                      📅 {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 15px',
                      backgroundColor: getStatusColor(order.status_display),
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '10px'
                    }}>
                      {getStatusIcon(order.status_display)} {order.status_display}
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#28a745'
                    }}>
                      💰 ${order.total_price}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '20px'
                }}>
                  <h5 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    📦 Items ({order.order_items.length})
                  </h5>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {order.order_items.map(item => (
                      <div 
                        key={item.id} 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 15px',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e9ecef',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}
                      >
                        {/* Product Image */}
                        <div style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
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
                                borderRadius: '8px'
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
                            fontSize: '20px',
                            color: '#dee2e6'
                          }}>
                            📦
                          </div>
                        </div>

                        <div style={{ flex: '1', minWidth: '200px' }}>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '4px'
                          }}>
                            {item.product.title}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            color: '#6c757d'
                          }}>
                            ${item.product.price} × {item.quantity}
                          </div>
                        </div>
                        
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#28a745',
                          textAlign: 'right'
                        }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Total */}
                  <div style={{
                    marginTop: '15px',
                    paddingTop: '15px',
                    borderTop: '2px solid #dee2e6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#495057'
                    }}>
                      Order Total:
                    </span>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#28a745'
                    }}>
                      ${order.total_price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
