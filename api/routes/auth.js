const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const userRoute = express.Router();
let User = require("../model/User");

//REGISTER
userRoute.route('/register').post(async (req, res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email})
            if(existingUser){
                return res.status(400).json({message: 'User already registered'})
            }
            //hash password
            const saltround = 10;
            const passwordhashed = await bcrypt.hash(req.body.password, saltround);

            const newUser = new User ({
                email: req.body.email,
                password: passwordhashed,
            });
            //save new user in DB
            const savedUser = await newUser.save();

            //send jwt token 
             const jwtToken = jwt.sign(
                {userId : savedUser._id, email: savedUser.email},
                process.env.JWT_SECRET,
                { expiresIn: '2h', algorithm: 'HS256' }
                )
            res.status(201).json({
                token: jwtToken,
                message: 'User register successfully'
            })


    } catch(error){
        next(error.message);
    }
})

//LOGIN 
userRoute.route('/login').post(async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({message: 'invalid email or password'});
        }

        const validPassword = await bcrypt.compare(user.password, req.body.password);
        if(!validPassword){
            return res.status(401).json({message: 'invalid password'})
        }
        const jwtToken = jwt.sign(
            { userId : user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn : '2h' , algorithm: HS256}
        );

        res.json({
            token: jwtToken,
            message: 'Login successful'
        })

    }catch(error){
        res.status(500).json({error: error.message})
    }
})


//CREATE
userRoute.route("/add-User").post(async(req, res, next) => {
    await User.create(req.body)
        .then((result)=>{
            res.json({
                data:result,
                message: "User added!yeah!",
                status:200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

//GET ALL
userRoute.route('/').get(async(req, res, next) => {
    await User.find()
    .then((result) => {
        res.json({
            data: result,
            message: "All the Users fetched successfully! yeah! ",
            status:200,
        });
    }).catch((err) => {
        return next(err);
    });
});
//GET ONE
userRoute.route("/read-user/:id").get(async(req, res, next) => {
    await User.findById(req.params.id)
    .then((result) => {
        res.json({
            data: result,
            message: " user successfully read",
            status: 200,
        });
    })
    .catch((err) => {
        return next(err);
    });
});

//UPDATE
userRoute.route("/update-user/:id").put(async( req, res, next) =>  {
    await User.findByIdAndUpdate(req.params.id, {
        $set : req.body,
    })
    .then((result) => {
        res.json({
            data: result,
            message: "User updated successfully"
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

//DELETE
userRoute.route("/delete-user/:id").delete(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({
            message: "User successfully deleted"
        });
    })
    .catch((err) => {
        console.log(err);
    })
})
module.exports = userRoute;