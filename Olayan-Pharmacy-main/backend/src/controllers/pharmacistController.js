const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Medicine = require("../models/Medicine");
const Pharmacist = require("../models/Pharmacist");
const Order = require("../models/Order");

const getPharmacist = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        if(!user.pharmacist){
            return res.status(404).json({ error: "User is not a Pharmacist" });
        }
        const pharmacist = await Pharmacist.findById(user.pharmacist);
        return res.status(200).json(pharmacist);
    }
    catch(e){
        return res.status(400).json({ error: e.message });
    }
}


const newMedicine = async (req, res) => {

    try {
        const { name, price, quantity, medicinal_use, active_ingredients, description} = req.body;
        if(!name){
            throw Error("Please enter medicine name")
        }
        if(price == 0){
            throw Error("Please enter medicine price")
        }
        if(!active_ingredients){
            throw Error("Please enter medicine active ingredients")
        }
        if(!description){
            throw Error("Please enter medicine description")
        }
        if(!medicinal_use){
            throw Error("Please enter medicine medicinal use")
        }
        const medicine = new Medicine({
            name,
            price,
            quantity,
            medicinal_use,
            active_ingredients,
            description
        });
        await medicine.save();
        return res.status(200).json(medicine);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};



const viewMedicinePicture = async (req, res) => {
    const { id } = req.params;
    
    try{
        /*
        Medicine.findById(id).then(medicine => {
            res.send({status:"ok", medicine: medicine});})
            */
        const medicine = await Medicine.findById(id);

        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        return res.status(200).json(medicine.picture);
        
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}



const viewMedicine = async (req, res) => {
    const { id } = req.params;
    try {
        const medicine = await Medicine.findById(id);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        return res.status(200).json(medicine);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const viewAllMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.find().sort({ createdAt: -1 });
        return res.status(200).json(medicine);

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const viewAllMedicineArchive = async (req, res) => {
    try {
        const medicine = await Medicine.find({archived: "Not Archived"}).sort({ createdAt: -1 });
        return res.status(200).json(medicine);

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// filter medicine using substring of name
const filterMedicineName = async (req, res) => {
    //const { name } = req.params;
    const { name } = req.body;
    //console.log(name)
    try {
        const medicine =await Medicine.find({
            name: { $regex: name, $options: "i" }
        }).sort({ createdAt: -1 });
        
        return res.status(200).json(medicine);

    }catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const filterMedicineNameArchive = async (req, res) => {
    const { name } = req.body;
    try {
        const medicine =await Medicine.find({
            name: { $regex: name, $options: "i" },
            archived: "Not Archived"
        }).sort({ createdAt: -1 });

        return res.status(200).json(medicine);

    }catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// filter based on medicinal_use
const filterMedicineUse = async (req, res) => {
    //const { medicinal_use } = req.params;
    const { medicinal_use } = req.body;
    try {
        const medicine =await Medicine.find({
            medicinal_use: { $regex: medicinal_use, $options: "i" }
        }).sort({ createdAt: -1 });
        
        return res.status(200).json(medicine);

    }catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const filterMedicineUseArchive = async (req, res) => {
    const { medicinal_use } = req.body;
    try {
        const medicine =await Medicine.find({
            medicinal_use: { $regex: medicinal_use, $options: "i" },
            archived: "Not Archived"
        }).sort({ createdAt: -1 });
        
        return res.status(200).json(medicine);
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const viewAlternativeMedicineArchive = async (req, res) => {
    const {active_ingredients} = req.body;
    try {
        const alternativeMedicine = await Medicine.find({
            active_ingredients: active_ingredients,
            archived: "Not Archived",
            quantity: { $gt: 0 }
        }).sort({ createdAt: -1 });
        return res.status(200).json(alternativeMedicine);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}



const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);
    if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
    }
    try {
        const { name, price, quantity, active_ingredients, description, medicinal_use} = req.body;
        const medicine = await Medicine.findByIdAndUpdate(id, {
            name,
            price,
            quantity,
            active_ingredients,
            description,
            medicinal_use,
        });
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        if(!name){
            throw Error("Please enter medicine name")
        }
        if(price == 0){
            throw Error("Please enter medicine price")
        }
        if(!active_ingredients){
            throw Error("Please enter medicine active ingredients")
        }
        if(!description){
            throw Error("Please enter medicine description")
        }
        if(!medicinal_use){
            throw Error("Please enter medicine medicinal use")
        }
        
        return res.status(200).json(medicine);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const togglePrescription = async (req, res) => {
    const { id } = req.params;

    try {
        const medicine = await Medicine.findById(id);
        if(!medicine){
            return res.status(404).json({ error: "Medicine not found" });
        }
        const prescription = medicine.prescribed;
        if(prescription == "Prescribed"){
            medicine.prescribed = "Not Prescribed";
        }
        if(prescription == "Not Prescribed"){
            medicine.prescribed = "Prescribed";
        }
        await medicine.save();
        return res.status(200).json(medicine);
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const toggleArchive = async (req, res) => {
    const { id } = req.params;

    try {
        const medicine = await Medicine.findById(id);
        if(!medicine){
            return res.status(404).json({ error: "Medicine not found" });
        }
        const archived = medicine.archived;
        if(archived == "Archived"){
            medicine.archived = "Not Archived";
        }
        if(archived == "Not Archived"){
            medicine.archived = "Archived";
        }
        await medicine.save();
        return res.status(200).json(medicine);
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

const uploadMedicinePicture = async (req, res) => {
    
    try {
        const { picture } = req.files;
        const { id } = req.params;
        console.log(picture)
        if(!picture){
            throw Error('Please upload picture')
        }
        const medicine = await Medicine.findById(id);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        const pictureID = "" + id;

        const picturePath = `./user-files/medicine-files/${pictureID.slice(
            -7
        )}-${picture.name}`;

        await picture.mv(picturePath, function (err) {
            if (err) {return res.status(500).send(err)};
        });

        medicine.picture = picturePath;
        await medicine.save();
        return res.status(200).json(medicine);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

const uploadFile = async (req, res) => {
    try {
        const { path } = req.body;
        return res.status(200).download(path);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// create a sale report that takes all orders and filters them by date
// report is a list of all medicines sold on a date, with their quantity, price 
const saleReportMonth = async (req, res) => {
    const { month } = req.body;
    var myMonth = month - 1;

    
    try {
        if(!month){
            throw Error("Please enter month")
        }
        // fetch all orders that have status not cancelled
        const orders = await Order.find({status: {$ne: "canceled"}}).sort({ createdAt: -1 });
        const report = [];
        // Extract medicine, date, quantity, price from each order
        var contains = false;
        for (var i = 0; i < orders.length ; i++){
            const order = orders[i];
            if (orders[i].orderDate.getMonth() == myMonth){
                for (var j = 0; j < order.cart.length ; j++){
                    const medicine = await Medicine.findById(order.cart[j].medicineId);
                    const medicineName = medicine.name;
                    const medicineID = medicine._id;
                    // check if reportalready has this medicine to push quantity
                    for (var k = 0; k < report.length ; k++){
                        //console.log("1:",report[k].medicineName,report[k].medicineID)
                        //console.log("2:",medicineName,medicineID)
                        //console.log(report[k].medicineID.equals(medicineID))
                        if(report[k].medicineID.equals(medicineID)){
                            //console.log("here")
                            report[k].quantity = report[k].quantity + order.cart[j].quantity;
                            contains = true;
                            break;
                        }
                    }
                    if(contains == false){
                        const date = order.orderDate;
                        const quantity = order.cart[j].quantity;
                        const price = order.cart[j].price;
                        const orderID = order._id;
                        report.push({medicineID, medicineName, date, quantity, price, orderID});
                    }
                    contains = false;
                }
            }
        }
        if(report.length == 0){
            throw Error("No orders have been made in month " + month + " yet" )
        }
        res.status(200).json(report);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const saleReportDate = async (req, res) => {
    const { month, day, year } = req.body;

    
    var myMonth = month - 1;
    try {
        if(!day && !month && !year){
            throw Error("Please enter day, month and year")
        }
        // fetch all orders that have status not cancelled
        const orders = await Order.find({status: {$ne: "canceled"}}).sort({ createdAt: -1 });
        const report = [];
        // Extract medicine, date, quantity, price from each order
        var contains = false;
        for (var i = 0; i < orders.length ; i++){
            const order = orders[i];
            //console.log(orders[i].orderDate.getDate())
            if (orders[i].orderDate.getDate() == day && orders[i].orderDate.getMonth() == myMonth && orders[i].orderDate.getFullYear() == year){
                for (var j = 0; j < order.cart.length ; j++){
                    const medicine = await Medicine.findById(order.cart[j].medicineId);
                    const medicineName = medicine.name;
                    const medicineID = medicine._id;
                    // check if reportalready has this medicine to push quantity
                    for (var k = 0; k < report.length ; k++){
                        //console.log("1:",report[k].medicineName,report[k].medicineID)
                        //console.log("2:",medicineName,medicineID)
                        //console.log(report[k].medicineID.equals(medicineID))
                        if(report[k].medicineID.equals(medicineID)){
                            //console.log("here")
                            report[k].quantity = report[k].quantity + order.cart[j].quantity;
                            contains = true;
                            break;
                        }
                    }
                    if(contains == false){
                        const date = order.orderDate;
                        const quantity = order.cart[j].quantity;
                        const price = order.cart[j].price;
                        const orderID = order._id;
                        report.push({medicineID, medicineName, date, quantity, price, orderID});
                    }
                    contains = false;
                }
            }
        }
        if(report.length == 0){
            throw Error("No orders have been made on " + day + "/" + month + "/" + year)
        }
        res.status(200).json(report);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const saleReportName = async (req, res) => {
    const { month, name } = req.body;
    var myMonth = month - 1;

    

    try {
        if(!name && !month){
            throw Error("Please enter medicine name and month")
        }
        // fetch all orders that have status not cancelled
        const orders = await Order.find({status: {$ne: "canceled"}}).sort({ createdAt: -1 });
        const report = [];
        // Extract medicine, date, quantity, price from each order
        var contains = false;
        for (var i = 0; i < orders.length ; i++){
            const order = orders[i];
            if (orders[i].orderDate.getMonth() == myMonth){
                for (var j = 0; j < order.cart.length ; j++){
                    const medicine = await Medicine.findById(order.cart[j].medicineId);
                    const medicineName = medicine.name;
                    const medicineID = medicine._id;
                    // check if reportalready has this medicine to push quantity
                    for (var k = 0; k < report.length ; k++){
                        //console.log("1:",report[k].medicineName,report[k].medicineID)
                        //console.log("2:",medicineName,medicineID)
                        //console.log(report[k].medicineID.equals(medicineID))
                        if(report[k].medicineID.equals(medicineID)){
                            //console.log("here")
                            report[k].quantity = report[k].quantity + order.cart[j].quantity;
                            contains = true;
                            break;
                        }
                    }
                    if(contains == false && medicineName == name){
                        const date = order.orderDate;
                        const quantity = order.cart[j].quantity;
                        const price = order.cart[j].price;
                        const orderID = order._id;
                        report.push({medicineID, medicineName, date, quantity, price, orderID});
                    }
                    contains = false;
                }
            }
        }
        if(report.length == 0){
            throw Error("No orders have been made in month " + month + " yet" )
        }
        res.status(200).json(report);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getUserNotifications = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID).populate([
            {
                path: "notifications.appointment",
                populate: [
                    { path: "patient", populate: { path: "user" } },
                    { path: "doctor", populate: { path: "user" } },
                ],
            },
            {
                path: "notifications.medicine",
            },
        ]);
        return res.status(200).json(packages);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
 
module.exports = {
    getPharmacist,
    newMedicine,
    updateMedicine,
    togglePrescription,
    toggleArchive,
    viewMedicine,
    viewAllMedicine,
    filterMedicineName,
    filterMedicineUse,
    viewAllMedicineArchive,
    filterMedicineNameArchive,
    filterMedicineUseArchive,
    viewAlternativeMedicineArchive,
    uploadMedicinePicture,
    viewMedicinePicture,
    uploadFile,
    saleReportMonth,
    saleReportDate,
    saleReportName,
    getUserNotifications
};
