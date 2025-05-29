import { useState } from 'react';
import { ShoppingCartIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, cartItemsCount } = useCart();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'meal-kits', name: 'Meal Kits' },
    { id: 'ingredients', name: 'Fresh Ingredients' },
    { id: 'prepared', name: 'Prepared Meals' },
    { id: 'pantry', name: 'Pantry Essentials' }
  ];

  const products = [
    {
      id: 1,
      name: 'Mediterranean Bowl Kit',
      category: 'meal-kits',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      description: 'Complete ingredients for 2 servings of our popular Mediterranean Bowl.',
      servings: 2
    },
    {
      id: 2,
      name: 'Organic Quinoa',
      category: 'pantry',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      description: 'Premium organic quinoa, perfect for healthy bowls and salads.',
      weight: '500g'
    },
    {
      id: 3,
      name: 'Fresh Vegetable Box',
      category: 'ingredients',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
      description: 'Weekly selection of fresh, seasonal vegetables.',
      items: '10-12 items'
    },
    {
      id: 4,
      name: 'Chicken Teriyaki Bowl',
      category: 'prepared',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      description: 'Ready-to-eat teriyaki chicken with rice and vegetables.',
      calories: 450
    },
    {
      id: 5,
      name: 'Superfood Smoothie Kit',
      category: 'meal-kits',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80',
      description: 'Pre-portioned smoothie ingredients for 5 servings.',
      servings: 5
    },
    {
      id: 6,
      name: 'Organic Avocados',
      category: 'ingredients',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
      description: 'Perfectly ripe organic avocados.',
      quantity: '4 pieces'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">Shop Fresh & Healthy</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Cart ({cartItemsCount})
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">Filter by:</span>
          <select className="input-field">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
            <option>Newest</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} products
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="card">
            <div className="relative h-48 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-600">
                ${product.price}
              </span>
              <button 
                onClick={() => addToCart(product)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {product.servings && `${product.servings} servings`}
              {product.weight && `${product.weight}`}
              {product.quantity && `${product.quantity}`}
              {product.calories && `${product.calories} calories`}
            </div>
          </div>
        ))}
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Shop;