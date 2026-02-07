module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  const statusCode =
    typeof err.statusCode === "number" ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
