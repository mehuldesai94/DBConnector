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

userRoute.route('/add').post((req, res) => {
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

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
