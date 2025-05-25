import express from 'express';
import { auth } from '../middleware/auth.js';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// Create recipe
router.post('/', auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdAt: new Date()
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all recipes
// router.get('/', async (req, res) => {
//   try {
//     const { sort = 'rating', limit = 10, page = 1 } = req.query;
//     const skip = (page - 1) * limit;

//     const recipes = await Recipe.find()
//       .sort({ [sort]: -1 })
//       .limit(Number(limit))
//       .skip(skip);

//     const total = await Recipe.countDocuments();

//     res.json({
//       recipes,
//       total,
//       pages: Math.ceil(total / limit),
//       currentPage: page
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get single recipe
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update recipe
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const recipe = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body },
//       { new: true, runValidators: true }
//     );
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete recipe
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const recipe = await Recipe.findByIdAndDelete(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     res.json({ message: 'Recipe deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;