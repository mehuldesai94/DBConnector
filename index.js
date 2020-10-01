const express = require('express');
const cors = require('cors'); //help to call over http, https
const bodyParser = require('body-parser'); //parsing data
const morgan = require('morgan'); //server status

const userRoute = require('./Routes/userRoutes');
const nodemailerRoute = require('./Routes/nodemailerRoutes');
const config = require('./config/config')


const app = express();
const PORT = process.env.PORT || config.PORT;

app.use(cors());

if (config.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// body parser 
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  
app.use(bodyParser.json());
app.use(express.json());

//Routes
app.use('/users', userRoute);


//nodemailer
app.use('/mail', nodemailerRoute)


//Home Route
app.get("/", (req, res) => {
    res.sendFile('home/home.html', {root: __dirname});
  });



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
