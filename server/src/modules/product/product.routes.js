const router = require("express").Router();
const controller = require("./product.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");
const upload = require("../../middlewares/upload.middleware");

// Admin routes
router.post("/", auth, role("admin"), upload.array("images", 5), controller.create);
router.put("/:id", auth, role("admin"), controller.updateProduct);
router.delete("/:id", auth, role("admin"), controller.deleteProduct);

// Public routes
router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById); // 👈 ADD THIS

module.exports = router;
