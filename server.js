const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = express.Router();
const PORT = process.env.PORT || 4000;


let userTable = require('./DBModels/user.model');

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://mehul:mehul@cluster0.zccmv.mongodb.net/mernerudapp?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err))

userRoute.route('/').get((req, res) => {
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



// userRoute.route('/userupdate/:id').post((req, res) => {
//     console.log(req.params.id);
//     userTable.findById(req.params.id, (err, user) => {
//         if (!user)
//             res.send(404).send('User not avaliable');
//         else {
//             user.firstName = req.body.firstName;
//             user.lastName = req.body.lastName;
//             user.phone = req.body.phone;
//             user.email = req.body.email;
//             user.street1 = req.body.street1;
//             user.street2 = req.body.street2;
//             user.city = req.body.city;
//             user.province = req.body.province;
//             user.country = req.body.country;
//         }

//         user.save().then(user => {
//             res.json('User upadated succesfully');
//         }).catch(err => {
//             res.status(400).send("Update failed ... please try again later on");
//         });
//     })
// })

userRoute.route('/updateuser/:id').post((req, res) => {
    let userId = req.params.id;
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

app.use('/users', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
