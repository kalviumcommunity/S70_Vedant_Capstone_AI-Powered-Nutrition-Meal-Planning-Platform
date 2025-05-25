import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  preferences: {
    diet: String,
    calories: Number,
    meals: Number,
    allergies: [String],
    excludeIngredients: String
  },
  meals: [{
    type: String,
    name: String,
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    image: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MealPlan', mealPlanSchema);