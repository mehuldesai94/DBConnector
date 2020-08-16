const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../DBModels/user.model');
const config = require('../config/config')
const userRoute = express.Router();

const conn = mongoose.createConnection(config.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const userTable = conn.model('userSchema', userSchema);

userRoute.route('/').get((req, res) => {
    console.log("Path callled... you good to go baddy!!!");
    userTable.find((err, usersData) => {
        if (err) { console.log(err); }
        else { res.json(usersData); }
    });
});

userRoute.route('/addUser').post((req, res) => {
    let user = new userTable(req.body);
    console.log("add path called");
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'user added successfully!!' });
        })
        .catch(err => {
            res.status(400).send('add new user failed');
        });
});

userRoute.route('/:id').get((req, res) => {
    let userId = req.params.id;
    userTable.findById(userId, (err, userData) => {
        res.json(userData);
    })
})

userRoute.route('/updateuser/:id').post((req, res) => {
    let userId = req.params.id;
    console.log("User update function called.. and id is : " + userId);
    console.log("User update function called.. and id is : " + userId);

    userTable.findById(userId, (err, userData) => {
        if(!userData)
            res.send(404).send("data is not found");
        else{
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.lastName;
            userData.phone = req.body.phone;
            userData.email = req.body.email;
            userData.street1 = req.body.street1;
            userData.street2 = req.body.street2;
            userData.city = req.body.city;
            userData.province = req.body.province;
            userData.country = req.body.country;
        }

        userData.save().then(userData => {
            res.json('User Updated!');
        })
        .catch(err => {
            res.status(400).send("update user not possible");
        })
    })
})

module.exports = userRoute;