// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Global error handler middleware (create this in ./middlewares/error.middleware.js)
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// 1️⃣ Security middlewares
app.use(helmet());
app.use(xss());

// 2️⃣ Mongo sanitize
app.use(
  mongoSanitize({
    replaceWith: "_", // replaces forbidden characters in queries
  })
);

// 3️⃣ Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per window
  })
);

// 4️⃣ Other middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// 5️⃣ Root & health endpoints (important for uptime monitoring)
app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// 6️⃣ Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/users", require("./modules/user/user.routes"));
app.use("/api/products", require("./modules/product/product.routes"));
app.use("/api/orders", require("./modules/order/order.routes"));

// 7️⃣ Global error handler (must come last)
app.use(errorHandler);

module.exports = app;
