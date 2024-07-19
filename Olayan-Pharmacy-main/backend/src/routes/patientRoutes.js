const express = require("express");
const patientController = require("../controllers/patientController");

const router = express.Router();

router.get("/viewAllPatients", patientController.viewAllPatients);
router.get("/viewPatient/:id", patientController.viewPatient);
router.put("/addToCart/:id", patientController.addToCart);
router.put("/removeFromCart/:id", patientController.removeFromCart);
router.put("/deleteFromCart/:id", patientController.deleteFromCart);
router.put("/addDeliveryAddress/:id", patientController.addDeliveryAddress);
router.get("/viewPatientOrders/:id", patientController.viewPatientOrders);
router.post("/checkout/:id", patientController.checkout);
router.get("/viewOrder/:id", patientController.viewOrder);
router.put("/cancelOrder/:id", patientController.cancelOrder);
router.get("/sendTestEmail", patientController.sendTestEmail);


module.exports = router;
