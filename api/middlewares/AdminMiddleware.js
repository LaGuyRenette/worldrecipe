import  jwt  from "jsonwebtoken";
import User from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();

const AdminMiddleware = async(req, res, next) =>{
    console.log("Inside AdminMiddleware");
    try{
        console.log("verify: token cookie, user id")
        const token = req.cookies.access;

        const decodedToken = jwt.verify(token, process.env.SERVER_SECRET);
        const userId = decodedToken.userID;
        console.log("il a verifié le token et l'id")
        const user = await User.findById(userId)
        console.log(" maintenant le user:")

        if(user){
            console.log("user found:", user)
            if(user && user.role === 'admin'){
                console.log("user is admin")
                req.user = user;
                next();
            }else{
                console.log("user is user")
                res.status(400).json({message: 'access forbidden'})
            }
        }else {
            throw new Error("error :user not found")
            res.status(404).json({message: 'User Not found'});
        }

    }catch(error){
        res.status(500).json({error: error.message})
    }
}
export default AdminMiddleware;