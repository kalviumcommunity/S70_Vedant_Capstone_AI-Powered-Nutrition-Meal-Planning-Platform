const express = require("express");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Item to Cart
// router.post("/add", authMiddleware, async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     let cart = await Cart.findOne({ userId: req.user });

//     if (!cart) {
//       cart = new Cart({ userId: req.user, items: [] });
//     }

//     const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();
//     res.json({ message: "Item added to cart", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// Get Cart Items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate("items.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove Item from Cart
// router.post("/remove", authMiddleware, async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const cart = await Cart.findOne({ userId: req.user });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
//     await cart.save();
//     res.json({ message: "Item removed from cart", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

module.exports = router;
