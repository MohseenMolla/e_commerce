const router = require("express").Router();
const { body } = require("express-validator");
const controller = require("./auth.controller");
const { validate } = require("../../middlewares/validate.middleware.js");

// Register route with validation
router.post(
  "/register",
  validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ]),
  controller.register
);

// Login route with validation
router.post(
  "/login",
  validate([
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ]),
  controller.login
);

module.exports = router;
