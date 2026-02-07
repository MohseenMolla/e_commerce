const asyncHandler = require("express-async-handler");
const service = require("./auth.service");

exports.register = asyncHandler(async (req, res) => {
  const data = await service.register(req.body);
  res.status(201).json({ success: true, data });
});

exports.login = asyncHandler(async (req, res) => {
  const data = await service.login(req.body);
  res.json({ success: true, data });
});
