import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, ClockIcon, FireIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Recipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [servings, setServings] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundRecipe = recipes[recipeId];
      if (foundRecipe) {
        setServings(foundRecipe.servings || 1);
      }
      setRecipe(foundRecipe);
      setIsLoading(false);
    }, 500);
  }, [recipeId]);

  const handleSaveToProfile = () => {
    setIsSaved(true);
    // Here you would typically make an API call to save to user's profile
    // For now, we'll just show the saved state
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
      </div>
    );
  }

  const handleOrderPrepared = () => {
    if (!user) {
      navigate('/signin', { state: { from: `/recipe/${recipeId}` } });
      return;
    }
    
    addToCart({
      type: 'PREPARED_MEAL',
      recipeId: recipeId,
      name: recipe.title,
      servings,
      price: calculatePrice(servings)
    });
    navigate('/cart');
  };

  const handleBuyIngredients = () => {
    if (!user) {
      navigate('/signin', { state: { from: `/recipe/${recipeId}` } });
      return;
    }
    
    addToCart({
      type: 'INGREDIENTS',
      recipeId: recipeId,
      name: recipe.title,
      servings,
      price: calculateIngredientsPrice(servings)
    });
    navigate('/cart');
  };

  const calculatePrice = (servings) => {
    // Base price per serving
    return servings * 12.99;
  };

  const calculateIngredientsPrice = (servings) => {
    // Base ingredients price per serving
    return servings * 8.99;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>
        
        <div className="relative h-96 mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-6">
            <div>
              <span className="text-gray-600">Time</span>
              <p className="text-lg font-semibold">{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} min</p>
            </div>
            <div>
              <span className="text-gray-600">Calories</span>
              <p className="text-lg font-semibold">{recipe.calories}</p>
            </div>
            <div>
              <span className="text-gray-600">Servings</span>
              <p className="text-lg font-semibold">{recipe.servings}</p>
            </div>
          </div>
          
          <button
            onClick={handleSaveToProfile}
            disabled={isSaved}
            className={`px-6 py-2 rounded-lg font-medium ${
              isSaved 
                ? 'bg-gray-100 text-gray-600'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isSaved ? 'Saved to Profile' : 'Save to Profile'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  {ingredient.name}: {ingredient.amount}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-4">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}