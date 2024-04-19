
const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multerConfig");
const staffController = require("../controllers/staffController");

router.post("/", multerConfig.single("image"), staffController.createStaff);

router.get("/", staffController.getStaff);

router.delete("/:id", staffController.deleteStaff);

router.put("/:id", multerConfig.single("image"), staffController.updateStaff);

router.get("/:id", staffController.getStaffById);

module.exports = router;
