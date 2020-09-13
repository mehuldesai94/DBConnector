const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const nodemailerRoute = express.Router();


const gmailtransport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
        user: config.USER,
        pass: config.USER_CODE
    }
}

const gmailtrnsporter = nodemailer.createTransport(gmailtransport);

gmailtrnsporter.verify((error, success) => {
    if (error)
        console.log(error);
    else
        console.log('Server is ready to send message');
});

nodemailerRoute.route('/').get((req, res) => {
    res.json('Node Mailer Path succesfully deployed !!');
});

nodemailerRoute.post('/send', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    var content = `name: ${name}
                    \n email: ${email}
                    \n phone: ${phone}
                    \n message: ${message}`

    var mail = {
        from: name,
        to: config.USER,
        subject: 'New email from Portfolio',
        text: content
    }

    gmailtrnsporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json(err
            //     {
            //     status: 'fail'
            // }
            )
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})

module.exports = nodemailerRoute;