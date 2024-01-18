import User from "../model/User";
import dotenv from "dotenv";

dotenv.config();

//GET ALL USERS
export const  getAllUsers = async(req, res, next) =>{
    try{
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

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//GET ONE USER
export const  getOneUser = async(req, res, next) =>{
    try{
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

    }catch(error){
        res.status(500).json({error: error.message})
    }
}


//UPATE USER
export const  updateUser = async(req, res, next) =>{
    try{
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

    }catch(error){
        res.status(500).json({error: error.message})
    }
}


//DELETE
export const  deleteUser = async(req, res, next) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                message: "User successfully deleted"
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }catch(error){
        res.status(500).json({error: error.message})
    }
}


