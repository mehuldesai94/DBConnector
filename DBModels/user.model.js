const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName : String,
    lastName : String,
    phone: String,
    email: String,
    createdAt :{
        type: Date,
        default: Date.now
    },
    street1: String,
    street2: String,
    city: String,
    province: String,
    country: String
})

module.exports = mongoose.model('userSchema', userSchema);