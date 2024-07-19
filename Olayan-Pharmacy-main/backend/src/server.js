//* IMPORTS *//
const express = require("express");
const mongoose = require("mongoose");

const registrationRouter = require("./routes/registrationRoutes");
const adminRouter = require("./routes/adminRoutes");
const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const pharmacistRouter = require("./routes/pharmacistRoutes");

//* SETUP *//
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on("error", () => {
    console.log("Failed to connect to database");
});
db.once("open", () => {
    console.log("Connected to database succefully");
});

//* APP *//
const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// MIDDLEWARE
app.use(express.json());
app.use(express.json({ limit: "500mb" }));

// ROUTES
app.get("/", (req, res) => {
    res.status(200).send("Welcome!");
});

app.use("/register", registrationRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/pharmacist", pharmacistRouter);
