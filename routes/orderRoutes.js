const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { items, totalAmount } = req.body;

//     const newOrder = new Order({
//       userId: req.user,
//       items,
//       totalAmount,
//       status: "Pending",
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// Get User Orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
