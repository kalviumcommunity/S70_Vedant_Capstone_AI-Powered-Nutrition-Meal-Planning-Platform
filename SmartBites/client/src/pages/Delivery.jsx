import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Delivery() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    id: orderId,
    status: 'preparing',
    estimatedDelivery: '30 minutes',
    restaurant: 'SmartBites Kitchen',
    items: [
      { name: 'Mediterranean Quinoa Bowl', quantity: 1, price: 14.99 },
      { name: 'Green Smoothie', quantity: 1, price: 6.99 }
    ],
    driver: {
      name: 'John Smith',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 4.8
    },
    deliveryLocation: '123 Main St, Anytown, USA',
    currentLocation: { lat: 40.7128, lng: -74.0060 }
  });

  // Simulate order status updates
  useEffect(() => {
    const statuses = ['preparing', 'ready', 'picked_up', 'on_the_way', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statuses.length - 1) {
        currentIndex++;
        setOrder(prev => ({ ...prev, status: statuses[currentIndex] }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = (status) => {
    const statusMap = {
      preparing: 'Preparing your order',
      ready: 'Order is ready for pickup',
      picked_up: 'Driver picked up your order',
      on_the_way: 'On the way to you',
      delivered: 'Delivered'
    };
    return statusMap[status] || status;
  };

  const getStatusPercentage = (status) => {
    const statusMap = {
      preparing: 25,
      ready: 50,
      picked_up: 75,
      on_the_way: 90,
      delivered: 100
    };
    return statusMap[status] || 0;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Order Status */}
      <div className="card mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h1>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{getStatusText(order.status)}</span>
            <span>{getStatusPercentage(order.status)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getStatusPercentage(order.status)}%` }}
            ></div>
          </div>
        </div>
        <div className="text-gray-600">
          Estimated delivery in: <span className="font-semibold">{order.estimatedDelivery}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Restaurant</div>
              <div className="font-medium">{order.restaurant}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Items</div>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 font-semibold">
                <span>Total</span>
                <span>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Driver</h2>
          <div className="flex items-center mb-6">
            <img
              src={order.driver.photo}
              alt={order.driver.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <div className="font-medium">{order.driver.name}</div>
              <div className="text-sm text-gray-600">
                Rating: {order.driver.rating} ★
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Delivery Address</div>
            <div className="font-medium">{order.deliveryLocation}</div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card mt-8 bg-gray-100 h-64 flex items-center justify-center">
        <p className="text-gray-600">Delivery tracking map would be displayed here</p>
      </div>
    </div>
  );
}

export default Delivery;