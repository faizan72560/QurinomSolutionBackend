const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary")
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload")
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT

const errormiddleware = require("./utils/errorMiddleware")
const cors = require('cors');
const corsOpts = {
    // origin: 'http://localhost:3000',
    origin: [process.env.LOCALPORT, process.env.LOCALPORT1],
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

const user = require('./routes/userRoutes')
const blog = require('./routes/blogRoutes')

app.use('/api/v1', user)
app.use('/api/v1', blog)



const DB = process.env.DATABASE
// console.log(DB)
app.use(errormiddleware)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected")

}).catch((err) => {
    console.log(err)

})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})





app.listen(port, () => {
    console.log(`started on ${port}`)
})
