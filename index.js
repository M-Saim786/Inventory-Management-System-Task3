const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config();
const mainRouter = require("./Router/mainRouter")


const mongoose = require("mongoose")
mongoose.connect(process.env.dbUrl).then(() => {
    console.log("MongoDb connected")
}).catch((err) => {
    console.log(err)
})


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", mainRouter);

app.listen(process.env.Port, () => {
    console.log("App listening on port", 5000)
})

module.exports = app;