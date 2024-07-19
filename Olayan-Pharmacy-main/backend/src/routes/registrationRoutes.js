const express = require("express");
const registrationController = require("../controllers/registrationController");
const fileUpload = require("express-fileupload");
const router = express.Router();

router.post("/newPatient", registrationController.registerNewPatient);
router.post("/newUser", registrationController.registerNewUser);
router.post("/newDoctor", registrationController.registerNewDoctor);
router.post("/newPharmacist",
        fileUpload(),
        registrationController.registerNewPharmacist);
router.post("/login", registrationController.login)


module.exports = router;
