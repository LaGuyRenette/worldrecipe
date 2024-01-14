const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
    .then((x) => {
        console.log(
            `connected to Mongo! Database name: "${x.connections[0].name}"`
            );
    }).catch((err) => {
        console.error("Error connecting to Mongo", err.reason);
    });

const recipeRoute = require ('./routes/recipe.route');
const userRoute = require("./routes/auth");
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false 
}));
app.use(cors());

app.use( 
    express.static(path.join(__dirname, "dist/yumami"))
);

//API root
app.use("/api", recipeRoute);
app.use("/api", userRoute);
//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Listening on port" + port);
});
//404
app.use((req, res, next) => {
    next(createError(404));
})

//Base Route
app.get("/", (req, res) => {
    res.send("Invalid endpoint")
});

app.get ("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "dist/yumami/index.html")
    );
});

app.use(function( err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
    