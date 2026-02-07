const User = require("./user.model");
const asyncHandler = require("express-async-handler");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, users });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );
  res.json({ success: true, user });
});
