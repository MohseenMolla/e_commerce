const router = require("express").Router();
const controller = require("./user.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

router.get("/profile", auth, controller.getProfile);
router.get("/", auth, role("admin"), controller.getAllUsers);
router.put("/:id/role", auth, role("admin"), controller.updateUserRole);

module.exports = router;
