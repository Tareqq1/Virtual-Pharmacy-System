const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/getUser/:id", adminController.getUser);
router.post("/newAdmin", adminController.createAdmin);
router.delete("/deleteUser/:id", adminController.deleteUser);
router.get("/viewAdmins", adminController.viewAdmins);
router.get("/viewAllPharmacists", adminController.viewAllPharmacists);
router.put("/changePharmacistStatus/:id", adminController.changePharmacistStatus);
router.put("/changePassword/:id", adminController.changePassword);
router.get("/generateOTP/:username", adminController.generateOTP);
router.post("/changeUserPassword/:id", adminController.changeUserPassword);


module.exports = router;
