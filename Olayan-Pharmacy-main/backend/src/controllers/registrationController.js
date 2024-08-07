const User = require("../models/User");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const validator = require('validator')
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {  expiresIn: "1d" });
}


const login = async (req, res) => {
    const { username, password } = req.body;
    
    try{
        const user = await User.findOne({ username});

        if (!user) {
            throw Error("User does not exist");
        }

        if(user.pharmacist){
            const pharmacist = await Pharmacist.findById(user.pharmacist);
            if(pharmacist.registration_request_status == "pending"){
                throw Error("Your Registration Request is Still Pending");
            }
            if(pharmacist.registration_request_status == "rejected"){
                throw Error("Your Registration Request has been Rejected");
            }
        }
    
        const match = await bcrypt.compare(password, user.password);

        //const role_id = user.patient || user.pharmacist || user.doctor;
        
        if (!match) {
            throw Error("Invalid password");
        }

        const token = createToken(user._id);
        
        res.status(200).json({ token, user, msg: "SUCCESS" });
    }
    catch(e){
        return res.status(400).json({ error: e.message });
    }

    


};



const registerNewUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = new User({
            username,
            password,
        });

        await user.save();

        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const registerNewPatient = async (req, res) => {
    
    try {
        const {
            username,
            password,
            name,
            email,
            date_of_birth,
            gender,
            addresses,
            mobile_number,
            emergency_contact,
        } = req.body;

        const exists = await User.findOne({username})

        if(exists) {
            throw Error("Username already exists")
        }

        if (!validator.isEmail(email)) {
            throw Error('Email not valid')
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        /*
        const exists2 = await this.findOne({ email })

        if (exists2) {
            throw Error('Email already in use')
        }
        */
    
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const patient = new Patient({
            name,
            email,
            date_of_birth,
            gender,
            addresses,
            mobile_number,
            emergency_contact,
        });
        //console.log(patient);

        const user = new User({
            username,
            password: hash,
            email: email,
            patient: patient._id,
        });

        // await Promise.all([user.save(), patient.save()]);
        await user.save();
        await patient.save();

        return res.status(201).json(user);
    } catch (err) {
        
        return res.status(400).json({ error: err.message });
        
    }
};

const registerNewPharmacist = async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            email,
            date_of_birth,
            hourly_rate,
            affiliated_hospital,
            educational_background,
        } = req.body;

        const exists = await User.findOne({username})

        if(exists) {
            throw Error("Username already exists")
        }

        // if (!validator.isEmail(email)) {
        //     throw Error('Email not valid')
        // }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        /*
        const exists2 = await this.findOne({ email })

        if (exists2) {
            throw Error('Email already in use')
        }
        */

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const pharmacist = new Pharmacist({
            name,
            email,
            date_of_birth,
            hourly_rate,
            affiliated_hospital,
            educational_background,
        });

        const user = new User({
            username,
            password : hash,
            email: email,
            pharmacist: pharmacist._id,
        });

        const { national_id_document, pharmacy_degree_document, licenses } = req.files;
        console.log(national_id_document)
        console.log(pharmacy_degree_document)
        console.log(licenses)
        if(!national_id_document || !pharmacy_degree_document || !licenses){
                throw Error('Please upload all necessary files')
        }
        const stringID = "" + pharmacist._id;

        const nationalIDPath = `./user-files/pharmacists-files/${stringID.slice(
            -7
        )}-${national_id_document.name}`;

        const degreePath = `./user-files/pharmacists-files/${stringID.slice(
            -7
        )}-${pharmacy_degree_document.name}`;

        //console.log(nationalIDPath)
        //console.log(degreePath)
        await national_id_document.mv(nationalIDPath, function (err) {
            if (err) {return res.status(500).send(err)};
        });
        //console.log("national ID done")
        await pharmacy_degree_document.mv(degreePath, function (err) {
            if (err) return res.status(500).send(err);
        });

        if (!Array.isArray(licenses)) {
            let licensePath = `./user-files/pharmacists-files/${stringID.slice(
                -7
            )}-${licenses.name}`;
        //console.log(licensePath)


            await licenses.mv(licensePath, function (err) {
                if (err) return res.status(500).send(err);
            });
            pharmacist.licenses.push(licensePath);
        } else {
            licenses.forEach(async (license) => {
                let licensePath = `./user-files/pharmacists-files/${stringID.slice(
                    -7
                )}-${license.name}`;

                await license.mv(licensePath, function (err) {
                    if (err) return res.status(500).send(err);
                });
                pharmacist.licenses.push(licensePath);
            });
        }

        pharmacist.pharmacy_degree_document = degreePath;
        pharmacist.national_id_document = nationalIDPath;
    


        

        await user.save();
        await pharmacist.save();

        return res.status(201).json({user, pharmacist});
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.message });
    }
};

const registerNewDoctor = async (req, res) => {};

module.exports = { 
    registerNewUser,
    registerNewPatient,
    registerNewDoctor,
    registerNewPharmacist,
    login
};
