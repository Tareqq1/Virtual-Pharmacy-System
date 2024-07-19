const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Pharmacist = require("../models/Pharmacist");
const bcrypt = require("bcrypt");
const validator = require('validator')
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {  expiresIn: "1d" });
}


const createAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        const exists = await User.findOne({username})

        if(exists) {
            throw Error("Username already exists")
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        // if(!validator.isEmail(email)){
        //     throw Error('Email is not valid')
        // }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const admin = new User({
            username,
            password : hash,
            admin: true,
            email: email,
        });

        await admin.save();
        return res.status(200).json(admin);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try{
        
        const patient_main_account = await User.find({patient: id});
        //console.log(patient_main_account)
        //console.log(patient_main_account.length == 0)
        if(patient_main_account.length != 0){
            return res.status(200).json(patient_main_account);
        }
        const doctor_main_account = await User.find({doctor: id});
        if(doctor_main_account.length != 0){
            return res.status(200).json(doctor_main_account);
        }
        const pharmacist_main_account = await User.find({pharmacist: id});
        //console.log(pharmacist_main_account)
        if(pharmacist_main_account.length != 0){
            return res.status(200).json(pharmacist_main_account);
        }
        return res.status(404).json({ error: "User not found" });
        
    }
    catch(e){
        return res.status(400).json({ error: e.error });
    }
};
const viewAdmins = async (req, res) => {
    try {
        const admins = await User.find({ admin: true });
        return res.status(200).json(admins);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id)
        var userFound = null;
        var user = await User.find({patient: id});
        //console.log(user.length)
        //console.log(user)
        if(user.length != 0){
            userType = await Patient.findByIdAndDelete(user[0].patient);
            userFound = await User.findByIdAndDelete(user[0]._id);
            return res.status(200).json({userFound,userType});
        }
        user = await User.find({pharmacist: id});
        console.log(user.length)
        if(user.length != 0){
            userType = await Pharmacist.findByIdAndDelete(user[0].pharmacist);
            userFound = await User.findByIdAndDelete(user[0]._id);
            return res.status(200).json({userFound,userType});
        }
        /*
        user = await User.find({doctor: id});
        if(user.length != 0){
            userType = await Doctor.findByIdAndDelete(user[0].doctor);
            userFound = await User.findByIdAndDelete(id);
        }
        */
        
        return res.status(404).json({ error: "User not found" });
        
        
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}
const viewPharmacist = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const pharmacist = await Pharmacist.findById(user.pharmacist);
    try {
        return res.status(200).json({user,pharmacist});
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};
const viewAllPharmacists = async (req, res) => {
    try {
        const pharmacists = await Pharmacist.find().sort({ createdAt: -1 });
        return res.status(200).json(pharmacists);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};
const changePharmacistStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const pharmacist = await Pharmacist.findByIdAndUpdate(id, {
            registration_request_status: status,
        }, {new: true});
        return res.status(200).json(pharmacist);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const changePassword = async (req, res) => {
    const { id } = req.params;

    try{
        const { password, newPassword } = req.body;

        const user = await User.findById(id);

        if (!user) {
            throw Error("User does not exist");
        }
        
        const match = await bcrypt.compare(password, user.password);
        //const match  = (oldPassword == user.password);
        
        if (!match) {
            throw Error("Passwords do not match");
        }
        
        if (!validator.isStrongPassword(newPassword)) {
            throw Error('New password is not strong enough')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        const updatedUser = await User.findByIdAndUpdate(id, {
            password: hash,
        });

        res.status(200).json(updatedUser);
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

// generate OTP
const generateOTP = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        const otp = Math.floor(100000 + Math.random() * 900000) + ""; // Generate a random 6-digit OTP

        // Send the OTP to the user's email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "seifkandel3@gmail.com", // Your Gmail email address
                pass: "c x o d r z b m d n u s y f p r", // Your Gmail password or App Password
            },
        });

        const mailOptions = {
            from: "seifkandel3@gmail.com",
            to: user.email,
            subject: "Your One Time Password (OTP)",
            text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions);

        return res.json({ otp, user_id: user._id });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};
const changeUserPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    createAdmin,
    viewAdmins,
    getUser,
    deleteUser,
    viewPharmacist,
    viewAllPharmacists,
    changePharmacistStatus,
    changePassword,
    generateOTP,
    changeUserPassword
 };
