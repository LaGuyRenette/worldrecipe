const jwt = require ('jsonwebtoken');
const AuthMiddleware = (req, res, next) =>{
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =decoded
        next();
    }catch(error){
        return res.status(401)
    }
}

export default AuthMiddleware