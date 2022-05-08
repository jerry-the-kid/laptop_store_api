const mongoose = require("mongoose");
const Order = require("./orderModel");
const calculateTotal = require("../utils/calculateTotal");

const orderLineSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: [true, "Order must belong to a customer"],
  },
  computer: {
    type: mongoose.Schema.ObjectId,
    ref: "Computer",
    required: [true, "Order must have a product"],
  },
  quantity: {
    type: Number,
    min: [1, "Product must have at least one quantity"],
  },
});

orderLineSchema.statics.calculateTotal = async function (orderId) {
  const stats = await this.aggregate([
    {
      $match: { order: orderId },
    },

    {
      $group: {
        _id: "$order",
        computers_id: { $push: "$computer" },
        quantity: { $push: "$quantity" },
      },
    },
  ]);

  const { totalPrice, totalAmount } = await calculateTotal(stats);
  await Order.findOneAndUpdate({ id: orderId }, { totalPrice, totalAmount });
};

orderLineSchema.pre(/^find/, function (next) {
  this.populate({
    path: "computer",
    select: "name",
  });
  next();
});

orderLineSchema.post("save", async function () {
  this.constructor.calculateTotal(this.order);
});

orderLineSchema.post(/^findOneAnd/, (doc) => {
  if (doc) {
    doc.constructor.calculateTotal(doc.order);
  }
});

const orderLineModel = mongoose.model("OrderLine", orderLineSchema);
module.exports = orderLineModel;
