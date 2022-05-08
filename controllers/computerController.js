const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Computer = require("../models/computerModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllComputer = catchAsync(async function (req, res, next) {
  const features = new APIFeatures(Computer.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const computers = await features.query;
  res.status(200).json({ status: "success", data: { computers } });
});

exports.getAComputer = catchAsync(async function (req, res, next) {
  const computer = await Computer.findById(req.params.id);
  res.status(200).json({ status: "success", data: { computer } });
});

exports.createComputer = catchAsync(async function (req, res, next) {
  const computer = await Computer.create(req.body);
  res.status(201).json({ status: "success", data: { computer } });
});

exports.updateComputer = catchAsync(async function (req, res, next) {
  const computer = await Computer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!computer)
    return next(new AppError("Cannot find computer with that ID", 404));

  res.status(200).json({ status: "success", data: { computer } });
});

exports.deleteComputer = catchAsync(async function (req, res, next) {
  await Computer.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: "success" });
});
