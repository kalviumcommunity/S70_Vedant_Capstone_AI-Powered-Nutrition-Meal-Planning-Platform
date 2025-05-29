import { useState } from 'react';
import { Link } from 'react-router-dom';

const SAMPLE_MEALS = {
  breakfast: [
    {
      id: 'protein-pancakes',
      name: 'Protein-Packed Banana Pancakes',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
      calories: 350,
      time: '25 min',
      category: 'breakfast'
    },
    {
      id: 'mediterranean-quinoa',
      name: 'Mediterranean Quinoa Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      calories: 450,
      time: '45 min',
      category: 'breakfast'
    }
  ],
  lunch: [
    {
      id: 'buddha-bowl',
      name: 'Rainbow Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      calories: 480,
      time: '55 min',
      category: 'lunch'
    },
    {
      id: 'chicken-fajita-bowl',
      name: 'Spicy Chicken Fajita Bowl',
      image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80',
      calories: 550,
      time: '45 min',
      category: 'lunch'
    }
  ],
  dinner: [
    {
      id: 'asian-salmon-bowl',
      name: 'Asian Glazed Salmon Bowl',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      calories: 520,
      time: '35 min',
      category: 'dinner'
    },
    {
      id: 'poke-bowl',
      name: 'Ahi Tuna Poke Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80',
      calories: 460,
      time: '35 min',
      category: 'dinner'
    }
  ]
};

export default function MealPlanner() {
  const [preferences, setPreferences] = useState({
    dietary: 'No restrictions',
    calories: '1500-1800',
    days: '1 day',
    mealsPerDay: '3 meals'
  });
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMeals, setSavedMeals] = useState([]);

  const dietaryOptions = [
    'No restrictions',
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Keto',
    'Paleo'
  ];

  const calorieOptions = [
    '1200-1500',
    '1500-1800',
    '1800-2100',
    '2100-2400',
    '2400-2700'
  ];

  const daysOptions = [
    '1 day',
    '3 days',
    '5 days',
    '7 days'
  ];

  const mealsPerDayOptions = [
    '2 meals',
    '3 meals',
    '4 meals',
    '5 meals'
  ];

  const handleSaveToProfile = (meal) => {
    setSavedMeals((prev) => {
      if (prev.find(m => m.id === meal.id)) {
        return prev;
      }
      return [...prev, meal];
    });
  };

  const handleRemoveFromProfile = (mealId) => {
    setSavedMeals((prev) => prev.filter(meal => meal.id !== mealId));
  };

  const handleGeneratePlan = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll use the sample meals
      // In a real app, this would be filtered based on preferences
      const meals = [];
      const mealsCount = parseInt(preferences.mealsPerDay);
      
      if (mealsCount >= 3) {
        meals.push(SAMPLE_MEALS.breakfast[Math.floor(Math.random() * SAMPLE_MEALS.breakfast.length)]);
        meals.push(SAMPLE_MEALS.lunch[Math.floor(Math.random() * SAMPLE_MEALS.lunch.length)]);
        meals.push(SAMPLE_MEALS.dinner[Math.floor(Math.random() * SAMPLE_MEALS.dinner.length)]);
      }

      setSuggestedMeals(meals);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meal Planner</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Generate Your Meal Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Preferences
            </label>
            <select
              value={preferences.dietary}
              onChange={(e) => setPreferences({ ...preferences, dietary: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {dietaryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calories per Day
            </label>
            <select
              value={preferences.calories}
              onChange={(e) => setPreferences({ ...preferences, calories: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {calorieOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Days
            </label>
            <select
              value={preferences.days}
              onChange={(e) => setPreferences({ ...preferences, days: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {daysOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meals per Day
            </label>
            <select
              value={preferences.mealsPerDay}
              onChange={(e) => setPreferences({ ...preferences, mealsPerDay: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {mealsPerDayOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Generating Plan...' : 'Generate Plan'}
        </button>
      </div>

      {suggestedMeals.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Suggested Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{meal.calories} calories</span>
                    <span>{meal.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/recipe/${meal.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Recipe →
                    </Link>
                    <button
                      onClick={() => handleSaveToProfile(meal)}
                      disabled={savedMeals.some(m => m.id === meal.id)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium ${
                        savedMeals.some(m => m.id === meal.id)
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {savedMeals.some(m => m.id === meal.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedMeals.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Saved for Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{meal.calories} calories</span>
                    <span>{meal.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/recipe/${meal.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Recipe →
                    </Link>
                    <button
                      onClick={() => handleRemoveFromProfile(meal.id)}
                      className="px-4 py-1 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}