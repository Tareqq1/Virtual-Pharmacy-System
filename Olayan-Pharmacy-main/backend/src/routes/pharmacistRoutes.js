const express = require("express");
const pharmacistController = require("../controllers/pharmacistController");
const fileUpload = require("express-fileupload");


const router = express.Router();

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

module.exports = router;
