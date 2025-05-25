import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  diet: {
    type: String,
    enum: ['no-restrictions', 'vegetarian', 'vegan', 'keto', 'paleo'],
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  allergens: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model('Recipe', recipeSchema);