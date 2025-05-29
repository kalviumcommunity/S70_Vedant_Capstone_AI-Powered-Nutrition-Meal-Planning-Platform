import { Link } from 'react-router-dom';

function Dashboard() {
  const todaysMeals = [
    {
      meal: 'Breakfast',
      recipe: 'Avocado Toast with Poached Eggs',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      calories: 380,
      time: '15 min'
    },
    {
      meal: 'Lunch',
      recipe: 'Quinoa Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      calories: 450,
      time: '20 min'
    },
    {
      meal: 'Dinner',
      recipe: 'Grilled Salmon with Vegetables',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      calories: 520,
      time: '25 min'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">Welcome Back, Alex!</h1>
        <Link to="/meal-planner" className="btn-primary">
          Plan Next Week
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-primary-50 border border-primary-100">
          <div className="text-sm text-gray-600">Daily Calories</div>
          <div className="text-2xl font-bold text-primary-600">1,850</div>
          <div className="text-sm text-gray-500">of 2,000 goal</div>
        </div>
        <div className="card bg-primary-50 border border-primary-100">
          <div className="text-sm text-gray-600">Protein</div>
          <div className="text-2xl font-bold text-primary-600">82g</div>
          <div className="text-sm text-gray-500">of 90g goal</div>
        </div>
        <div className="card bg-primary-50 border border-primary-100">
          <div className="text-sm text-gray-600">Water</div>
          <div className="text-2xl font-bold text-primary-600">1.8L</div>
          <div className="text-sm text-gray-500">of 2.5L goal</div>
        </div>
        <div className="card bg-primary-50 border border-primary-100">
          <div className="text-sm text-gray-600">Steps</div>
          <div className="text-2xl font-bold text-primary-600">6,280</div>
          <div className="text-sm text-gray-500">of 10,000 goal</div>
        </div>
      </div>

      {/* Today's Meals */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Today's Meals</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {todaysMeals.map((meal, index) => (
          <div key={index} className="card">
            <img
              src={meal.image}
              alt={meal.recipe}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="text-sm text-primary-600 font-semibold mb-2">{meal.meal}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.recipe}</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{meal.calories} calories</span>
              <span>{meal.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping List Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shopping List</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Avocados (2)</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Quinoa (1 cup)</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Salmon fillets (2)</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Mixed vegetables</span>
            </div>
          </div>
          <button className="btn-secondary w-full mt-4">View Full List</button>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Healthy Meals</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Water Goals</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Exercise</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;