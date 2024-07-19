const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

// REGISTRATION and LOGIN
router.post("/newPatient", registrationController.registerNewPatient);
router.post("/newUser", registrationController.registerNewUser);
router.post("/newDoctor", registrationController.registerNewDoctor);
router.post("/newPharmacist",
        fileUpload(),
        registrationController.registerNewPharmacist);
router.post("/login", registrationController.login)

// ADMIN
router.get("/getUser/:id", adminController.getUser);
router.post("/newAdmin", adminController.createAdmin);
router.delete("/deleteUser/:id", adminController.deleteUser);
router.get("/viewAdmins", adminController.viewAdmins);
router.get("/viewAllPharmacists", adminController.viewAllPharmacists);
router.put("/changePharmacistStatus/:id", adminController.changePharmacistStatus);
router.put("/changePassword/:id", adminController.changePassword);
router.get("/generateOTP/:username", adminController.generateOTP);
router.post("/changeUserPassword/:id", adminController.changeUserPassword);

// PHARMACIST
router.get("/getPharmacist/:id", pharmacistController.getPharmacist);
router.post("/newMedicine", pharmacistController.newMedicine);
router.put("/updateMedicine/:id", pharmacistController.updateMedicine);
router.put("/toggleArchive/:id", pharmacistController.toggleArchive);
router.put("/togglePrescription/:id", pharmacistController.togglePrescription);
router.get("/viewMedicine/:id", pharmacistController.viewMedicine);
router.get("/viewAllMedicine", pharmacistController.viewAllMedicine);
router.post("/filterMedicineName", pharmacistController.filterMedicineName);
router.post("/filterMedicineUse", pharmacistController.filterMedicineUse);
router.post("/viewAllMedicineArchive", pharmacistController.viewAllMedicineArchive);
router.post("/filterMedicineNameArchive", pharmacistController.filterMedicineNameArchive);
router.post("/filterMedicineUseArchive", pharmacistController.filterMedicineUseArchive);
router.post("/viewAlternativeMedicineArchive", pharmacistController.viewAlternativeMedicineArchive);
router.post("/uploadMedicinePicture/:id",
    fileUpload(),
    pharmacistController.uploadMedicinePicture);
router.get("/viewMedicinePicture/:id", pharmacistController.viewMedicinePicture);
router.post("/uploadFile", pharmacistController.uploadFile);

router.post("/saleReportMonth", pharmacistController.saleReportMonth);
router.post("/saleReportDate", pharmacistController.saleReportDate);
router.post("/saleReportName", pharmacistController.saleReportName);

// PATIENT
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

// OTHER

// 23 - patient/doc: filter appointments by date/status

// 34 - doctor: search for patient by name
//   ay patient fel system walla el patients beta3t el doctor?

// 35 - doctor: filter patients based on upcoming appointments

//

//
/* // PHARMACY // */
//

//
