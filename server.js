const express = require('express');
const cors = require('cors'); //help to call over http, https
const bodyParser = require('body-parser'); //parsing data
const morgan = require('morgan'); //server status

const userRoute = require('./Routes/userRoutes');
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

//Routes
app.use('/users', userRoute);

//Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Mehul's main NODE.JS API...");
  });

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
