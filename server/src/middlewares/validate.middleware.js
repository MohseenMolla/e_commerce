const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

exports.validate = (validations) => {
  return async (req, res, next) => {
    // Run each validation
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Respond with first error
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    next();
  };
};
