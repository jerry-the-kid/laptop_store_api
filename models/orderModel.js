const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a customer"],
  },
  status: {
    type: String,
    enum: ["incomplete", "waiting", "complete", "cancel"],
    default: "incomplete",
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

orderSchema.virtual("orderLines", {
  ref: "OrderLine",
  foreignField: "order",
  localField: "_id",
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
