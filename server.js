const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 5000
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// use routes
const pRouter = require("./routes/routes.js");
app.use('/', pRouter);


// App listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//mongodb connect
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connect(URL)
.then(()=>{
    console.log("Connected to the Mongodb...")
}).catch((err)=>{
    console.log(err)
})