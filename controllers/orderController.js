const catchAsync = require("../utils/catchAsync");
const Order = require("../models/orderModel");
const OrderLine = require("../models/orderLineModel");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");

exports.createEmptyOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    user: req.user._id,
  });

  if (!order)
    return next(new AppError("Invalid user ID. Please login to order", 400));

  res.status(201).json({
    status: "success",
    data: { order },
  });
});

exports.getAllOrderAdmin = catchAsync(async (req, res, next) => {
  const orders = await Order.find({});
  res.status(200).json({ status: "success", data: { orders } });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate({
    path: "user",
    select: "-__v -passwordChangedAt -address -role",
  });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

exports.getDetailOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: "user",
      select: "-__v -passwordChangedAt -role",
    })
    .populate({ path: "orderLines", select: "-__v" });

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

exports.deleteOrder = handlerFactory.deleteOne(Order);
exports.updateOrder = handlerFactory.updateOne(Order);

// OrderLine
exports.createOrderLine = catchAsync(async (req, res, next) => {
  const idObj = {
    order: req.params.orderId,
    computer: req.body.computerId,
  };

  let orderLine = await OrderLine.findOne(idObj);

  if (!orderLine) {
    orderLine = await OrderLine.create({
      ...idObj,
      quantity: req.body.quantity,
    });
  } else {
    orderLine.order = idObj.order;
    orderLine.computer = idObj.computer;
    orderLine.quantity = orderLine.quantity + req.body.quantity;
    await orderLine.save();
  }

  res.status(200).json({
    status: "success",
    message: "Update data successfully",
    data: { orderLine },
  });
});

exports.deleteOrderLine = handlerFactory.deleteOne(OrderLine);
