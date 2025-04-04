const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Product (Admin Only)
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete Product (Admin Only)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

module.exports = router;
