const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");
const { generateMealPlan } = require("../utils/aiHelper");

const router = express.Router();

// Get AI-generated meal plan
// router.post("/generate", authMiddleware, async (req, res) => {
//   try {
//     const { dietPreference, calorieGoal } = req.body;

//     // Call AI function to generate meal plan
//     const aiResponse = await generateMealPlan(dietPreference, calorieGoal);

//     if (!aiResponse) {
//       return res.status(500).json({ message: "Failed to generate meal plan" });
//     }

//     res.json({ mealPlan: aiResponse });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// Get all saved recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Save a new recipe
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const newRecipe = new Recipe(req.body);
//     await newRecipe.save();
//     res.status(201).json({ message: "Recipe saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

module.exports = router;
