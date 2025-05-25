import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Recipe from '../models/Recipe.js';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartbites';

const recipes = [
  {
    title: "Healthy Breakfast Bowl",
    diet: "vegetarian",
    calories: 450,
    protein: 20,
    allergens: ["nuts"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    description: "A nutritious breakfast bowl with oats, fruits, and nuts"
  },
  {
    title: "Grilled Chicken Salad",
    diet: "no-restrictions",
    calories: 350,
    protein: 30,
    allergens: [],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    description: "Fresh salad with grilled chicken breast"
  },
  {
    title: "Vegan Buddha Bowl",
    diet: "vegan",
    calories: 400,
    protein: 15,
    allergens: ["nuts", "soy"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Colorful bowl with quinoa, vegetables, and tofu"
  },
  {
    title: "Keto Steak Bowl",
    diet: "keto",
    calories: 600,
    protein: 40,
    allergens: [],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Low-carb bowl with steak and vegetables"
  },
  {
    title: "Paleo Breakfast",
    diet: "paleo",
    calories: 450,
    protein: 25,
    allergens: ["eggs"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Eggs with avocado and sweet potato"
  },
  {
    title: "Vegetarian Pasta",
    diet: "vegetarian",
    calories: 550,
    protein: 18,
    allergens: ["gluten"],
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    description: "Whole grain pasta with roasted vegetables"
  },
  {
    title: "Salmon Bowl",
    diet: "no-restrictions",
    calories: 500,
    protein: 35,
    allergens: ["fish"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    description: "Grilled salmon with quinoa and vegetables"
  },
  {
    title: "Vegan Smoothie Bowl",
    diet: "vegan",
    calories: 300,
    protein: 12,
    allergens: [],
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=800&q=80",
    description: "Acai smoothie bowl with fresh fruits and seeds"
  },
  {
    title: "Keto Breakfast",
    diet: "keto",
    calories: 550,
    protein: 30,
    allergens: ["eggs", "dairy"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Low-carb breakfast with eggs and avocado"
  },
  {
    title: "Paleo Chicken",
    diet: "paleo",
    calories: 400,
    protein: 35,
    allergens: [],
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    description: "Grilled chicken with sweet potato and vegetables"
  }
];

async function seedRecipes() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Recipe.deleteMany({});
    const result = await Recipe.insertMany(recipes);
    
    console.log(`Successfully seeded ${result.length} recipes`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding recipes:', error);
    process.exit(1);
  }
}

seedRecipes();