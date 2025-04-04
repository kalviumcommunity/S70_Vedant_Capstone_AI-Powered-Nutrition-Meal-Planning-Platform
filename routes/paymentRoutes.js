// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create an Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     const { amount, currency = "INR" } = req.body;

//     const options = {
//       amount: amount * 100, // Amount in paise (₹1 = 100 paise)
//       currency,
//       receipt: `order_rcptid_${Math.floor(Math.random() * 100000)}`,
//       payment_capture: 1, // Auto capture payment
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       orderId: order.id,
//       currency: order.currency,
//       amount: order.amount,
//     });
//   } catch (error) {
//     console.error("Razorpay Error:", error);
//     res.status(500).json({ success: false, message: "Error creating order" });
//   }
// });

// // Verify Payment Signature
// router.post("/verify", authMiddleware, async (req, res) => {
//   try {
//     const { orderId, paymentId, signature } = req.body;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex");

//     if (generatedSignature === signature) {
//       res.json({ success: true, message: "Payment Verified Successfully" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid Signature" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Verification Failed" });
//   }
// });

// module.exports = router;
