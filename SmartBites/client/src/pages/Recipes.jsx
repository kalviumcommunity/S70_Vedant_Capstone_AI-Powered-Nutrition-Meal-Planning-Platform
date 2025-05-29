import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { StarIcon, ClockIcon } from '@heroicons/react/24/outline';

function Recipes() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Recipes</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(recipes).map(([id, recipe]) => (
          <Link
            key={id}
            to={`/recipe/${id}`}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 mb-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5" />
                  <span>{recipe.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-5 w-5" />
                  <span>{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} min</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;