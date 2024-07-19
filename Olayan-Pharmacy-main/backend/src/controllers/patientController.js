const User = require("../models/User");
const Patient = require("../models/Patient");
const Medicine = require("../models/Medicine");
const Order= require("../models/Order");



const viewAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        return res.status(200).json(patients);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}
const viewPatient = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    try{
        const patient = await Patient.findById(user.patient);
        if(!patient){
            return res.status(404).json({ error: "User is not a Patient" });
        }
        return res.status(200).json(patient);
    }
    catch(e){
        return res.status(400).json({ error: e.message });
    }
}

const addToCart = async (req, res) => {
    const { id } = req.params;
    const { medicineId } = req.body;

    try {
        const patient = await Patient.findById(id);
        const medicine = await Medicine.findById(medicineId);

        if (!patient) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        if (medicine.quantity === 0) {
            return res.status(404).json({ error: "Medicine Out of Stock" });
        }

        const CART = patient.cart || []; // Ensure CART is initialized

        // Check if the medicine is already in the cart
        const existingItem = CART.find(item => item.medicineId.toString() === medicineId.toString());

        if (existingItem) {
            if(medicine.quantity === existingItem.quantity){
                return res.status(404).json({ error: "No More Medicine to Add" });
            }
            // If the medicine is already in the cart, increment  quantity
            existingItem.quantity++;

            // Update the patient's cart in the database
            patient.cart = CART;
            await patient.save();

            return res.status(200).json({ cart: patient.cart });
        } else {
            // If the medicine is not in the cart, then 1
            const newItem = { medicineId, name: medicine.name, price: medicine.price, quantity: 1 };
            const updatedCart = [...CART, newItem];

            // Update the patient's cart in the database
            patient.cart = updatedCart;
            await patient.save();

            return res.status(200).json({ cart: patient.cart });
        }
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const viewCart = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ cart: patient.cart || [] });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};


const removeFromCart = async (req, res) => {
    const { id } = req.params;
    const { medicineId } = req.body;

    try {
        const patient = await Patient.findById(id);
        const medicine = await Medicine.findById(medicineId);

        if (!patient) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        if (medicine.quantity === 0) {
            return res.status(404).json({ error: "Medicine Out of Stock" });
        }

        const CART = patient.cart || [];

        // Check if the medicine is in the cart
        const existingItem = CART.findIndex(item => item.medicineId.toString() === medicineId.toString());

        if ( existingItem!== -1) {
            // If the medicine is in the cart, decrement the quantity
            CART[existingItem].quantity--;

            // If quantity becomes 0, remove the item from the cart directly
            if (CART[existingItem].quantity === 0) {
                CART.splice(existingItem, 1);
            }

            // Update the patient's cart in the database
            patient.cart = CART;

            await patient.save();

            return res.status(200).json({ cart: patient.cart });
        } else {
            return res.status(404).json({ error: "Item not found in the cart" });
        }
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    const { index } = req.body;

    try {
        const patient = await Patient.findById(id);

        if(!patient){
            return res.status(404).json({ error: "User is not a patient" });
        }
        // remove the item from the cart directly
        patient.cart.splice(index, 1);

        // Update the patient's cart in the database

        await patient.save();

        return res.status(200).json({ cart: patient.cart });

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

// concat the new address to the old list of addresses
const addDeliveryAddress = async (req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: "User not a patient" });
        }

        patient.addresses.push({address: address});
        await patient.save();

        return res.status(200).json({ addresses: patient.addresses });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }

}
// create order
// create order then save it in patient
const checkout = async (req, res) => {
    const { id } = req.params;
    const {
        cart,
        status,
        total,
        paymentMethod,
        address
    } = req.body;

    try {
        if(cart.length == 0){
            throw Error("Cart is empty");
        }

        if(!address){
            throw Error("Please Choose an Address");
        }


        const order = new Order({
            patient: id,
            cart,
            status,
            total,
            paymentMethod,
            address,
            orderDate : new Date(Date.now())
        });

    
        const myPatient = await Patient.findById(id);

        if (!myPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        if(paymentMethod == "wallet"){
            if(myPatient.wallet_amount < total){
                return res.status(404).json({ error: "Insufficient Funds" });
            }
            myPatient.wallet_amount = myPatient.wallet_amount - total;
        }
        // increment the sales of each medicine in the cart
        cart.forEach(async (item) => {
            const medicine = await Medicine.findById(item.medicineId);
            medicine.sales = medicine.sales + item.quantity;
            medicine.quantity = medicine.quantity - item.quantity;
            await medicine.save();
        });
        
        await order.save();
        // push order into patient's list of orders
        myPatient.orders.push(order);
        // empty the cart
        myPatient.cart = [];
        await myPatient.save();

        return res.status(200).json(order);
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }

}
const viewOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json({ order: order });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const viewPatientOrders = async (req, res) => {
    const { id } = req.params;

    try{
        // filter orders by patientID
        const orders = await Order.find({ patient: id }).sort({ createdAt: -1 });

        if (!orders) {
            return res.status(404).json({ error: "You have not made any orders" });
        }
        return res.status(200).json({ orders: orders });
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}
const cancelOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(id, {
            status: "canceled",
        }, { new: true });

        // increment the quantity of each medicine in the order and decrement sales
        order.cart.forEach(async (item) => {
            const medicine = await Medicine.findById(item.medicineId);
            medicine.quantity = medicine.quantity + item.quantity;
            medicine.sales = medicine.sales - item.quantity;
            await medicine.save();
        });

        if(!order){
            return res.status(404).json({ error: "Order not found" });
        }

        return res.status(200).json({ order: order});
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

const sendTestEmail = async (req, res) => {
    try {
        // Replace 'user_email@example.com' with the recipient's email address
        const userEmail = 'user_email@example.com'; 

        // Create a nodemailer transporter with Gmail as the service provider
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seifkandel3@gmail.com', // Replace with your Gmail address
                pass: 'c x o d r z b m d n u s y f p r', // Replace with your Gmail password
            },
            tls: {
                rejectUnauthorized: false // Add this line to bypass certificate rejection
            }
        });

        // Email options: set 'to', 'from', 'subject', and 'text' fields
        const mailOptions = {
            from: 'seifkandel3@gmail.com', // Sender's email address
            to: "tareqosamaahmed77@gmail.com", // Recipient's email address
            subject: 'Test Email', // Email subject
            text: 'This is a test email from your application.', // Email content
        };

        console.log('Before sending email');

        // Sending email
        await transporter.sendMail(mailOptions);

        console.log('Email sent');

        return res.json({ message: 'Test email sent successfully!' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

 

module.exports = {
    viewAllPatients,
    viewPatient,
    addToCart,
    removeFromCart,
    deleteFromCart,
    addDeliveryAddress,
    checkout,
    viewCart,
    viewOrder,
    viewPatientOrders,
    cancelOrder,
    sendTestEmail
};