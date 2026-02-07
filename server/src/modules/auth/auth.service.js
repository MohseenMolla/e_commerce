// auth.service.js
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (data) => {
  // pick only safe fields
  const { name, email, password } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, "Email already exists");

  const user = await User.create({ name, email, password }); // safe now
  const token = generateToken(user);

  return { user, token };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user);
  return { user, token };
};
