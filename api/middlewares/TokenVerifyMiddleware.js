import TokenBlackList from "../model/TokenBlackList.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TokenVerifyMiddleWare = async (req,res,next) => {
    console.log("Inside TokenVerifyMiddleWare");
    console.log("Request headers:", req.headers);

    if(req.cookies.access){
        try{
            console.log("tokenverifymiddleware compare:")
            jwt.verify(req.cookies.access, process.env.SERVER_SECRET);

            const isBlackListed = await TokenBlackList.findOne
            ({where:{token: req.cookies.access}});
        if (isBlackListed !== null){
            console.log("Token is blacklisted:")
           return res.status(401).json({blacklistmessage: false})
        }else{
            console.log("Token is not blacklisted");
            next()
        }        
        }catch (error){
            console.log("tokenverifymiddleware error:")
            return res.status(401).json({Message: false});
        }
    }
    else{
        console.log("tokenverifymiddleware message:")
        return res.status(401).json({ message: false});
    }
}

export default TokenVerifyMiddleWare
