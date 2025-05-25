import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { diet, calories, meals, allergies } = req.body;

    // Validate input
    if (!diet || !calories || !meals) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Build query
    let query = {};
    if (diet !== 'no-restrictions') {
      query.diet = diet;
    }
    if (allergies && allergies.length > 0) {
      query.allergens = { $nin: allergies };
    }

    console.log('MongoDB query:', query);

    // Find recipes
    const recipes = await Recipe.find(query);
    console.log('Found recipes:', recipes.length);

    if (!recipes.length) {
      return res.status(404).json({
        message: 'No recipes found matching your criteria'
      });
    }

    // Randomly select meals
    const selectedRecipes = [];
    const availableRecipes = [...recipes];
    
    for (let i = 0; i < meals && availableRecipes.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableRecipes.length);
      selectedRecipes.push(availableRecipes[randomIndex]);
      availableRecipes.splice(randomIndex, 1);
    }

    const mealPlan = {
      meals: selectedRecipes.map((recipe, index) => ({
        type: getMealType(index, meals),
        name: recipe.title,
        id: recipe._id,
        calories: recipe.calories,
        protein: recipe.protein,
        image: recipe.image,
        description: recipe.description
      }))
    };

    console.log('Sending meal plan:', mealPlan);
    res.json(mealPlan);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      message: 'Server error while generating meal plan',
      error: error.message
    });
  }
});

function getMealType(index, totalMeals) {
  const mealTypes = {
    3: ['Breakfast', 'Lunch', 'Dinner'],
    4: ['Breakfast', 'Morning Snack', 'Lunch', 'Dinner'],
    5: ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner']
  };
  return mealTypes[totalMeals]?.[index] || `Meal ${index + 1}`;
}

export default router;