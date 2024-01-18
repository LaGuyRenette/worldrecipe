import express  from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRoute from './routes/auth.route.js';
import RecipeRoute from'./routes/recipe.route.js';

dotenv.config();
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
    methods:"GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type",

};

const app = express ();
//MIDDLEWARE
app
    .use(express.urlencoded({extended: false}))
    .use(express.json())
    .use(cookieParser())
    .use(cors(corsOptions));

//ROUTE
app.use(AuthRoute)
app.use(RecipeRoute)

//MONGODB CONNECTION
mongoose.connect(`${mongoUrl}`)
    .then((x) => {
        console.log(
            `connected to Mongo! Database name: "${x.connections[0].name}"`
            );
    }).catch((err) => {
        console.error("Error connecting to Mongo", err);
    });

//START SERVER
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
