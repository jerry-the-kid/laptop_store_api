const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Admin
router
  .route("/admin")
  .get(
    authController.protect,
    authController.permitOnlyTo("admin"),
    orderController.getAllOrderAdmin
  );

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.permitOnlyTo("admin"),
    orderController.updateOrder
  );

// Customer

router.use(authController.protect, authController.permitOnlyTo("customer"));

router
  .route("/")
  .post(orderController.createEmptyOrder)
  .get(orderController.getAllOrders);

router
  .route("/:id")
  .get(orderController.getDetailOrder)
  .delete(orderController.deleteOrder);

router.route("/:orderId/orderlines").post(orderController.createOrderLine);
router.route("/orderlines/:id").delete(orderController.deleteOrderLine);

module.exports = router;
