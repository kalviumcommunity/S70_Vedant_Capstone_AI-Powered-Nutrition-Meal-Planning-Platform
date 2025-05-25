import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protected routes using auth middleware
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedRecipes');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add additional user statistics
    const userWithStats = {
      ...user.toObject(),
      orderCount: user.orders?.length || 0,
      mealPlanCount: user.mealPlans?.length || 0,
      savedRecipes: user.savedRecipes || []
    };

    res.json(userWithStats);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;