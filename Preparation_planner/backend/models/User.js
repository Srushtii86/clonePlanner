// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', UserSchema);
// module.exports = User;


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    current_day: { type: Number, default: 1 },
    study_hours: { type: Number },
    goals: [{ type: String }],
    firstLogin: { type: Boolean, default: true } // Flag for showing the form only once
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
