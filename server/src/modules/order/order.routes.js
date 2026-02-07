const router = require("express").Router();
const controller = require("./order.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

// ✅ Guest checkout (NO LOGIN)
router.post("/", controller.createOrder);

// ✅ Admin only
router.get("/", auth, role("admin"), controller.getAllOrders);
router.put("/:id/status", auth, role("admin"), controller.updateOrderStatus);

module.exports = router;
