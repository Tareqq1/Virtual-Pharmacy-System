const mongoose = require("mongoose");
//const validator = require('validator')
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
        patient: { type: Schema.Types.ObjectId, ref: "Patient" },
        pharmacist: { type: Schema.Types.ObjectId, ref: "Pharmacist" },
        admin: { type: Boolean },

        email: {
            type: String
        },
        notifications: [
            {
                type: {
                    type: String,
                    enum: [
                        "new appointment",
                        "cancelled appointment",
                        "rescheduled appointment",
                        "medicine out of stock",
                    ],
                },
                time_of_notification: Date,
                appointment: {
                    type: Schema.Types.ObjectId,
                    ref: "Appointment",
                },
                medicine: { type: Schema.Types.ObjectId, ref: "Medicine" },

                description: String
            },
        ],
    },
    { timestamps: true }
);

// static sign up method

module.exports = mongoose.model("User", userSchema);
