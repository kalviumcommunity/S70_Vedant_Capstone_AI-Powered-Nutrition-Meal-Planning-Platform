import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function Orders() {
  const { cancelOrder } = useCart();
  const [error, setError] = useState(null);

  // Mock orders data (in a real app, this would come from an API)
  const [orders] = useState([
    {
      id: '1001',
      date: new Date('2025-05-26'),
      status: 'delivered',
      items: [
        {
          name: 'Mediterranean Quinoa Bowl',
          quantity: 2,
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
        }
      ],
      total: 25.98
    },
    {
      id: '1002',
      date: new Date('2025-05-27'),
      status: 'in_transit',
      items: [
        {
          name: 'Asian Glazed Salmon Bowl',
          quantity: 1,
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
        }
      ],
      total: 14.99
    }
  ]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      delivered: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      in_transit: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const statusText = {
      delivered: 'Delivered',
      processing: 'Processing',
      in_transit: 'In Transit',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-8">We're sorry, but something went wrong. Please try refreshing the page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">Your Orders</h1>
        <Link to="/shop" className="btn-primary">
          Shop More
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You haven't placed any orders yet</p>
          <Link to="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="border-t border-b py-4 my-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">× {item.quantity}</span>
                      </div>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  Total: ${order.total.toFixed(2)}
                </div>
                <div className="space-x-4">
                  {order.status === 'in_transit' && (
                    <Link
                      to={`/delivery/${order.id}`}
                      className="btn-secondary"
                    >
                      Track Order
                    </Link>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="btn-secondary text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status !== 'cancelled' && (
                    <button className="btn-primary">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;