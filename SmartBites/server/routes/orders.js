import express from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, deliveryAddress } = req.body;
    
    const order = new Order({
      user: req.userId,
      items,
      total,
      deliveryAddress
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// // Get all orders for a user
// router.get('/', auth, async (req, res) => {
//   try {
//     const { status, sort = 'createdAt', limit = 10, page = 1 } = req.query;
//     const skip = (page - 1) * limit;

//     const query = { user: req.userId };
//     if (status) query.status = status;

//     const orders = await Order.find(query)
//       .sort({ [sort]: -1 })
//       .limit(Number(limit))
//       .skip(skip);

//     const total = await Order.countDocuments(query);

//     res.json({
//       orders,
//       total,
//       pages: Math.ceil(total / limit),
//       currentPage: page
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get single order
// router.get('/:orderId', auth, async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.orderId,
//       user: req.userId
//     });
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update order
// router.put('/:orderId', auth, async (req, res) => {
//   try {
//     const order = await Order.findOneAndUpdate(
//       { _id: req.params.orderId, user: req.userId },
//       { ...req.body },
//       { new: true, runValidators: true }
//     );
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Cancel order
// router.patch('/:orderId/cancel', auth, async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.orderId,
//       user: req.userId
//     });
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (order.status !== 'processing') {
//       return res.status(400).json({ message: 'Order cannot be cancelled' });
//     }

//     order.status = 'cancelled';
//     await order.save();
    
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete order
// router.delete('/:orderId', auth, async (req, res) => {
//   try {
//     const order = await Order.findOneAndDelete({
//       _id: req.params.orderId,
//       user: req.userId
//     });
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;