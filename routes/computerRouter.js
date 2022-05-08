const express = require("express");
const computerController = require("../controllers/computerController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.permitOnlyTo("admin"),
    computerController.createComputer
  )
  .get(computerController.getAllComputer);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.permitOnlyTo("admin"),
    computerController.updateComputer
  )
  .delete(
    authController.protect,
    authController.permitOnlyTo("admin"),
    computerController.deleteComputer
  )
  .get(computerController.getAComputer);

module.exports = router;
