const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

// 1️⃣ Security middlewares
app.use(helmet());
app.use(xss());

// 2️⃣ Mongo sanitize — **put it here**
app.use(
  mongoSanitize({
    replaceWith: "_", // replaces forbidden characters instead of mutating req.query
  })
);

// 3️⃣ Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// 4️⃣ Other middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// 5️⃣ Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/users", require("./modules/user/user.routes"));
app.use("/api/products", require("./modules/product/product.routes"));
app.use("/api/orders", require("./modules/order/order.routes"));

// 6️⃣ Global error handler
app.use(errorHandler);

module.exports = app;
