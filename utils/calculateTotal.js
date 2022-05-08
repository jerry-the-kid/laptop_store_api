const Computer = require("../models/computerModel");

module.exports = async (stats) => {
  if (!stats[0]?.computers_id || !stats[0]?.quantity)
    return { totalPrice: 0, totalAmount: 0 };

  const computerArray = await Promise.all(
    stats[0].computers_id.map((id) => Computer.findById(id))
  );

  const quantityArray = stats[0].quantity;

  const totalAmount = quantityArray.reduce(
    (prev, quantity) => prev + quantity,
    0
  );

  const totalPrice = quantityArray.reduce(
    (prev, quantity, i) => prev + quantity * computerArray[i].price,
    0
  );

  return { totalPrice, totalAmount };
};
